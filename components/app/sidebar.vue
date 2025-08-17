<template>
  <div>
    <!-- Mobile Header (remains unchanged) -->
    <header
      class="lg:hidden flex items-center justify-between p-4 bg-gray-700 dark:bg-gray-800 border-b border-gray-600"
    >
      <div class="flex items-center space-x-2">
        <Icon name="ph:cloud-arrow-up-fill" class="text-2xl text-blue-400" />
        <div class="text-xl font-bold text-white">OGTRANSFER</div>
      </div>
      <button
        @click="isSidebarOpen = !isSidebarOpen"
        class="text-white p-2 rounded-md hover:bg-gray-700 transition"
        aria-label="Toggle sidebar"
      >
        <Icon
          :name="isSidebarOpen ? 'mdi:close' : 'mdi:menu'"
          class="text-2xl"
        />
      </button>
    </header>

    <!-- Sidebar Overlay for Mobile (remains unchanged) -->
    <div
      v-if="isSidebarOpen"
      class="lg:hidden fixed inset-0 bg-black/40 z-20"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Main Sidebar -->
    <aside
      ref="sidebar"
      class="fixed lg:sticky top-0 left-0 h-screen w-64 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white p-6 transition-transform duration-300 ease-in-out z-30 shadow-xl lg:shadow-none flex flex-col"
      :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-full': !isSidebarOpen,
        'lg:translate-x-0': true,
      }"
    >
      <!-- Sidebar Header -->
      <div class="flex items-center space-x-3 mb-10">
        <Icon
          name="ph:cloud-arrow-up-fill"
          class="text-3xl text-blue-500 dark:text-blue-400"
        />
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          OGTRANSFER
        </h1>
      </div>

      <!-- Scrollable Navigation Area -->
      <div class="flex-1 overflow-y-auto pr-2">
        <nav class="space-y-6">
          <!-- Navigation Sections -->
          <div v-for="section in navigation" :key="section.title">
            <h3
              class="px-3 text-xs uppercase text-gray-500 dark:text-gray-400 font-bold mb-2 tracking-wider"
            >
              {{ section.title }}
            </h3>
            <ul class="space-y-1">
              <li v-for="link in section.links" :key="link.id">
                <a
                  :href="link.href"
                  class="group flex w-full items-center rounded-lg p-3 transition-colors duration-200"
                  :class="{
                    'bg-blue-500 text-white': modelValue === link.id,
                    'hover:bg-gray-200 dark:hover:bg-gray-800':
                      modelValue !== link.id,
                  }"
                  @click.prevent="setActiveLink(link.id)"
                >
                  <Icon
                    :name="link.icon"
                    class="mr-3 h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400 transition-colors group-hover:text-gray-900 dark:group-hover:text-white"
                    :class="{ 'text-white': modelValue === link.id }"
                  />
                  <span
                    class="flex-grow font-medium text-sm"
                    :class="{
                      'text-white': modelValue === link.id,
                      'text-gray-700 dark:text-gray-300':
                        modelValue !== link.id,
                    }"
                    >{{ link.name }}</span
                  >
                  <span
                    v-if="link.notifications"
                    class="ml-auto inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-center text-xs font-bold leading-none"
                    :class="{
                      'bg-white text-blue-500': modelValue === link.id,
                      'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200':
                        modelValue !== link.id,
                    }"
                    >{{ link.notifications }}</span
                  >
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <!-- User Profile & Theme Toggle Section -->
      <div class="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-2">
          <!-- User Info -->
          <div
            class="flex-1 flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer min-w-0"
          >
            <div
              class="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"
            >
              <span class="text-sm font-medium text-white">JD</span>
            </div>
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-semibold text-gray-900 dark:text-white truncate"
              >
                Wayne Gift
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                john@example.com
              </p>
            </div>
          </div>
          <!-- Theme Toggle Button -->
          <!-- <button
            @click="toggleTheme"
            class="p-2 rounded-full text-gray-500 dark:text-gray-400 transition-colors"
            aria-label="Toggle theme"
          >
            <Icon :name="isDarkMode ? 'mdi:weather-sunny' : 'mdi:weather-night'" class="h-6 w-6" />
          </button> -->
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

// --- PROPS & EMITS ---
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(["update:modelValue"]);

// --- SIDEBAR STATE ---
const isSidebarOpen = ref(false);
const sidebar = ref<HTMLElement | null>(null);

// --- DARK MODE STATE ---
const isDarkMode = ref(false);

// --- NAVIGATION DATA ---
const navigation = ref([
  {
    title: "Main",
    links: [
      {
        id: "left",
        name: "Home",
        icon: "mdi:home-outline",
        href: "#",
      },
    ],
  },

  {
    title: "Favorites",
    links: [
      {
        id: "favorites",
        name: "Favorites",
        icon: "mdi:star-outline",
        href: "#",
        notifications: 12,
      },
      {
        id: "favorite-folders",
        name: "Folders",
        icon: "mdi:folder-star-outline",
        href: "#",
        notifications: 5,
      },
    ],
  },
  {
    title: "Updates",
    links: [
      {
        id: "recent-updates",
        name: "Recent Updates",
        icon: "mdi:bell-outline",
        href: "#",
        notifications: 3,
      },
      {
        id: "notifications",
        name: "Notifications",
        icon: "mdi:bell-ring-outline",
        href: "#",
      },
    ],
  },
  {
    title: "Management",
    links: [
      { id: "settings", name: "Settings", icon: "mdi:cog-outline", href: "#" },
      {
        id: "recycle-bin",
        name: "Recycle Bin",
        icon: "mdi:trash-can-outline",
        href: "#",
        notifications: 8,
      },
      { id: "sync-status", name: "Sync Status", icon: "mdi:sync", href: "#" },
    ],
  },
]);

// --- METHODS ---
const setActiveLink = (linkId: string) => {
  emit("update:modelValue", linkId);
  if (window.innerWidth < 1024) {
    isSidebarOpen.value = false;
  }
};

const handleResize = () => {
  isSidebarOpen.value = window.innerWidth >= 1024;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (
    sidebar.value &&
    !sidebar.value.contains(target) &&
    window.innerWidth < 1024 &&
    !target.closest('button[aria-label="Toggle sidebar"]')
  ) {
    isSidebarOpen.value = false;
  }
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  // Initialize sidebar visibility
  handleResize();
  window.addEventListener("resize", handleResize);
  document.addEventListener("click", handleClickOutside, true);

  // Initialize theme
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
  } else {
    isDarkMode.value = false;
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  document.removeEventListener("click", handleClickOutside, true);
});
</script>
