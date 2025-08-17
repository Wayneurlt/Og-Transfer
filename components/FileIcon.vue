<template>
  <div :class="['flex items-center justify-center h-10 w-10 rounded-lg', bgColor]">
    <Icon :name="icon" :class="['h-6 w-6', color]" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  type: String
});

const icons = { document: "mdi:file-document", image: "mdi:file-image", video: "mdi:file-video", presentation: "mdi:file-powerpoint", archive: "mdi:folder-zip", default: "mdi:file" };
const colors = { document: "text-blue-500", image: "text-green-500", video: "text-purple-500", presentation: "text-yellow-500", archive: "text-gray-500", default: "text-gray-500" };
const bgColors = { document: "bg-blue-100 dark:bg-blue-900/50", image: "bg-green-100 dark:bg-green-900/50", video: "bg-purple-100 dark:bg-purple-900/50", presentation: "bg-yellow-100 dark:bg-yellow-900/50", archive: "bg-gray-200 dark:bg-gray-700/50", default: "bg-gray-100 dark:bg-gray-700/50" };

const icon = computed(() => icons[props.type] || icons.default);
const color = computed(() => colors[props.type] || colors.default);
const bgColor = computed(() => bgColors[props.type] || bgColors.default);
</script>