<!-- src/components/AppRecycleBin.vue -->
<template>
  <div class="space-y-6 sm:space-y-8">
    <section>
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Recycle Bin
        </h1>
        <div class="flex items-center space-x-3">
          <button @click="emit('restore-all-click')" class="text-sm font-medium text-blue-600 hover:underline">
            Restore All
          </button>
          <button @click="emit('empty-bin-click')" class="text-sm font-medium text-red-500 hover:underline">
            Empty Bin
          </button>
        </div>
      </div>

      <!-- Deleted Files Table -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-x-auto">
        <table class="w-full min-w-[600px] sm:min-w-0 text-left">
          <thead class="border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th class="p-3 sm:p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Name</th>
              <th class="p-3 sm:p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 hidden sm:table-cell">Size</th>
              <th class="p-3 sm:p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 hidden md:table-cell">Date Deleted</th>
              <th class="p-3 sm:p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="file in deletedFilesToUse"
              :key="file.id"
              class="group border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <td class="p-3 sm:p-4 font-medium">
                <div class="flex items-center">
                  <Icon :name="file.icon" class="mr-3 text-lg flex-shrink-0" :class="file.iconColor" />
                  <span class="text-gray-800 dark:text-white truncate">{{ file.name }}</span>
                </div>
              </td>
              <td class="p-3 sm:p-4 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{{ file.size }}</td>
              <td class="p-3 sm:p-4 text-gray-500 dark:text-gray-400 hidden md:table-cell">{{ file.dateDeleted }}</td>
              <td class="p-3 sm:p-4 text-right">
                <!-- Actions appear on hover -->
                <div class="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end space-x-2">
                   <button @click="emit('restore-file-click', file)" class="p-1 text-gray-500 hover:text-blue-600" title="Restore">
                     <Icon name="mdi:restore" class="h-5 w-5" />
                   </button>
                   <button @click="emit('delete-file-click', file)" class="p-1 text-gray-500 hover:text-red-600" title="Delete Permanently">
                     <Icon name="mdi:delete-forever" class="h-5 w-5" />
                   </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
         <!-- Empty State -->
        <div v-if="!deletedFilesToUse.length" class="text-center p-12">
            <Icon name="mdi:trash-can-outline" class="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto" />
            <h3 class="mt-4 text-lg font-semibold text-gray-800 dark:text-white">Recycle Bin is Empty</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Deleted items will appear here.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";

// Type definition for a deleted file
type DeletedFile = {
  id: number;
  name: string;
  size: string;
  dateDeleted: string;
  icon: string;
  iconColor: string;
};

// Define component props
const props = defineProps({
  deletedFiles: { type: Array as PropType<DeletedFile[]>, default: () => [] },
});

// Define component emits for all actions
const emit = defineEmits([
  "restore-file-click",
  "delete-file-click",
  "restore-all-click",
  "empty-bin-click",
]);

// Fallback data for demonstration
const fallbackDeletedFiles: DeletedFile[] = [
  {
    id: 1,
    name: "Old_Project_Brief.docx",
    size: "78 KB",
    dateDeleted: "2023-10-25",
    icon: "mdi:file-word-box",
    iconColor: "text-blue-500",
  },
  {
    id: 2,
    name: "Draft_Invoice_#123.pdf",
    size: "1.1 MB",
    dateDeleted: "2023-10-24",
    icon: "mdi:file-pdf-box",
    iconColor: "text-red-500",
  },
  {
    id: 3,
    name: "Unused_Logo_Concept.png",
    size: "450 KB",
    dateDeleted: "2023-10-22",
    icon: "mdi:file-image",
    iconColor: "text-green-500",
  },
  {
    id: 4,
    name: "Archived_Data.zip",
    size: "25.3 MB",
    dateDeleted: "2023-10-20",
    icon: "mdi:zip-box",
    iconColor: "text-yellow-500",
  },
];

// Use passed props or fallback data
const deletedFilesToUse = computed(() =>
  props.deletedFiles?.length ? props.deletedFiles : fallbackDeletedFiles
);
</script>