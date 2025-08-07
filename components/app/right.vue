<template>
  <div class="lg:col-span-1 space-y-6 sm:space-y-8">
    <!-- User Info Section -->
    <section class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
      <div class="flex items-center">
        <div
          class="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <Icon
            name="mdi:account-outline"
            class="text-2xl sm:text-3xl text-blue-600 dark:text-blue-400"
          />
        </div>
        <div class="ml-3 sm:ml-4 overflow-hidden">
          <h3
            class="font-bold text-base sm:text-lg text-gray-900 dark:text-white truncate"
          >
            {{ userName }}
          </h3>
          <p
            class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate"
          >
            {{ userEmail }}
          </p>
        </div>
      </div>

      <div class="mt-4 sm:mt-6">
        <div class="flex justify-between text-xs sm:text-sm font-medium mb-1">
          <span class="text-gray-600 dark:text-gray-300">Current Plan</span>
          <span class="text-blue-600 dark:text-blue-400 font-bold">{{
            userPlan
          }}</span>
        </div>
        <div class="flex justify-between text-xs sm:text-sm font-medium mb-2">
          <span class="text-gray-600 dark:text-gray-300">Storage</span>
          <span class="text-gray-500 dark:text-gray-400"
            >{{ storageUsedPercentage }}% used</span
          >
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-green-400 to-purple-500 h-2 rounded-full"
            :style="{ width: storageUsedPercentage + '%' }"
          ></div>
        </div>
        <div class="flex justify-between text-xs sm:text-sm mt-2">
          <span class="text-gray-500 dark:text-gray-400"
            >{{ formatBytes(storageUsed) }} of
            {{ formatBytes(storageTotal) }}</span
          >
          <router-link
            to="/plans"
            class="font-medium text-blue-600 hover:underline"
            >Upgrade</router-link
          >
        </div>
      </div>
    </section>

    <!-- Media Storage Section -->
    <section class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
      <h2
        class="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4"
      >
        Media Storage
      </h2>
      <div
        class="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4 sm:gap-6"
      >
        <!-- Donut Chart -->
        <div class="relative h-40 w-40 sm:h-48 sm:w-48 mx-auto">
          <canvas ref="chartCanvas" class="w-full h-full"></canvas>
          <div
            class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <span
              class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white"
              >{{ storageUsedPercentage }}%</span
            >
            <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400"
              >used</span
            >
          </div>
        </div>

        <!-- Legend -->
        <ul class="w-full sm:w-auto space-y-2 sm:space-y-3">
          <li
            v-for="item in processedStorageBreakdown"
            :key="item.name"
            class="flex justify-between items-center text-xs sm:text-sm"
          >
            <div class="flex items-center">
              <span
                class="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3"
                :style="{ backgroundColor: item.color }"
              ></span>
              <span
                class="text-gray-700 dark:text-gray-300 truncate max-w-[100px] sm:max-w-none"
                >{{ item.name }}</span
              >
            </div>
            <span class="font-medium text-gray-600 dark:text-gray-400"
              >{{ item.percentage }}%</span
            >
          </li>
        </ul>
      </div>
    </section>

    <!-- Upgrade CTA Section -->
    <section
      class="bg-blue-600 dark:bg-blue-700 text-white p-4 sm:p-6 rounded-lg shadow-lg"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-base sm:text-lg">Need More Power?</h3>
          <p class="text-xs sm:text-sm text-blue-200">
            Upgrade for advanced features
          </p>
        </div>
        <router-link
          to="/plans"
          class="bg-white/20 hover:bg-white/30 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition flex-shrink-0"
        >
          <Icon name="mdi:arrow-up" class="text-lg sm:text-xl" />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from "vue";
import type { PropType } from "vue";

type StorageBreakdownItem = {
  name: string;
  percentage: number;
  color: string;
  bytes?: number;
};

const props = defineProps({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPlan: { type: String, required: true },
  storageUsed: { type: Number, required: true },
  storageTotal: { type: Number, required: true },
  storageUsedPercentage: { type: Number, required: true },
  storageBreakdown: {
    type: Array as PropType<StorageBreakdownItem[]>,
    required: true,
    validator: (value: StorageBreakdownItem[]) => {
      return value.every(
        (item) =>
          typeof item.name === "string" &&
          typeof item.percentage === "number" &&
          typeof item.color === "string"
      );
    },
  },
  formatBytes: {
    type: Function as PropType<(bytes: number, decimals?: number) => string>,
    required: true,
  },
});

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: any = null;

// Process the storage breakdown data to ensure it's valid
const processedStorageBreakdown = computed(() => {
  return props.storageBreakdown.map((item) => ({
    ...item,
    percentage: Math.max(0, Math.min(100, item.percentage)), // Ensure percentage is between 0-100
  }));
});

// Prepare chart data
const chartData = computed(() => ({
  labels: processedStorageBreakdown.value.map((item) => item.name),
  datasets: [
    {
      data: processedStorageBreakdown.value.map((item) => item.percentage),
      backgroundColor: processedStorageBreakdown.value.map(
        (item) => item.color
      ),
      borderWidth: 0,
      cutout: "75%",
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context: any) => {
          const label = context.label || "";
          const value = context.parsed || 0;
          const total = context.dataset.data.reduce(
            (a: number, b: number) => a + b,
            0
          );
          const percentage = Math.round((value / total) * 100);
          return `${label}: ${percentage}% (${props.formatBytes(
            (value / 100) * props.storageUsed
          )})`;
        },
      },
    },
  },
};

const initChart = async () => {
  if (!chartCanvas.value) return;

  try {
    // Dynamic import of Chart.js and required components
    const { default: Chart } = await import("chart.js/auto");

    // Destroy existing chart if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Create new chart instance
    chartInstance = new Chart(chartCanvas.value, {
      type: "doughnut",
      data: chartData.value,
      options: chartOptions,
    });
  } catch (error) {
    console.error("Failed to initialize chart:", error);
    renderFallbackChart();
  }
};

const renderFallbackChart = () => {
  if (!chartCanvas.value) return;

  const ctx = chartCanvas.value.getContext("2d");
  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, chartCanvas.value.width, chartCanvas.value.height);

  // Draw a simple arc as fallback
  const centerX = chartCanvas.value.width / 2;
  const centerY = chartCanvas.value.height / 2;
  const radius = Math.min(centerX, centerY) * 0.8;
  const startAngle = 0;
  const endAngle = (2 * Math.PI * props.storageUsedPercentage) / 100;

  // Background circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 12;
  ctx.stroke();

  // Progress arc
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 12;
  ctx.stroke();
};

onMounted(() => {
  nextTick(() => {
    initChart();
  });
});

// Watch for changes in relevant props
watch(
  [processedStorageBreakdown, () => props.storageUsed],
  () => {
    if (chartInstance) {
      // Update chart data efficiently
      chartInstance.data.labels = chartData.value.labels;
      chartInstance.data.datasets[0].data = chartData.value.datasets[0].data;
      chartInstance.data.datasets[0].backgroundColor =
        chartData.value.datasets[0].backgroundColor;
      chartInstance.update();
    } else {
      initChart();
    }
  },
  { deep: true }
);
</script>
