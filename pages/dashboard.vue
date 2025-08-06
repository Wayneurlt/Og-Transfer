<template>
  <div class="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
    <div class="flex flex-col lg:flex-row">
      <!-- Sidebar Component -->
      <AppSidebar v-model="activeLink" />

      <!-- Main Content Area -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
        <!-- Header Component -->
        <AppHeader
          :user-name="userName"
          @add-files-click="showFileUploadModal = true"
        />

        <!-- Main Grid Layout -->
        <div
          class="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <!-- Main Content Component -->
          <AppLeft
            :media="media"
            :folders="folders"
            :recent-files="recentFiles"
            @folder-click="openFolder"
            @file-click="openFile"
          />

          <!-- RENDER THE NEW INFO PANEL COMPONENT -->
          <AppRight
            :user-name="userName"
            :user-email="userEmail"
            :user-plan="userPlan"
            :storage-used="storageUsed"
            :storage-total="storageTotal"
            :storage-used-percentage="storageUsedPercentage"
            :storage-breakdown="storageBreakdown"
            :chart-data="chartData"
            :chart-options="chartOptions"
            :format-bytes="formatBytes"
          />
        </div>
      </main>
    </div>

    <!-- File Upload Modal remains here as it's controlled by the parent layout -->
    <div
      v-if="showFileUploadModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showFileUploadModal = false"
    >
      <!-- ... modal content ... -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Types (can be moved to a dedicated types file, e.g., /types/dashboard.ts)
type MediaItem = {
  name: string;
  count: string;
  icon: string;
  bgColor: string;
  iconColor: string;
};
type Folder = { name: string; fileCount: number; updated: string };
type RecentFile = {
  name: string;
  size: string;
  folder: string;
  created: string;
  icon: string;
  iconColor: string;
  type: string;
};
type StorageBreakdownItem = { name: string; percentage: number; color: string };

// State
const activeLink = ref("favorites");
const showFileUploadModal = ref(false);
const uploadingFiles = ref<File[]>([]);

// User and Storage Data (The single source of truth)
const userName = ref("John Doe");
const userEmail = ref("john.doe@example.com");
const userPlan = ref("Starter");
const storageUsed = ref(3 * 1024 * 1024 * 1024); // 3GB
const storageTotal = ref(5 * 1024 * 1024 * 1024); // 5GB

// Content Data
const media = ref<MediaItem[]>([
  /* ... data ... */
]);
const folders = ref<Folder[]>([
  /* ... data ... */
]);
const recentFiles = ref<RecentFile[]>([
  /* ... data ... */
]);
const storageBreakdown = ref<StorageBreakdownItem[]>([
  { name: "Videos", percentage: 45, color: "#8b5cf6" },
  { name: "Files", percentage: 30, color: "#3b82f6" },
  { name: "Images", percentage: 15, color: "#22c55e" },
  { name: "Other", percentage: 10, color: "#e5e7eb" },
]);

// Computed properties derived from state
const storageUsedPercentage = computed(() => {
  if (storageTotal.value === 0) return 0;
  return Math.round((storageUsed.value / storageTotal.value) * 100);
});

const chartData = computed(() => ({
  datasets: [
    {
      backgroundColor: storageBreakdown.value.map((item) => item.color),
      data: storageBreakdown.value.map((item) => item.percentage),
      borderWidth: 0,
      cutout: "75%",
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { tooltip: { enabled: false }, legend: { display: false } },
};

// Methods
const openFolder = (folder: Folder) => {
  console.log("Opening folder:", folder.name);
};
const openFile = (file: RecentFile) => {
  console.log("Opening file:", file.name);
};
const handleFileUpload = (event: Event) => {
  /* ... implementation ... */
};
const uploadFiles = () => {
  /* ... implementation ... */
};
const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
</script>
