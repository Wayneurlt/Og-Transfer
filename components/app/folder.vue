<!-- src/components/AppFolders.vue -->
<template>
  <div class="space-y-6 sm:space-y-8">
    <section>
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-4 sm:mb-6">
        <h1
          class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
        >
          Folders
        </h1>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ foldersToUse.length }} items
        </span>
      </div>

      <!-- Expanded Folder Grid -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
      >
        <div
          v-for="folder in foldersToUse"
          :key="folder.name"
          class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          @click="emit('folder-click', folder)"
        >
          <Icon
            name="mdi:folder-outline"
            class="text-4xl sm:text-5xl text-blue-500 mb-3"
          />
          <h3 class="font-semibold text-gray-800 dark:text-white truncate">
            {{ folder.name }}
          </h3>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {{ folder.fileCount }} files
          </p>
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Updated {{ folder.updated }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";

// Define the shape of a Folder object
type Folder = { name: string; fileCount: number; updated: string };

// Define the props the component accepts
const props = defineProps({
  folders: { type: Array as PropType<Folder[]>, default: () => [] },
});

// Define the events it can emit
const emit = defineEmits(["folder-click"]);

// Fallback data in case no props are passed
const fallbackFolders: Folder[] = [
  { name: "Work Documents", fileCount: 42, updated: "2 hours ago" },
  { name: "Personal Photos", fileCount: 289, updated: "1 day ago" },
  { name: "Shared Projects", fileCount: 15, updated: "3 days ago" },
  { name: "Client Invoices", fileCount: 37, updated: "1 week ago" },
  { name: "Design Assets", fileCount: 152, updated: "2 weeks ago" },
  { name: "Video Archive", fileCount: 12, updated: "1 month ago" },
  { name: "University Notes", fileCount: 88, updated: "1 month ago" },
  { name: "Application Backups", fileCount: 4, updated: "2 months ago" },
];

// Use the passed-in props if available, otherwise use the fallback data
const foldersToUse = computed(() =>
  props.folders?.length ? props.folders : fallbackFolders
);
</script>
