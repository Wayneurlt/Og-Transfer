<template>
  <div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105">
    <div class="p-5">
      <div class="flex items-center">
        <div class="flex-shrink-0 h-10 w-10 rounded-md bg-gradient-to-r from-blue-700 to-purple-600 flex items-center justify-center">
          <Icon :name="icon" class="h-5 w-5 text-white" />
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="truncate text-sm font-medium text-gray-500 dark:text-gray-400">{{ name }}</dt>
            <dd><div class="text-lg font-medium text-gray-900 dark:text-white">{{ value }}</div></dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
defineProps({
  icon: String,
  name: String,
  value: String
});
</script>