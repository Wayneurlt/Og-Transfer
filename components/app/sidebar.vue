<template>
  <div>
    <!-- Mobile Header with Toggle Button -->
    <header
      class="lg:hidden flex items-center justify-between p-4 bg-gray-800 dark:bg-gray-900 border-b border-gray-700"
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

    <!-- Sidebar Overlay for Mobile -->
    <div
      v-if="isSidebarOpen"
      class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside
      ref="sidebar"
      class="fixed lg:sticky top-0 left-0 h-screen w-64 bg-gray-800 dark:bg-gray-900 text-white p-6 transition-transform duration-300 ease-in-out z-30 shadow-xl lg:shadow-none"
      :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-full': !isSidebarOpen,
        'lg:translate-x-0': true,
      }"
    >
      <!-- Sidebar Header -->
      <div class="flex items-center space-x-3 mb-10">
        <Icon name="ph:cloud-arrow-up-fill" class="text-3xl text-blue-400" />
        <h1 class="text-2xl font-bold text-white">OGTRANSFER</h1>
      </div>

      <!-- Sidebar Content -->
      <div class="h-[calc(100vh-8.5rem)] flex flex-col overflow-y-auto">
        <nav class="space-y-6 flex-1">
          <!-- Navigation Sections -->
          <div v-for="section in navigation" :key="section.title">
            <h3
              class="px-3 text-xs uppercase text-gray-400 font-bold mb-2 tracking-wider"
            >
              {{ section.title }}
            </h3>
            <ul class="space-y-1">
              <li v-for="link in section.links" :key="link.id">
                <a
                  :href="link.href"
                  class="group flex w-full items-center rounded-lg p-3 transition-colors duration-200 hover:bg-gray-700"
                  :class="{ 'bg-gray-700': modelValue === link.id }"
                  @click.prevent="setActiveLink(link.id)"
                >
                  <Icon
                    :name="link.icon"
                    class="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 transition-colors group-hover:text-white"
                    :class="{ 'text-blue-400': modelValue === link.id }"
                  />
                  <span
                    class="flex-grow font-medium text-sm text-gray-300 transition-colors group-hover:text-white"
                    :class="{ 'text-white': modelValue === link.id }"
                    >{{ link.name }}</span
                  >
                  <span
                    v-if="link.notifications"
                    class="ml-auto inline-block whitespace-nowrap rounded-full bg-blue-500 px-2 py-0.5 text-center text-xs font-bold leading-none text-white"
                    >{{ link.notifications }}</span
                  >
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- User Profile Section -->
        <div class="mt-auto pt-6 border-t border-gray-700">
          <div
            class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div
              class="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"
            >
              <span class="text-sm font-medium">JD</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-white truncate">John Doe</p>
              <p class="text-xs text-gray-400 truncate">john@example.com</p>
            </div>
            <Icon name="mdi:dots-vertical" class="text-lg text-gray-400" />
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Define props and emits
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

// Component state
const isSidebarOpen = ref(false);
const sidebar = ref<HTMLElement | null>(null);

// Navigation data
const navigation = ref([
  {
    title: 'Favorites',
    links: [
      { id: 'favorites', name: 'Favorites', icon: 'mdi:star-outline', href: '#', notifications: 12 },
      { id: 'favorite-folders', name: 'Favorite Folders', icon: 'mdi:folder-star-outline', href: '#', notifications: 5 },
    ],
  },
  {
    title: 'Updates',
    links: [
      { id: 'recent-updates', name: 'Recent Updates', icon: 'mdi:bell-outline', href: '#', notifications: 3 },
      { id: 'notifications', name: 'Notifications', icon: 'mdi:bell-ring-outline', href: '#' },
    ],
  },
  {
    title: 'Management',
    links: [
      { id: 'settings', name: 'Settings', icon: 'mdi:cog-outline', href: '#' },
      { id: 'recycle-bin', name: 'Recycle Bin', icon: 'mdi:trash-can-outline', href: '#', notifications: 8 },
      { id: 'sync-status', name: 'Sync Status', icon: 'mdi:sync', href: '#' },
    ],
  },
]);

// Methods
const setActiveLink = (linkId: string) => {
  emit('update:modelValue', linkId);
  if (window.innerWidth < 1024) {
    isSidebarOpen.value = false;
  }
};

const handleResize = () => {
  if (window.innerWidth >= 1024) {
    isSidebarOpen.value = true;
  } else {
    isSidebarOpen.value = false;
  }
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  // Close sidebar if click is outside and not on the toggle button
  if (
    sidebar.value &&
    !sidebar.value.contains(target) &&
    window.innerWidth < 1024 &&
    !target.closest('button[aria-label="Toggle sidebar"]')
  ) {
    isSidebarOpen.value = false;
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('resize', handleResize);
  document.addEventListener('click', handleClickOutside, true);
  handleResize();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('click', handleClickOutside, true);
});
</script>