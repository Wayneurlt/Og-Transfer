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
          <!-- Main Content Area (Conditionally renders all pages) -->
          <div class="lg:col-span-2">
            <!-- Render page based on activeLink -->
             <AppLeft
              v-if="activeLink === 'left'"
              :left="Left"
              @left-click="openFile"
            />
            <AppFavorites
              v-if="activeLink === 'favorites'"
              :favorite-files="favoriteFiles"
              @file-click="openFile"
            />
            <AppFolder
              v-else-if="activeLink === 'favorite-folders'"
              :folders="folders"
              @folder-click="openFolder"
            />
            <AppUpdates
              v-else-if="activeLink === 'recent-updates'"
              :updates="updates"
            />
            <AppNotifications
              v-else-if="activeLink === 'notifications'"
              :notifications="notifications"
            />
            <AppSettings
              v-else-if="activeLink === 'settings'"
              :profile="{ name: userName, email: userEmail }"
              :notifications="userNotificationSettings"
            />
            <AppRecyclebin
              v-else-if="activeLink === 'recycle-bin'"
              :deleted-files="deletedFiles"
              @restore-file-click="restoreFile"
              @delete-file-click="deleteFilePermanently"
              @restore-all-click="restoreAllFiles"
              @empty-bin-click="emptyRecycleBin"
            />
            <!-- ============ NEW SECTION ============ -->
            <AppSync
              v-else-if="activeLink === 'sync-status'"
              :current-status="syncStatus"
              :activity-log="syncActivityLog"
              @pause-click="pauseSync"
              @sync-now-click="forceSync"
            />
            <!-- ===================================== -->
            <div v-else class="p-6 bg-white dark:bg-gray-800 rounded-lg">
              <h2 class="text-xl font-semibold">Page Not Implemented</h2>
              <p class="text-gray-500 mt-2">
                This section has not been created yet.
              </p>
            </div>
          </div>

          <!-- RENDER THE INFO PANEL COMPONENT -->
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

    <!-- File Upload Modal -->
    <div
      v-if="showFileUploadModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <!-- ... modal content ... -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Left from "~/components/app/left.vue";



// --- Type Definitions ---
type Folder = { name: string; fileCount: number; updated: string };
type StorageBreakdownItem = { name: string; percentage: number; color: string };
type FavoriteFile = {
  name: string;
  size: string;
  type: string;
  dateAdded: string;
  icon: string;
  iconColor: string;
};
type UpdateItem = {
  user: string;
  action: string;
  fileName: string;
  timestamp: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
};
type NotificationItem = {
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  icon: string;
  iconColor: string;
  iconBgColor: string;
};
type NotificationSetting = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};
type DeletedFile = {
  id: number;
  name: string;
  size: string;
  dateDeleted: string;
  icon: string;
  iconColor: string;
};
// Add types for sync status
type SyncStatus = {
  id: "synced" | "syncing" | "error";
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
};
type ActivityLog = {
  id: number;
  message: string;
  timestamp: string;
  status: "success" | "warning";
};

// --- State ---
const activeLink = ref("favorites");
const showFileUploadModal = ref(false);

// --- User & Storage Data ---
const userName = ref("John Doe");
const userEmail = ref("john.doe@example.com");
const userPlan = ref("Starter");
const storageUsed = ref(3 * 1024 * 1024 * 1024);
const storageTotal = ref(5 * 1024 * 1024 * 1024);

// --- Content Data (passed to child components) ---
const folders = ref<Folder[]>([]);
const favoriteFiles = ref<FavoriteFile[]>([]);
const updates = ref<UpdateItem[]>([]);
const notifications = ref<NotificationItem[]>([]);
const userNotificationSettings = ref<NotificationSetting[]>([]);
const deletedFiles = ref<DeletedFile[]>([]);
const storageBreakdown = ref<StorageBreakdownItem[]>([
  { name: "Videos", percentage: 45, color: "#8b5cf6" },
  { name: "Files", percentage: 30, color: "#3b82f6" },
  { name: "Images", percentage: 15, color: "#22c55e" },
  { name: "Other", percentage: 10, color: "#e5e7eb" },
]);
// Add state for sync status data
const syncStatus = ref<SyncStatus>({
  id: "synced",
  title: "Up to date",
  description: "All files are synced.",
  icon: "mdi:check-all",
  iconColor: "text-green-600",
  iconBgColor: "bg-green-100 dark:bg-green-900/50",
});
const syncActivityLog = ref<ActivityLog[]>([]);

// --- Computed Properties ---
const storageUsedPercentage = computed(() =>
  Math.round((storageUsed.value / storageTotal.value) * 100)
);
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

// --- Methods ---
const openFolder = (folder: Folder) =>
  console.log("Opening folder:", folder.name);
const openFile = (file: FavoriteFile) =>
  console.log("Opening file:", file.name);
const restoreFile = (file: DeletedFile) =>
  alert(`Restoring file: ${file.name}`);
const deleteFilePermanently = (file: DeletedFile) =>
  alert(`Permanently deleting file: ${file.name}`);
const restoreAllFiles = () => alert("Restoring all files...");
const emptyRecycleBin = () => alert("Emptying recycle bin...");
// Add methods for sync status actions
const pauseSync = () => alert("Pausing synchronization...");
const forceSync = () => alert("Forcing synchronization now...");

const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
</script>
