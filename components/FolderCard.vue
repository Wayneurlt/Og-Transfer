<template>
  <div class="group overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
     <div class="flex items-center justify-between mb-4">
       <div class="h-10 w-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-700">
         <Icon :name="folder.icon" class="h-6 w-6" :class="folder.color" />
       </div>
     </div>
     <div>
       <h3 class="text-sm font-semibold text-gray-900 dark:text-white">{{ folder.name }}</h3>
       <p class="text-xs text-gray-500 dark:text-gray-400">{{ folder.fileCount }} files - {{ folder.lastModified }}</p>
     </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
defineProps({
  folder: Object
});
</script>