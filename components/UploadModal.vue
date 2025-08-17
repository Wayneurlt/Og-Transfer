<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center p-4">
      <div class="fixed inset-0 bg-gray-500/75 dark:bg-black/50" @click="$emit('close')"></div>
      <div class="relative w-full max-w-lg transform rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Upload Files</h3>
          <div @dragover.prevent="handleDragOver" @dragleave="handleDragLeave" @drop.prevent="handleDrop" class="mt-4 p-8 border-2 border-dashed rounded-lg text-center transition-colors" :class="isDragging ? 'border-blue-500 bg-blue-50 dark:bg-gray-700/50' : 'border-gray-300 dark:border-gray-600'">
            <Icon name="mdi:cloud-upload-outline" class="mx-auto text-4xl text-gray-400 mb-3" />
            <p class="text-gray-500 dark:text-gray-400">Drag & drop files or <label for="fileUpload" class="font-medium text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">browse</label></p>
            <input type="file" id="fileUpload" class="hidden" multiple @change="handleFileSelect">
          </div>
          <div v-if="files.length > 0" class="mt-4 max-h-60 space-y-3 overflow-y-auto pr-2">
            <div v-for="(file, i) in files" :key="i" class="group flex items-center justify-between p-2 rounded-lg border border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-3 min-w-0">
                <FileIcon :type="getFileType(file.name)" />
                <div class="truncate">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ file.name }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatFileSize(file.size) }}</p>
                </div>
              </div>
              <button @click="removeFile(i)" class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 flex-shrink-0">
                <Icon name="mdi:close" class="h-5 w-5"/>
              </button>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800/50 px-6 py-3 flex justify-end gap-3">
          <button type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-600" @click="$emit('close')">Cancel</button>
          <button type="button" class="inline-flex justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 disabled:opacity-50" :disabled="!files.length || isUploading" @click="uploadFiles">
            <Icon v-if="isUploading" name="mdi:loading" class="animate-spin -ml-1 mr-2 h-5 w-5"/>
            {{ isUploading ? 'Uploading...' : 'Upload' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import FileIcon from './FileIcon.vue';

const emit = defineEmits(['close', 'upload-complete']);

const files = ref([]);
const isDragging = ref(false);
const isUploading = ref(false);

const getFileType = (filename) => { const ext = filename.split(".").pop().toLowerCase(); if (["jpg","png","gif"].includes(ext)) return "image"; if (["mp4","mov","avi"].includes(ext)) return "video"; if (["pdf","doc","docx"].includes(ext)) return "document"; return "default"; };
const formatFileSize = (bytes) => { if (bytes === 0) return "0 Bytes"; const k = 1024; const i = Math.floor(Math.log(bytes) / Math.log(k)); return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${["Bytes","KB","MB","GB"][i]}`; };
const addFiles = (newFiles) => { files.value = [...files.value, ...newFiles.filter(f => !files.value.some(ef => ef.name === f.name))] };

const handleDragOver = (e) => { e.preventDefault(); isDragging.value = true; };
const handleDragLeave = () => isDragging.value = false;
const handleDrop = (e) => { e.preventDefault(); isDragging.value = false; addFiles(Array.from(e.dataTransfer.files)); };
const handleFileSelect = (e) => addFiles(Array.from(e.target.files));
const removeFile = (index) => files.value.splice(index, 1);

const uploadFiles = async () => {
  isUploading.value = true;
  try {
    const { useAuthStore } = await import("~/stores/user");
    const auth = useAuthStore();
    for (const file of files.value) {
      const publicLink = `https://files.example.com/${encodeURIComponent(file.name)}`;
      await auth.createUpload({
        title: file.name,
        type: getFileType(file.name),
        size: file.size,
        link: publicLink,
      });
    }
    emit("upload-complete", files.value);
    files.value = [];
  } finally {
    isUploading.value = false;
  }
};
</script>