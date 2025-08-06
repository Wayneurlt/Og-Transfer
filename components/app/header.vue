<template>
  <header class="flex items-center justify-between mb-6 sm:mb-8">
    <!-- Left side: Welcome Message -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        My Cloud
      </h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">
        Hi {{ userName }}, Welcome back!
      </p>
    </div>

    <!-- Right side: Action Buttons -->
    <div class="flex items-center space-x-2 sm:space-x-3">
      <!-- Theme Toggle Button -->
      <button
        @click="toggleTheme"
        class="p-2 rounded-full text-gray-500 dark:text-gray-400  transition-colors"
        aria-label="Toggle theme"
      >
        <Icon :name="isDarkMode ? 'mdi:weather-sunny' : 'mdi:weather-night'" class="text-xl" />
      </button>

      <!-- Add Files Button -->
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 sm:px-4 rounded-lg flex items-center transition"
        @click="onAddFilesClick"
      >
        <Icon name="mdi:plus" class="text-xl" />
        <span class="ml-2 hidden sm:inline">Add Files</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

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

// --- Dark Mode Logic ---

// 4. Reactive state for the current theme
const isDarkMode = ref(false);

// 5. Function to toggle the theme
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  // Update the class on the root <html> element
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark'); // Save preference
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light'); // Save preference
  }
};

// 6. Set initial theme based on localStorage or system preference
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDarkMode.value = false;
    document.documentElement.classList.remove('dark');
  }
});
</script>