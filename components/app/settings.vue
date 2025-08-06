<!-- src/components/AppSettings.vue -->
<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
      Settings
    </h1>

    <!-- Profile Settings Section -->
    <section>
      <h2 class="text-xl font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
        Profile
      </h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <form @submit.prevent="saveProfile" class="space-y-6">
          <div class="flex items-center space-x-6">
            <div class="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <span class="text-2xl font-medium text-white">{{ initial(userProfile.name) }}</span>
            </div>
            <div>
              <button type="button" class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                Change Picture
              </button>
              <button type="button" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 ml-3">
                Remove
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input type="text" id="name" v-model="userProfile.name" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <input type="email" id="email" v-model="userProfile.email" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
          </div>
          <div class="text-right">
            <button type="submit" class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </section>

    <!-- Notification Settings Section -->
    <section>
      <h2 class="text-xl font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
        Notifications
      </h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4">
        <div v-for="item in notificationSettings" :key="item.id" class="flex justify-between items-center">
          <div>
            <h4 class="font-medium text-gray-800 dark:text-gray-200">{{ item.label }}</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.description }}</p>
          </div>
          <button
            @click="item.enabled = !item.enabled"
            :class="[item.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600']"
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            role="switch"
            :aria-checked="item.enabled"
          >
            <span
              :class="[item.enabled ? 'translate-x-5' : 'translate-x-0']"
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            ></span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";

// Type definitions for component data
type UserProfile = { name: string; email: string };
type NotificationSetting = { id: string; label: string; description: string; enabled: boolean };

// Define props with default fallback data
const props = defineProps({
  profile: {
    type: Object as PropType<UserProfile>,
    default: () => ({ name: "John Doe", email: "john.doe@example.com" }),
  },
  notifications: {
    type: Array as PropType<NotificationSetting[]>,
    default: () => [
      { id: 'mentions', label: 'Mentions', description: 'Get notified when someone mentions you.', enabled: true },
      { id: 'shares', label: 'File Shares', description: 'Get notified when a file or folder is shared with you.', enabled: true },
      { id: 'summary', label: 'Weekly Summary', description: 'Receive a weekly summary of your activity.', enabled: false },
    ],
  },
});

// Reactive state for the form, initialized from props
const userProfile = ref<UserProfile>({ ...props.profile });
const notificationSettings = ref<NotificationSetting[]>([...props.notifications]);

// Method to get user initials for avatar
const initial = (name: string) => {
  const parts = name.split(' ');
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// Method to handle saving profile (for demonstration)
const saveProfile = () => {
  console.log("Saving profile:", userProfile.value);
  // Here you would typically emit an event or call an API
  alert("Profile saved successfully!");
};
</script>