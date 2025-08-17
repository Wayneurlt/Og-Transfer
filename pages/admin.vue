<template>
  <div
    class="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
  >
    <!-- Mobile sidebar -->
    <transition
      enter-active-class="transition-opacity ease-linear duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileSidebarOpen"
        class="fixed inset-0 z-40 flex lg:hidden"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
          @click="mobileSidebarOpen = false"
        ></div>
        <transition
          enter-active-class="transition ease-in-out duration-300 transform"
          enter-from-class="-translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition ease-in-out duration-300 transform"
          leave-from-class="translate-x-0"
          leave-to-class="-translate-x-full"
        >
          <div
            class="relative flex w-64 max-w-xs flex-1 flex-col bg-gray-800 dark:bg-gray-950"
          >
            <SidebarContent @navigate="mobileSidebarOpen = false" />
          </div>
        </transition>
      </div>
    </transition>

    <!-- Static sidebar for desktop -->
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:dark:border-gray-700 lg:dark:bg-gray-950"
    >
      <SidebarContent />
    </div>

    <!-- Main content -->
    <div class="flex flex-1 flex-col lg:pl-64">
      <!-- 
        UPDATED HEADER: Added theme toggle button
      -->
      <header
        class="sticky top-0 z-30 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <div class="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
          <div class="flex items-center lg:hidden">
            <button
              type="button"
              class="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
              @click="mobileSidebarOpen = true"
            >
              <span class="sr-only">Open sidebar</span>
              <Icon name="mdi:menu" class="h-6 w-6" />
            </button>
          </div>

          <div class="flex-1 flex justify-end items-center gap-4">
            <!-- THEME TOGGLE BUTTON -->
            <button
              type="button"
              @click="toggleTheme"
              class="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-200 focus:outline-none"
            >
              <span class="sr-only">Toggle theme</span>
              <Icon
                :name="
                  isDarkMode ? 'mdi:white-balance-sunny' : 'mdi:weather-night'
                "
                class="h-6 w-6"
              />
            </button>

            <!-- User Profile Menu -->
            <div class="relative">
              <button
                type="button"
                class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none"
                @click="userMenuOpen = !userMenuOpen"
              >
                <span class="sr-only">Open user menu</span>
                <div
                  class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-700 to-purple-600 flex items-center justify-center text-white font-medium"
                >
                  {{ userInitials }}
                </div>
              </button>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="userMenuOpen"
                  class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-600 z-40"
                  role="menu"
                  @click="userMenuOpen = false"
                >
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    role="menuitem"
                    >Your Profile</a
                  >
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    role="menuitem"
                    >Settings</a
                  >
                  <button
                    @click="handleLogout"
                    class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto">
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div
            class="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
          >
            <div>
              <h1 class="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ greeting }}, {{ currentUser.name }}! Here's what's happening
                today.
              </p>
            </div>
            <div class="flex gap-3">
              <button
                type="button"
                class="inline-flex items-center gap-x-1.5 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
                @click="openUploadModal"
              >
                <Icon name="mdi:upload" class="-ml-0.5 h-5 w-5" />
                Upload Files
              </button>
              <button
                type="button"
                class="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700"
              >
                <Icon name="mdi:filter" class="-ml-0.5 h-5 w-5" />
                Filter
              </button>
            </div>
          </div>

          <!-- The rest of the template remains the same -->
          <!-- Stats Cards -->
          <div
            class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          >
            <StatCard
              v-for="stat in stats"
              :key="stat.name"
              :icon="stat.icon"
              :name="stat.name"
              :value="stat.value"
            />
          </div>

          <!-- Quick Access Folders -->
          <div class="mb-8">
            <h2 class="text-lg font-medium leading-6 mb-4">Quick Access</h2>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
              <FolderCard
                v-for="folder in folders"
                :key="folder.name"
                :folder="folder"
              />
            </div>
          </div>

          <!-- Recent Activity and Storage Overview -->
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div class="lg:col-span-2">
              <div class="rounded-lg bg-white shadow dark:bg-gray-800">
                <div class="px-4 py-5 sm:p-6">
                  <div class="flex items-center justify-between">
                    <h2 class="text-lg font-medium leading-6">
                      Recent Activity
                    </h2>
                    <a
                      href="#"
                      class="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                      >View all</a
                    >
                  </div>
                  <div class="mt-6 flow-root">
                    <ul class="-mb-8">
                      <li
                        v-for="(activity, idx) in recentActivities"
                        :key="activity.id"
                      >
                        <div class="relative pb-8">
                          <span
                            v-if="idx !== recentActivities.length - 1"
                            class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                            aria-hidden="true"
                          />
                          <div class="relative flex space-x-3">
                            <div>
                              <span
                                :class="[
                                  activity.iconBackground,
                                  'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-800',
                                ]"
                              >
                                <Icon
                                  :name="activity.icon"
                                  class="h-5 w-5 text-white"
                                />
                              </span>
                            </div>
                            <div
                              class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5"
                            >
                              <div>
                                <p
                                  class="text-sm text-gray-800 dark:text-gray-200"
                                >
                                  {{ activity.description }}
                                  <a
                                    href="#"
                                    class="font-medium text-gray-900 dark:text-white"
                                    >{{ activity.target }}</a
                                  >
                                </p>
                              </div>
                              <div
                                class="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400"
                              >
                                <time :datetime="activity.datetime">{{
                                  activity.date
                                }}</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="rounded-lg bg-white shadow dark:bg-gray-800">
                <div class="px-4 py-5 sm:p-6">
                  <h2 class="text-lg font-medium leading-6">
                    Storage Overview
                  </h2>
                  <div class="mt-6">
                    <div class="flex items-center justify-between">
                      <h3
                        class="text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Total Storage
                      </h3>
                      <span
                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                        >{{ usedStorage }} of {{ totalStorage }} used</span
                      >
                    </div>
                    <div class="mt-2">
                      <div
                        class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700"
                      >
                        <div
                          class="h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                          :style="{ width: `${storagePercentage}%` }"
                        />
                      </div>
                    </div>
                    <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div
                        v-for="type in storageByType"
                        :key="type.name"
                        class="flex items-center"
                      >
                        <div
                          class="mr-2 h-2 w-2 rounded-full"
                          :class="type.color"
                        />
                        <div class="flex justify-between w-full">
                          <span class="text-gray-500 dark:text-gray-400">{{
                            type.name
                          }}</span>
                          <span class="font-medium"
                            >{{ type.percentage }}%</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="border-t border-gray-200 px-4 py-4 sm:px-6 dark:border-gray-700"
                >
                  <button
                    type="button"
                    class="w-full rounded-md bg-blue-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
                  >
                    Upgrade Storage
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Files -->
          <div class="mt-8">
            <div
              class="rounded-lg bg-white shadow dark:bg-gray-800 sm:overflow-hidden"
            >
              <div class="px-4 py-5 sm:px-6">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-medium leading-6">Recent Files</h2>
                  <button
                    type="button"
                    class="hidden sm:inline-flex items-center gap-x-1.5 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
                    @click="openUploadModal"
                  >
                    <Icon name="mdi:plus" class="-ml-0.5 h-5 w-5" /> New File
                  </button>
                </div>
              </div>
              <ul
                class="sm:hidden divide-y divide-gray-200 dark:divide-gray-700 px-4"
              >
                <li v-for="file in recentFiles" :key="file.id" class="py-4">
                  <div class="flex items-center space-x-4">
                    <FileIcon
                      :type="file.type"
                      class="h-10 w-10 flex-shrink-0"
                    />
                    <div class="flex-1 min-w-0">
                      <p
                        class="text-sm font-medium text-gray-900 truncate dark:text-white"
                      >
                        {{ file.name }}
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{ file.folder }}
                      </p>
                    </div>
                    <button
                      @click="openFileMenu(file.id)"
                      class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <Icon name="mdi:dots-vertical" class="h-5 w-5" />
                    </button>
                  </div>
                  <div class="mt-4 flex justify-between text-sm">
                    <span
                      class="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium capitalize"
                      :class="
                        fileTypeClasses[file.type] || fileTypeClasses.default
                      "
                      >{{ file.type }}</span
                    >
                    <div class="text-gray-500 dark:text-gray-300">
                      <span class="font-medium">{{ file.size }}</span> -
                      {{ file.modified }}
                    </div>
                  </div>
                </li>
              </ul>
              <div class="hidden sm:block overflow-x-auto">
                <table
                  class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <thead class="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                      >
                        Size
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                      >
                        Last Modified
                      </th>
                      <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800"
                  >
                    <tr
                      v-for="file in recentFiles"
                      :key="file.id"
                      class="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td class="whitespace-nowrap px-6 py-4">
                        <div class="flex items-center">
                          <div class="h-10 w-10 flex-shrink-0">
                            <FileIcon :type="file.type" class="h-10 w-10" />
                          </div>
                          <div class="ml-4">
                            <div
                              class="text-sm font-medium text-gray-900 dark:text-white"
                            >
                              {{ file.name }}
                            </div>
                            <div
                              class="text-sm text-gray-500 dark:text-gray-400"
                            >
                              {{ file.folder }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300"
                      >
                        {{ file.size }}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <span
                          class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                          :class="
                            fileTypeClasses[file.type] ||
                            fileTypeClasses.default
                          "
                          >{{ file.type }}</span
                        >
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300"
                      >
                        {{ file.modified }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                      >
                        <button
                          @click="openFileMenu(file.id)"
                          class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Icon name="mdi:dots-vertical" class="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modals -->
    <UploadModal
      v-if="showUploadModal"
      @close="showUploadModal = false"
      @upload-complete="handleUploadComplete"
    />
    <FileContextMenu
      v-if="activeFileMenu"
      :file-id="activeFileMenu"
      @close="activeFileMenu = null"
      @download="handleDownload"
      @share="handleShare"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
// UPDATED SCRIPT: Added onMounted and watch for theme management
import { ref, computed, onMounted, watch } from "vue";
import { Icon } from "@iconify/vue";



// --- THEME MANAGEMENT ---
const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};

// Watch for changes in isDarkMode and update the DOM and localStorage
watch(isDarkMode, (newVal) => {
  if (newVal) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});

// Check for saved theme preference on component mount
onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    isDarkMode.value = true;
  } else {
    isDarkMode.value = false;
  }
});

// --- STATE & DATA ---
const mobileSidebarOpen = ref(false);
const userMenuOpen = ref(false);
const showUploadModal = ref(false);
const activeFileMenu = ref(null);

const currentUser = ref({
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  storageUsed: 45.2,
  storageTotal: 100,
});
const userInitials = computed(() =>
  currentUser.value.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
);
const greeting = computed(() => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
});
const usedStorage = computed(
  () => `${currentUser.value.storageUsed.toFixed(1)} GB`
);
const totalStorage = computed(() => `${currentUser.value.storageTotal} GB`);
const storagePercentage = computed(
  () => (currentUser.value.storageUsed / currentUser.value.storageTotal) * 100
);

const stats = ref([
  { name: "Total Files", value: "1,248", icon: "mdi:file-multiple" },
  { name: "Active Users", value: "84", icon: "mdi:account-group" },
  { name: "Storage Used", value: usedStorage.value, icon: "mdi:harddisk" },
  { name: "Shared Links", value: "236", icon: "mdi:link-variant" },
]);

const folders = ref([
  {
    name: "Work",
    fileCount: 234,
    lastModified: "2d ago",
    icon: "mdi:folder-briefcase",
    color: "text-blue-500",
  },
  {
    name: "Personal",
    fileCount: 88,
    lastModified: "5d ago",
    icon: "mdi:folder-account",
    color: "text-green-500",
  },
  {
    name: "Marketing Assets",
    fileCount: 152,
    lastModified: "1h ago",
    icon: "mdi:folder-image",
    color: "text-purple-500",
  },
  {
    name: "Archived",
    fileCount: 410,
    lastModified: "1mo ago",
    icon: "mdi:folder-zip",
    color: "text-gray-500",
  },
]);

const recentActivities = ref([
  {
    id: 1,
    description: "Uploaded",
    target: "Project_Proposal.pdf",
    icon: "mdi:upload",
    iconBackground: "bg-blue-500",
    date: "2h ago",
  },
  {
    id: 2,
    description: "Shared",
    target: "Marketing_Assets folder",
    icon: "mdi:share-variant",
    iconBackground: "bg-green-500",
    date: "3h ago",
  },
  {
    id: 3,
    description: "Deleted",
    target: "Old_Report.xlsx",
    icon: "mdi:trash-can",
    iconBackground: "bg-red-500",
    date: "Yesterday",
  },
  {
    id: 4,
    description: "Created",
    target: "New Project folder",
    icon: "mdi:folder-plus",
    iconBackground: "bg-purple-500",
    date: "Yesterday",
  },
]);

const storageByType = ref([
  { name: "Videos", percentage: 30, color: "bg-purple-500" },
  { name: "Images", percentage: 25, color: "bg-green-500" },
  { name: "Documents", percentage: 35, color: "bg-blue-500" },
  { name: "Other", percentage: 10, color: "bg-gray-500" },
]);

const recentFiles = ref([
  {
    id: 1,
    name: "Project_Proposal.pdf",
    size: "2.4 MB",
    type: "document",
    folder: "Work/Projects",
    modified: "Jun 15, 2023",
  },
  {
    id: 2,
    name: "Team_Photo.jpg",
    size: "4.2 MB",
    type: "image",
    folder: "Personal",
    modified: "Jun 14, 2023",
  },
  {
    id: 3,
    name: "Presentation.pptx",
    size: "18.7 MB",
    type: "presentation",
    folder: "Work/Meetings",
    modified: "Jun 14, 2023",
  },
  {
    id: 4,
    name: "Project_Assets.zip",
    size: "128 MB",
    type: "archive",
    folder: "Work/Archive",
    modified: "Jun 13, 2023",
  },
  {
    id: 5,
    name: "Product_Demo.mp4",
    size: "256 MB",
    type: "video",
    folder: "Work/Marketing",
    modified: "Jun 12, 2023",
  },
]);

// --- STYLING MAPPINGS ---
const fileTypeClasses = {
  document: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  image: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  video:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  presentation:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  archive: "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300",
  default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
};

// --- METHODS ---
const openUploadModal = () => (showUploadModal.value = true);
const openFileMenu = (fileId) => (activeFileMenu.value = fileId);
const handleLogout = () => console.log("Logging out...");
const handleDownload = (fileId) => {
  console.log("Downloading:", fileId);
  activeFileMenu.value = null;
};
const handleShare = (fileId) => {
  console.log("Sharing:", fileId);
  activeFileMenu.value = null;
};
const handleDelete = (fileId) => {
  recentFiles.value = recentFiles.value.filter((f) => f.id !== fileId);
  activeFileMenu.value = null;
};
const handleUploadComplete = (uploadedFiles) => {
  const newFiles = uploadedFiles.map((file, index) => ({
    id: Math.max(...recentFiles.value.map((f) => f.id), 0) + 1 + index,
    name: file.name,
    size: formatFileSize(file.size),
    type: getFileType(file.name),
    folder: "Uploads",
    modified: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));
  recentFiles.value.unshift(...newFiles);
  showUploadModal.value = false;
};

// --- UTILITY FUNCTIONS ---
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024,
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${
    ["Bytes", "KB", "MB", "GB"][i]
  }`;
};

const getFileType = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
  if (["mp4", "mov", "avi", "mkv", "webm"].includes(ext)) return "video";
  if (["pdf", "doc", "docx", "txt"].includes(ext)) return "document";
  if (["ppt", "pptx"].includes(ext)) return "presentation";
  if (["zip", "rar", "7z", "tar"].includes(ext)) return "archive";
  return "default";
};
</script>
