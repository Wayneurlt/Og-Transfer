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
      class="fixed lg:sticky top-0 left-0 h-screen w-64 bg-gray-800 dark:bg-gray-900 text-white p-6 transition-all duration-300 ease-in-out z-30 shadow-xl lg:shadow-none"
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
      <div class="h-[calc(100vh-7rem)] flex flex-col overflow-y-auto">
        <nav class="space-y-8 flex-1">
          <!-- Favorites Section -->
          <div>
            <h3
              class="text-xs uppercase text-gray-400 font-bold mb-3 tracking-wider"
            >
              Favorites
            </h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="sidebar-link group"
                  :class="{ active: modelValue === 'favorites' }"
                  @click.prevent="setActiveLink('favorites')"
                >
                  <Icon
                    name="mdi:star-outline"
                    class="mr-3 text-lg group-[.active]:text-blue-400"
                  />
                  <span>Favorites</span>
                  <span class="sidebar-badge">12</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="sidebar-link group"
                  :class="{ active: modelValue === 'favorite-folders' }"
                  @click.prevent="setActiveLink('favorite-folders')"
                >
                  <Icon
                    name="mdi:folder-star-outline"
                    class="mr-3 text-lg group-[.active]:text-blue-400"
                  />
                  <span>Favorite Folders</span>
                  <span class="sidebar-badge">5</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Updates Section -->
          <div>
            <h3
              class="text-xs uppercase text-gray-400 font-bold mb-3 tracking-wider"
            >
              Updates
            </h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="sidebar-link group"
                  :class="{ active: modelValue === 'recent-updates' }"
                  @click.prevent="setActiveLink('recent-updates')"
                >
                  <Icon
                    name="mdi:bell-outline"
                    class="mr-3 text-lg group-[.active]:text-blue-400"
                  />
                  <span>Recent Updates</span>
                  <span class="sidebar-badge">3</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="sidebar-link group"
                  :class="{ active: modelValue === 'notifications' }"
                  @click.prevent="setActiveLink('notifications')"
                >
                  <Icon
                    name="mdi:bell-ring-outline"
                    class="mr-3 text-lg group-[.active]:text-blue-400"
                  />
                  <span>Notifications</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Management Section -->
          <div>
            <h3
              class="text-xs uppercase text-gray-400 font-bold mb-3 tracking-wider"
            >
              Management
            </h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="sidebar-link group"
                  :class="{ active: modelValue === 'settings' }"
                  @click.prevent="setActiveLink('settings')"
                >
                  <Icon
                    name="mdi:cog-outline"
                    class="mr-3 text-lg group-[.active]:text-blue-400"
                  />
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="sidebar-link group"
                  :class="{ active: modelValue === 'recycle-bin' }"
                  @click.prevent="setActiveLink('recycle-bin')"
                >
                  <Icon
                    name="mdi:trash-can-outline"
                    class="mr-3 text-lg group-[.active]:text-blue-400"
                  />
                  <span>Recycle Bin</span>
                  <span class="sidebar-badge">8</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="sidebar-link group"
                  :class="{ active: modelValue === 'sync-status' }"
                  @click.prevent="setActiveLink('sync-status')"
                >
                  <Icon
                    name="mdi:sync"
                    class="mr-3 text-lg group-[.active]:text-blue-400"
                  />
                  <span>Sync Status</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- User Profile Section -->
        <div class="mt-auto pt-6 border-t border-gray-700">
          <div
            class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
          >
            <div
              class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center"
            >
              <span class="text-sm font-medium">JD</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium truncate">John Doe</p>
              <p class="text-xs text-gray-400 truncate">john@example.com</p>
            </div>
            <Icon name="mdi:chevron-down" class="text-lg text-gray-400" />
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

const isSidebarOpen = ref(false);
const sidebar = ref<HTMLElement | null>(null);

const setActiveLink = (link: string) => {
  emit('update:modelValue', link);
  if (window.innerWidth < 1024) {
    isSidebarOpen.value = false;
  }
};

const handleResize = () => {
  if (window.innerWidth >= 1024) {
    isSidebarOpen.value = true;
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (sidebar.value && !sidebar.value.contains(event.target as Node) && isSidebarOpen.value) {
    isSidebarOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  document.addEventListener('click', handleClickOutside);
  handleResize(); // Initialize based on current screen size
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('click', handleClickOutside);
});
</script>
