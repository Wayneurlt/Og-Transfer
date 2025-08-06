<!-- src/components/AppUpdates.vue -->
<template>
  <div class="space-y-6 sm:space-y-8">
    <section>
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-4 sm:mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Recent Updates
        </h1>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ updatesToUse.length }} activities
        </span>
      </div>

      <!-- Updates Feed/Timeline -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li
            v-for="(update, index) in updatesToUse"
            :key="index"
            class="p-4 sm:p-5 flex items-start space-x-4"
          >
            <!-- Icon -->
            <div
              class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
              :class="update.iconBgColor"
            >
              <Icon :name="update.icon" class="h-5 w-5" :class="update.iconColor" />
            </div>
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-800 dark:text-gray-200">
                <span class="font-semibold">{{ update.user }}</span>
                {{ update.action }}
                <span class="font-semibold text-blue-600 dark:text-blue-400">{{ update.fileName }}</span>.
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {{ update.timestamp }}
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

// Type definition for an update item
type UpdateItem = {
  user: string;
  action: string;
  fileName: string;
  timestamp: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
};

// Define component props
const props = defineProps({
  updates: { type: Array as PropType<UpdateItem[]>, default: () => [] },
});

// Fallback data for demonstration
const fallbackUpdates: UpdateItem[] = [
  {
    user: "You",
    action: "uploaded a new file named",
    fileName: "Q4_Marketing_Plan.pptx",
    timestamp: "5 minutes ago",
    icon: "mdi:upload",
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100 dark:bg-blue-900/50",
  },
  {
    user: "Jane Smith",
    action: "shared the folder",
    fileName: "Client Invoices",
    timestamp: "2 hours ago",
    icon: "mdi:account-multiple-plus",
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100 dark:bg-green-900/50",
  },
  {
    user: "You",
    action: "deleted the file",
    fileName: "Old_Draft.docx",
    timestamp: "1 day ago",
    icon: "mdi:trash-can-outline",
    iconColor: "text-red-600",
    iconBgColor: "bg-red-100 dark:bg-red-900/50",
  },
  {
    user: "You",
    action: "marked a file as a favorite:",
    fileName: "Brand_Guidelines_v3.pdf",
    timestamp: "2 days ago",
    icon: "mdi:star",
    iconColor: "text-yellow-500",
    iconBgColor: "bg-yellow-100 dark:bg-yellow-900/50",
  },
  {
    user: "Mike Johnson",
    action: "edited the file",
    fileName: "Team_Contacts.xlsx",
    timestamp: "3 days ago",
    icon: "mdi:pencil",
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100 dark:bg-purple-900/50",
  },
];

// Use passed props or fallback data
const updatesToUse = computed(() =>
  props.updates?.length ? props.updates : fallbackUpdates
);
</script>