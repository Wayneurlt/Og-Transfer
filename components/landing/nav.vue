<template>
  <nav class="container mx-auto px-6 py-6 flex justify-between items-center">
    <div class="flex items-center space-x-2">
      <Icon name="ph:cloud-arrow-up-fill" class="text-3xl text-blue-500" />
      <span class="text-2xl font-bold text-gray-900 dark:text-white"
        >OGTransfer</span
      >
    </div>
    <div class="hidden md:flex items-center space-x-6">
      <a href="#how-it-works" class="nav-link">How It Works</a>
      <a href="#features" class="nav-link">Features</a>
      <a href="#pricing" class="nav-link">Pricing</a>
      <button
        @click="toggleDarkMode()"
        class="p-2 rounded-full  text-gray-700 dark:text-gray-200"
      >
        <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" />
      </button>
      <NuxtLink
        to="auth/sign-up"
        class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-white font-medium transition"
      >
        Get Started
      </NuxtLink>
    </div>
    <button class="md:hidden text-2xl text-gray-900 dark:text-white">
      <Icon name="mdi:menu" />
    </button>
  </nav>
</template>
<script setup>
import { ref, h, resolveComponent, onMounted } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import AOS from "aos";


onMounted(() => {
  AOS.init({
    duration: 800, 
    once: true, 
  });
});

const isDark = useDark();
const toggleDarkMode = useToggle(isDark);

const isDragging = ref(false);
const selectedFiles = ref([]);
const isUploading = ref(false);
const fileInput = ref(null);
</script>
