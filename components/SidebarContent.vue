<template>
  <div
    class="flex h-16 flex-shrink-0 items-center px-4 bg-gray-900 dark:bg-black/20"
  >
    <a href="#" class="flex items-center gap-2">
      <Icon name="mdi:rocket-launch" class="h-8 w-8 text-white" />
      <span class="text-xl font-bold text-white">OGTransfer</span>
    </a>
  </div>
  <div class="flex flex-1 flex-col overflow-y-auto">
    <nav class="flex-1 space-y-1 px-2 py-4">
      <a
        v-for="item in navItems"
        :key="item.name"
        :href="item.path"
        @click="$emit('navigate')"
        class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        :class="{ 'bg-gray-900 text-white': item.path === '/admin' }"
      >
        <Icon :name="item.icon" class="mr-3 h-5 w-5 flex-shrink-0" />
        {{ item.name }}
      </a>
    </nav>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineEmits(["navigate"]);

const navItems = [
  { name: "Dashboard", icon: "mdi:view-dashboard", path: "/admin" },
  { name: "Files", icon: "mdi:file-multiple", path: "/files" },
  { name: "Shared", icon: "mdi:share-variant", path: "/shared" },
  { name: "Trash", icon: "mdi:trash-can", path: "/trash" },
  { name: "Settings", icon: "mdi:cog", path: "/settings" },
  { name: "System Status", icon: "mdi:shield-account", path: "/admin/status" },
];
</script>
