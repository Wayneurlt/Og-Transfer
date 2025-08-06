<template>
  <!-- Hero Section -->
  <section class="container mx-auto px-6 pt-12 pb-24 md:pt-24 md:pb-32">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1
          class="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white"
          data-aos="fade-up"
        >
          The <span class="text-blue-500">Simplest</span> Way to Send Files
        </h1>
        <p
          class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          A secure and free file sharing service. No registration required.
          Share large files up to 20GB for free.
        </p>
      </div>

      <!-- Drag and Drop Area -->
      <div
        class="bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300"
        :class="{
          'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20':
            isDragging,
        }"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleDrop"
        data-aos="zoom-in-up"
        data-aos-delay="200"
      >
        <Icon
          name="mdi:cloud-upload"
          class="mx-auto text-5xl text-blue-500 mb-4"
        />
        <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-white">
          {{
            isDragging
              ? "Drop your files here"
              : "Drag & drop your files here"
          }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Or click to browse your files (Max 20GB)
        </p>
        <input
          type="file"
          id="fileUpload"
          class="hidden"
          multiple
          @change="handleFileSelect"
          ref="fileInput"
        />
        <label
          for="fileUpload"
          class="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium cursor-pointer transition"
        >
          Select Files
        </label>

        <!-- Selected files preview -->
        <div v-if="selectedFiles.length > 0" class="mt-8 text-left">
          <h4 class="font-medium mb-3 text-gray-800 dark:text-white">
            Selected files:
          </h4>
          <ul class="space-y-2 max-h-60 overflow-y-auto">
            <li
              v-for="(file, index) in selectedFiles"
              :key="index"
              class="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <div class="flex items-center min-w-0">
                <FileIcon
                  :type="getFileType(file.name)"
                  class="mr-3 flex-shrink-0"
                />
                <span class="text-gray-800 dark:text-gray-200 truncate">{{
                  file.name
                }}</span>
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-400 pl-3">{{
                formatFileSize(file.size)
              }}</span>
            </li>
          </ul>
          <button
            @click="uploadFiles"
            class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
            :disabled="isUploading"
          >
            <span v-if="!isUploading"
              >Upload {{ selectedFiles.length }} file(s)</span
            >
            <span v-else class="flex items-center justify-center">
              <Icon name="mdi:loading" class="animate-spin mr-2" />
              Uploading...
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, h, resolveComponent } from "vue";

const isDragging = ref(false);
const selectedFiles = ref([]);
const isUploading = ref(false);
const fileInput = ref(null);

function handleDragOver() {
  isDragging.value = true;
}
function handleDragLeave() {
  isDragging.value = false;
}

function handleDrop(e) {
  isDragging.value = false;
  const files = Array.from(e.dataTransfer.files);
  selectedFiles.value = [...selectedFiles.value, ...files];
}

function handleFileSelect(e) {
  const files = Array.from(e.target.files);
  selectedFiles.value = [...selectedFiles.value, ...files];
}

function getFileType(filename) {
  const extension = filename.split(".").pop().toLowerCase();
  const imageTypes = ["jpg", "jpeg", "png", "gif", "webp"];
  const videoTypes = ["mp4", "mov", "avi", "mkv"];
  const docTypes = ["pdf", "doc", "docx", "txt"];
  if (imageTypes.includes(extension)) return "image";
  if (videoTypes.includes(extension)) return "video";
  if (docTypes.includes(extension)) return "document";
  return "file";
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

async function uploadFiles() {
  if (selectedFiles.value.length === 0) return;
  isUploading.value = true;
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert(`${selectedFiles.value.length} files uploaded successfully!`);
    selectedFiles.value = [];
  } catch (error) {
    console.error("Upload error:", error);
    alert("Upload failed. Please try again.");
  } finally {
    isUploading.value = false;
  }
}

// A simple component to render file type icons
const FileIcon = (props) => {
  const icons = {
    image: "mdi:file-image",
    video: "mdi:file-video",
    document: "mdi:file-document",
    file: "mdi:file",
  };
  return h(resolveComponent("Icon"), {
    name: icons[props.type] || icons.file,
    class: "text-2xl text-gray-600 dark:text-gray-300",
  });
};
</script>