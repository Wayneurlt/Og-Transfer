<template>
  <header class="flex items-center justify-between mb-6 sm:mb-8">
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        My Cloud
      </h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">
        Hi {{ userName }}, Welcome back!
      </p>
    </div>
    <button
      class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 sm:px-4 rounded-lg flex items-center transition"
      @click="onAddFilesClick"
    >
      <Icon name="mdi:plus" class="text-xl" />
      <span class="ml-2 hidden sm:inline">Add Files</span>
    </button>
  </header>
</template>

<script setup lang="ts">
// 1. Define the props the component accepts from its parent
defineProps<{
  userName: string;
}>();

// 2. Define the events the component can emit to its parent
const emit = defineEmits(["add-files-click"]);

// 3. Create a function to handle the button click and emit the event
const onAddFilesClick = () => {
  emit("add-files-click");
};
</script>
