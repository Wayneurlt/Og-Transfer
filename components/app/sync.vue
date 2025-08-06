<!-- src/components/AppSyncStatus.vue -->
<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
      Sync Status
    </h1>

    <!-- Current Status Section -->
    <section>
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div class="flex items-center space-x-4">
          <div
            class="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
            :class="currentStatus.iconBgColor"
          >
            <Icon
              :name="currentStatus.icon"
              class="h-6 w-6"
              :class="[
                currentStatus.iconColor,
                { 'animate-spin': currentStatus.id === 'syncing' },
              ]"
            />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
              {{ currentStatus.title }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ currentStatus.description }}
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-3 flex-shrink-0">
          <button
            @click="emit('pause-click')"
            class="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Pause Sync
          </button>
          <button
            @click="emit('sync-now-click')"
            class="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sync Now
          </button>
        </div>
      </div>
    </section>

    <!-- Sync Activity Log Section -->
    <section>
      <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Activity Log
      </h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li
            v-for="log in activityLogToUse"
            :key="log.id"
            class="p-4 flex items-center space-x-4"
          >
            <Icon
              :name="
                log.status === 'success'
                  ? 'mdi:check-circle'
                  : 'mdi:alert-circle'
              "
              class="h-5 w-5 flex-shrink-0"
              :class="
                log.status === 'success' ? 'text-green-500' : 'text-yellow-500'
              "
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-700 dark:text-gray-300">
                {{ log.message }}
              </p>
            </div>
            <p
              class="text-sm text-gray-500 dark:text-gray-400 text-right flex-shrink-0"
            >
              {{ log.timestamp }}
            </p>
          </li>
        </ul>
        <!-- Empty State -->
        <div v-if="!activityLogToUse.length" class="text-center p-12">
          <Icon
            name="mdi:history"
            class="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto"
          />
          <h3 class="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
            No Recent Activity
          </h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Sync activities will be logged here.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";

// Type definitions for component data
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

// Define component props
const props = defineProps({
  currentStatus: {
    type: Object as PropType<SyncStatus>,
    default: () => ({
      id: "synced",
      title: "Up to date",
      description: "All files are synced.",
      icon: "mdi:check-all",
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100 dark:bg-green-900/50",
    }),
  },
  activityLog: { type: Array as PropType<ActivityLog[]>, default: () => [] },
});

// Define component emits
const emit = defineEmits(["pause-click", "sync-now-click"]);

// Fallback data for demonstration
const fallbackActivityLog: ActivityLog[] = [
  {
    id: 1,
    message: "Successfully synced Project_Proposal.pdf",
    status: "success",
    timestamp: "1 min ago",
  },
  {
    id: 2,
    message: "Successfully synced Vacation.jpg",
    status: "success",
    timestamp: "3 mins ago",
  },
  {
    id: 3,
    message:
      "Conflict detected in Budget.xlsx. A new version 'Budget (Conflict).xlsx' was created.",
    status: "warning",
    timestamp: "1 hour ago",
  },
  {
    id: 4,
    message: "Successfully synced Meeting_Recording.mp4",
    status: "success",
    timestamp: "2 hours ago",
  },
  {
    id: 5,
    message: "Successfully synced 12 other files.",
    status: "success",
    timestamp: "2 hours ago",
  },
];

// Use passed props or fallback data
const activityLogToUse = computed(() =>
  props.activityLog?.length ? props.activityLog : fallbackActivityLog
);
</script>
