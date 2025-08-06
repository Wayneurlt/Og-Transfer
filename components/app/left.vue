<template>
  <div class="lg:col-span-2 space-y-6 sm:space-y-8">
    <!-- Media Overview Section -->
    <section>
      <h2 class="section-title">Media Overview</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        <div
          v-for="item in mediaToUse"
          :key="item.name"
          class="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-3"
        >
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            :class="item.bgColor"
          >
            <Icon
              :name="item.icon"
              class="text-xl sm:text-2xl"
              :class="item.iconColor"
            />
          </div>
          <div class="overflow-hidden">
            <p class="font-bold text-gray-800 dark:text-white truncate">
              {{ item.name }}
            </p>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {{ item.count }} items
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Folders Section -->
    <section>
      <div class="flex justify-between items-center mb-3 sm:mb-4">
        <h2 class="section-title">Folders</h2>
        <router-link
          to="/folders"
          class="text-sm font-medium text-blue-600 hover:underline"
        >
          View all
        </router-link>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div
          v-for="folder in foldersToUse"
          :key="folder.name"
          class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          @click="emit('folder-click', folder)"
        >
          <Icon
            name="mdi:folder-outline"
            class="text-2xl sm:text-3xl text-blue-500 mb-2"
          />
          <h3 class="font-bold text-gray-800 dark:text-white truncate">
            {{ folder.name }}
          </h3>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {{ folder.fileCount }} files
          </p>
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-1 sm:mt-2">
            Updated {{ folder.updated }}
          </p>
        </div>
      </div>
    </section>

    <!-- Recent Files Section -->
    <section>
      <div class="flex justify-between items-center mb-3 sm:mb-4">
        <h2 class="section-title">Recent Files</h2>
        <router-link
          to="/files"
          class="text-sm font-medium text-blue-600 hover:underline"
        >
          View all
        </router-link>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-x-auto">
        <table class="w-full min-w-[600px] sm:min-w-0 text-left">
          <thead class="border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th class="table-header">Name</th>
              <th class="table-header hidden sm:table-cell">Size</th>
              <th class="table-header hidden md:table-cell">Folder</th>
              <th class="table-header hidden sm:table-cell">Created</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="file in recentFilesToUse"
              :key="file.name"
              class="border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
              @click="emit('file-click', file)"
            >
              <td class="table-cell font-medium">
                <div class="flex items-center py-3">
                  <Icon
                    :name="file.icon"
                    class="mr-2 sm:mr-3 text-lg flex-shrink-0"
                    :class="file.iconColor"
                  />
                  <span
                    class="text-gray-800 dark:text-white truncate max-w-[150px] sm:max-w-none"
                  >
                    {{ file.name }}
                  </span>
                </div>
              </td>
              <td class="table-cell sm:table-cell">{{ file.size }}</td>
              <td class="table-cell  md:table-cell">{{ file.folder }}</td>
              <td class="table-cell  sm:table-cell">{{ file.created }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { defineProps, defineEmits } from "vue";
import type { PropType } from "vue";



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

// Props
const props = defineProps({
  media: { type: Array as PropType<MediaItem[]>, default: () => [] },
  folders: { type: Array as PropType<Folder[]>, default: () => [] },
  recentFiles: { type: Array as PropType<RecentFile[]>, default: () => [] },
});

// Emits
const emit = defineEmits(["folder-click", "file-click"]);

// Fallback data
const fallbackMedia: MediaItem[] = [
  {
    name: "Files",
    count: "1,245",
    icon: "mdi:file-document-outline",
    bgColor: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-500 dark:text-blue-400",
  },
  {
    name: "Videos",
    count: "342",
    icon: "mdi:video-outline",
    bgColor: "bg-red-100 dark:bg-red-900/50",
    iconColor: "text-red-500 dark:text-red-400",
  },
  {
    name: "Pictures",
    count: "876",
    icon: "mdi:image-outline",
    bgColor: "bg-green-100 dark:bg-green-900/50",
    iconColor: "text-green-500 dark:text-green-400",
  },
  {
    name: "Audio",
    count: "156",
    icon: "mdi:music-note-outline",
    bgColor: "bg-purple-100 dark:bg-purple-900/50",
    iconColor: "text-purple-500 dark:text-purple-400",
  },
  {
    name: "Archives",
    count: "89",
    icon: "mdi:zip-box-outline",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
    iconColor: "text-yellow-500 dark:text-yellow-400",
  },
];

const fallbackFolders: Folder[] = [
  { name: "Work Documents", fileCount: 42, updated: "2 hours ago" },
  { name: "Personal", fileCount: 28, updated: "1 day ago" },
  { name: "Shared", fileCount: 15, updated: "3 days ago" },
  { name: "Projects", fileCount: 37, updated: "1 week ago" },
];

const fallbackRecentFiles: RecentFile[] = [
  {
    name: "Project_Proposal.pdf",
    size: "2.4 MB",
    folder: "Work",
    created: "2023-10-15",
    icon: "mdi:file-pdf-box",
    iconColor: "text-red-500",
    type: "pdf",
  },
  {
    name: "Vacation.jpg",
    size: "3.2 MB",
    folder: "Personal",
    created: "2023-10-10",
    icon: "mdi:file-image",
    iconColor: "text-green-500",
    type: "image",
  },
  {
    name: "Meeting_Recording.mp4",
    size: "45.7 MB",
    folder: "Work",
    created: "2023-10-08",
    icon: "mdi:file-video",
    iconColor: "text-blue-500",
    type: "video",
  },
  {
    name: "Budget.xlsx",
    size: "1.8 MB",
    folder: "Projects",
    created: "2023-10-05",
    icon: "mdi:file-excel-box",
    iconColor: "text-green-700",
    type: "spreadsheet",
  },
  {
    name: "Presentation.pptx",
    size: "5.6 MB",
    folder: "Shared",
    created: "2023-10-01",
    icon: "mdi:file-powerpoint-box",
    iconColor: "text-orange-500",
    type: "presentation",
  },
];

// ✅ Computed data that uses fallback if needed
const mediaToUse = computed(() => props.media?.length ? props.media : fallbackMedia);
const foldersToUse = computed(() => props.folders?.length ? props.folders : fallbackFolders);
const recentFilesToUse = computed(() => props.recentFiles?.length ? props.recentFiles : fallbackRecentFiles);
</script>
