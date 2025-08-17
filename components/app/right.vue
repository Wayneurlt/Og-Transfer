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
          <button
            @click="showModal = true"
            class="font-medium text-blue-600 hover:underline"
          >
            Upgrade
          </button>
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
      class="bg-blue-600 dark:bg-blue-700 text-white p-4 sm:p-6 rounded-lg shadow-lg cursor-pointer"
      @click="showModal = true"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-base sm:text-lg">Need More Power?</h3>
          <p class="text-xs sm:text-sm text-blue-200">
            Upgrade for advanced features
          </p>
        </div>
        <div
          class="bg-white/20 hover:bg-white/30 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition flex-shrink-0"
        >
          <Icon name="mdi:arrow-up" class="text-lg sm:text-xl" />
        </div>
      </div>
    </section>

    <!-- Pricing Plans Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-black/60 transition-opacity"
        aria-hidden="true"
        @click="showModal = false"
      ></div>

      <!-- Modal content -->
      <div
        class="relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-full sm:max-w-4xl mx-4"
      >
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="w-full">
            <h3
              class="text-2xl leading-6 font-bold text-gray-900 dark:text-white mb-6 text-center"
              id="modal-title"
            >
              Upgrade Your Plan
            </h3>

            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4"
              v-if="!showPaymentForm"
            >
              <!-- Free Plan -->
              <div
                class="border rounded-lg p-6 transition-all duration-200 cursor-pointer"
                :class="{
                  'border-blue-500 dark:border-blue-400 shadow-lg scale-105':
                    selectedPlan === 'free',
                  'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500':
                    selectedPlan !== 'free',
                }"
                @click="selectedPlan = 'free'"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white">
                      Free
                    </h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      For individuals getting started
                    </p>
                  </div>
                  <span
                    v-if="selectedPlan === 'free'"
                    class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded-full"
                  >
                    Selected
                  </span>
                </div>
                <div class="mt-4">
                  <span class="text-3xl font-bold text-gray-900 dark:text-white"
                    >$0</span
                  >
                  <span class="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <ul class="mt-4 space-y-2">
                  <li class="flex items-center">
                    <Icon name="mdi:check" class="text-green-500 mr-2" />
                    <span class="text-sm text-gray-700 dark:text-gray-300"
                      >20GB Storage</span
                    >
                  </li>
                  <li class="flex items-center">
                    <Icon name="mdi:check" class="text-green-500 mr-2" />
                    <span class="text-sm text-gray-700 dark:text-gray-300"
                      >Basic Support</span
                    >
                  </li>
                  <li class="flex items-center">
                    <Icon name="mdi:check" class="text-green-500 mr-2" />
                    <span class="text-sm text-gray-700 dark:text-gray-300"
                      >Up to 1 user</span
                    >
                  </li>
                </ul>
              </div>

              <!-- Premium Plan -->
              <div
                class="border rounded-lg p-6 transition-all duration-200 cursor-pointer"
                :class="{
                  'border-blue-500 dark:border-blue-400 shadow-lg scale-105':
                    selectedPlan === 'premium',
                  'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500':
                    selectedPlan !== 'premium',
                }"
                @click="selectedPlan = 'premium'"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white">
                      Premium
                    </h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      For power users and small teams
                    </p>
                  </div>
                  <span
                    v-if="selectedPlan === 'premium'"
                    class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded-full"
                  >
                    Selected
                  </span>
                </div>
                <div class="mt-4">
                  <span class="text-3xl font-bold text-gray-900 dark:text-white"
                    >$20</span
                  >
                  <span class="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <ul class="mt-4 space-y-2">
                  <li class="flex items-center">
                    <Icon name="mdi:check" class="text-green-500 mr-2" />
                    <span class="text-sm text-gray-700 dark:text-gray-300"
                      >100GB Storage</span
                    >
                  </li>
                  <li class="flex items-center">
                    <Icon name="mdi:check" class="text-green-500 mr-2" />
                    <span class="text-sm text-gray-700 dark:text-gray-300"
                      >Priority Support</span
                    >
                  </li>
                  <li class="flex items-center">
                    <Icon name="mdi:check" class="text-green-500 mr-2" />
                    <span class="text-sm text-gray-700 dark:text-gray-300"
                      >Up to 15 users</span
                    >
                  </li>
                  <li class="flex items-center">
                    <Icon name="mdi:check" class="text-green-500 mr-2" />
                    <span class="text-sm text-gray-700 dark:text-gray-300"
                      >Advanced analytics</span
                    >
                  </li>
                </ul>
              </div>

              <!-- Enterprise Plan -->
              <div
                class="border rounded-lg p-6 transition-all duration-200 cursor-pointer"
                :class="{
                  'border-blue-500 dark:border-blue-400 shadow-lg scale-105':
                    selectedPlan === 'enterprise',
                  'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500':
                    selectedPlan !== 'enterprise',
                }"
                @click="selectedPlan = 'enterprise'"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white">
                      Enterprise
                    </h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      For large organizations
                    </p>
                  </div>
                  <span
                    v-if="selectedPlan === 'enterprise'"
                    class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded-full"
                  >
                    Selected
                  </span>
                </div>
                <div class="mt-4">
                  <span class="text-3xl font-bold text-gray-900 dark:text-white"
                    >$45</span
                  >
                  <span class="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <ul class="mt-4 space-y-2">
                  <li class="flex items-center">
                    <Icon name="mdi:check" class="text-green-500 mr-2" />
                    <span class="text-sm text-gray-700 dark:text-gray-300"
                      >1000GB Storage</span
                    >
                  </li>
                  <li class="flex items-center">
                    <Icon name="mdi:check" class="text-green-500 mr-2" />
                    <span class="text-sm text-gray-700 dark:text-gray-300"
                      >24/7 Support</span
                    >
                  </li>
                  <li class="flex items-center">
                    <Icon name="mdi:check" class="text-green-500 mr-2" />
                    <span class="text-sm text-gray-700 dark:text-gray-300"
                      >Unlimited users</span
                    >
                  </li>
                  <li class="flex items-center">
                    <Icon name="mdi:check" class="text-green-500 mr-2" />
                    <span class="text-sm text-gray-700 dark:text-gray-300"
                      >Advanced analytics</span
                    >
                  </li>
                  <li class="flex items-center">
                    <Icon name="mdi:check" class="text-green-500 mr-2" />
                    <span class="text-sm text-gray-700 dark:text-gray-300"
                      >Dedicated account manager</span
                    >
                  </li>
                </ul>
              </div>
            </div>

            <!-- Payment Form (shown when plan is selected) -->
            <div v-if="showPaymentForm" class="mt-6">
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Payment Information
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    for="card-number"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Card Number</label
                  >
                  <input
                    type="text"
                    id="card-number"
                    v-model="paymentDetails.cardNumber"
                    placeholder="1234 5678 9012 3456"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    for="card-name"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Name on Card</label
                  >
                  <input
                    type="text"
                    id="card-name"
                    v-model="paymentDetails.cardName"
                    placeholder="John Doe"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    for="expiry-date"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Expiry Date</label
                  >
                  <input
                    type="text"
                    id="expiry-date"
                    v-model="paymentDetails.expiryDate"
                    placeholder="MM/YY"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    for="cvv"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >CVV</label
                  >
                  <input
                    type="text"
                    id="cvv"
                    v-model="paymentDetails.cvv"
                    placeholder="123"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div class="mt-4">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="paymentDetails.saveCard"
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >Save card for future payments</span
                  >
                </label>
              </div>

              <div class="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                <div class="flex justify-between">
                  <span class="text-gray-700 dark:text-gray-300">Plan:</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{
                    selectedPlanLabel
                  }}</span>
                </div>
                <div class="flex justify-between mt-2">
                  <span class="text-gray-700 dark:text-gray-300">Price:</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{
                    selectedPlanPrice
                  }}</span>
                </div>
                <div
                  class="flex justify-between mt-2 border-t border-gray-200 dark:border-gray-600 pt-2"
                >
                  <span class="text-gray-700 dark:text-gray-300">Total:</span>
                  <span
                    class="font-bold text-lg text-gray-900 dark:text-white"
                    >{{ selectedPlanPrice }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
        >
          <button
            v-if="!showPaymentForm"
            type="button"
            @click="proceedToPayment"
            :disabled="!selectedPlan"
            :class="{
              'bg-blue-600 hover:bg-blue-700': selectedPlan,
              'bg-blue-400 cursor-not-allowed': !selectedPlan,
            }"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Continue to Payment
          </button>
          <button
            v-if="showPaymentForm"
            type="button"
            @click="completePayment"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Complete Payment
          </button>
          <button
            v-if="showPaymentForm"
            type="button"
            @click="showPaymentForm = false"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-600 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Back
          </button>
          <button
            v-if="!showPaymentForm"
            type="button"
            @click="showModal = false"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-600 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Success Notification -->
    <div v-if="showSuccess" class="fixed bottom-4 right-4 z-50">
      <div
        class="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center"
      >
        <Icon name="mdi:check-circle" class="text-xl mr-2" />
        <span>Payment successful! Your plan has been upgraded.</span>
        <button @click="showSuccess = false" class="ml-4">
          <Icon name="mdi:close" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from "vue";
import type { PropType } from "vue";

// Assuming 'Icon' is a globally registered component or imported elsewhere

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

// Modal state
const showModal = ref(false);
const showPaymentForm = ref(false);
const showSuccess = ref(false);
const selectedPlan = ref("");

// Payment details
const paymentDetails = ref({
  cardNumber: "",
  cardName: "",
  expiryDate: "",
  cvv: "",
  saveCard: false,
});

// Chart state
const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: any = null;

// Process the storage breakdown data to ensure it's valid
const processedStorageBreakdown = computed(() => {
  return props.storageBreakdown.map((item) => ({
    ...item,
    percentage: Math.max(0, Math.min(100, item.percentage)), // Ensure percentage is between 0-100
  }));
});

// === MODAL COMPUTED PROPERTIES ===
const selectedPlanLabel = computed(() => {
  switch (selectedPlan.value) {
    case "free":
      return "Free Plan";
    case "premium":
      return "Premium Plan";
    case "enterprise":
      return "Enterprise Plan";
    default:
      return "";
  }
});

const selectedPlanPrice = computed(() => {
  switch (selectedPlan.value) {
    case "free":
      return "$0/month";
    case "premium":
      return "$20/month";
    case "enterprise":
      return "$45/month";
    default:
      return "";
  }
});

// === CHART COMPUTED PROPERTIES ===
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

// === MODAL METHODS ===
const proceedToPayment = () => {
  if (selectedPlan.value) {
    showPaymentForm.value = true;
  }
};

const planToAmount = (plan: string): number => {
  switch (plan) {
    case "free":
      return 0.0;
    case "premium":
      return 20.0;
    case "enterprise":
      return 45.0;
    default:
      return 0;
  }
};

const completePayment = async () => {
  try {
    const { useAuthStore } = await import("~/stores/user");
    const auth = useAuthStore();
    const amount = planToAmount(selectedPlan.value);
    if (amount > 0) {
      await auth.createPayment(amount);
    }
    await auth.whoami();
    showSuccess.value = true;
  } catch (e) {
    console.error(e);
    alert("Payment failed");
  } finally {
    showModal.value = false;
    showPaymentForm.value = false;
    paymentDetails.value = {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      saveCard: false,
    };
    selectedPlan.value = "";
    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);
  }
};

// === CHART METHODS ===
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

// === LIFECYCLE HOOKS ===
onMounted(() => {
  nextTick(() => {
    initChart();
  });
});

// Watch for changes in relevant props to update the chart
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
