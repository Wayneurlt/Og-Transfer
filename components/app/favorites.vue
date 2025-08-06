<!-- src/components/AppFavorites.vue -->
<template>
  <div class="space-y-6 sm:space-y-8">
    <section>
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-4 sm:mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Favorites
        </h1>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ favoriteFilesToUse.length }} items
        </span>
      </div>

      <!-- Favorites Table -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-x-auto">
        <table class="w-full min-w-[600px] sm:min-w-0 text-left">
          <thead class="border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th class="p-3 sm:p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Name</th>
              <th class="p-3 sm:p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 hidden sm:table-cell">Size</th>
              <th class="p-3 sm:p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 hidden md:table-cell">Type</th>
              <th class="p-3 sm:p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 hidden sm:table-cell">Date Added</th>
              <th class="p-3 sm:p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="file in favoriteFilesToUse"
              :key="file.name"
              class="border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
              @click="emit('file-click', file)"
            >
              <td class="p-3 sm:p-4 font-medium">
                <div class="flex items-center">
                  <Icon :name="file.icon" class="mr-3 text-lg flex-shrink-0" :class="file.iconColor" />
                  <span class="text-gray-800 dark:text-white truncate">{{ file.name }}</span>
                </div>
              </td>
              <td class="p-3 sm:p-4 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{{ file.size }}</td>
              <td class="p-3 sm:p-4 text-gray-500 dark:text-gray-400 hidden md:table-cell">{{ file.type }}</td>
              <td class="p-3 sm:p-4 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{{ file.dateAdded }}</td>
              <td class="p-3 sm:p-4 text-right">
                <button @click.stop class="text-gray-500 hover:text-gray-800 dark:hover:text-white">
                  <Icon name="mdi:dots-horizontal" class="h-5 w-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";

// Type definition for a favorite file
type FavoriteFile = {
  name: string;
  size: string;
  type: string;
  dateAdded: string;
  icon: string;
  iconColor: string;
};

// Define component props
const props = defineProps({
  favoriteFiles: { type: Array as PropType<FavoriteFile[]>, default: () => [] },
});

// Define component emits
const emit = defineEmits(["file-click"]);

// Fallback data for demonstration
const fallbackFavoriteFiles: FavoriteFile[] = [
  {
    name: "Brand_Guidelines_v3.pdf",
    size: "12.1 MB",
    type: "PDF Document",
    dateAdded: "2023-10-26",
    icon: "mdi:file-pdf-box",
    iconColor: "text-red-500",
  },
  {
    name: "Q3_Financials_Report.xlsx",
    size: "1.8 MB",
    type: "Spreadsheet",
    dateAdded: "2023-10-22",
    icon: "mdi:file-excel-box",
    iconColor: "text-green-600",
  },
  {
    name: "Onboarding_Presentation.pptx",
    size: "5.6 MB",
    type: "Presentation",
    dateAdded: "2023-10-15",
    icon: "mdi:file-powerpoint-box",
    iconColor: "text-orange-500",
  },
  {
    name: "Company_Retreat_Highlights.mp4",
    size: "128 MB",
    type: "Video",
    dateAdded: "2023-10-11",
    icon: "mdi:file-video",
    iconColor: "text-blue-500",
  },
];

// Use passed props or fallback data
const favoriteFilesToUse = computed(() =>
  props.favoriteFiles?.length ? props.favoriteFiles : fallbackFavoriteFiles
);
</script>