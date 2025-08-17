<template>
  <div class="fixed inset-0 z-40" @click.self="$emit('close')">
    <div class="absolute right-10 mt-40 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-600">
      <a v-for="action in actions" :key="action.name" href="#" @click.prevent="$emit(action.event, fileId)" class="flex items-center gap-3 px-4 py-2 text-sm" :class="action.destructive ? 'text-red-700 dark:text-red-400 hover:bg-red-500 hover:text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'">
        <Icon :name="action.icon" class="h-5 w-5"/>
        <span>{{ action.name }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
defineProps({ fileId: Number });
defineEmits(['close', 'download', 'share', 'delete']);
const actions = [
  { name: "Download", icon: "mdi:download", event: "download" },
  { name: "Share", icon: "mdi:share-variant", event: "share" },
  { name: "Delete", icon: "mdi:trash-can", event: "delete", destructive: true },
];
</script>