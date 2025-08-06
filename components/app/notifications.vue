<!-- src/components/AppNotifications.vue -->
<template>
  <div class="space-y-6 sm:space-y-8">
    <section>
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Notifications
        </h1>
        <div class="flex items-center space-x-3">
          <button class="text-sm font-medium text-blue-600 hover:underline">
            Mark all as read
          </button>
          <button class="text-sm font-medium text-gray-500 hover:underline">
            Clear all
          </button>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li
            v-for="(item, index) in notificationsToUse"
            :key="index"
            class="p-4 sm:p-5 flex items-start space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            :class="{ 'opacity-60': item.read }"
          >
            <!-- Icon -->
            <div
              class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
              :class="item.iconBgColor"
            >
              <Icon :name="item.icon" class="h-5 w-5" :class="item.iconColor" />
            </div>
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-gray-200">
                    {{ item.title }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {{ item.description }}
                  </p>
                </div>
                <!-- Status Dot -->
                <div v-if="!item.read" class="w-2.5 h-2.5 bg-blue-500 rounded-full mt-1.5 ml-3 flex-shrink-0" title="Unread"></div>
              </div>
               <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
                {{ item.timestamp }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";

// Type definition for a notification item
type NotificationItem = {
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  icon: string;
  iconColor: string;
  iconBgColor: string;
};

// Define component props
const props = defineProps({
  notifications: { type: Array as PropType<NotificationItem[]>, default: () => [] },
});

// Fallback data for demonstration
const fallbackNotifications: NotificationItem[] = [
  {
    title: "You were mentioned",
    description: "Jane Smith mentioned you in the project 'Q4 Marketing'.",
    timestamp: "15 minutes ago",
    read: false,
    icon: "mdi:at",
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100 dark:bg-blue-900/50",
  },
  {
    title: "Storage Almost Full",
    description: "You have used 90% of your available storage. Consider upgrading your plan.",
    timestamp: "2 hours ago",
    read: false,
    icon: "mdi:database-alert-outline",
    iconColor: "text-red-600",
    iconBgColor: "bg-red-100 dark:bg-red-900/50",
  },
  {
    title: "New File Shared",
    description: "Mike Johnson shared 'Team_Contacts.xlsx' with you.",
    timestamp: "1 day ago",
    read: true,
    icon: "mdi:share-variant",
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100 dark:bg-green-900/50",
  },
   {
    title: "Weekly Summary",
    description: "Your weekly activity report is ready to be viewed.",
    timestamp: "3 days ago",
    read: true,
    icon: "mdi:chart-line",
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100 dark:bg-purple-900/50",
  },
];

// Use passed props or fallback data
const notificationsToUse = computed(() =>
  props.notifications?.length ? props.notifications : fallbackNotifications
);
</script>