<template>
  <div class="bg-white dark:bg-gray-950">
    <!-- Navigation -->
    <LandingNav />
    <!-- Hero Section -->
    <LandingHero />

    <!-- How It Works Section -->
    <LandingHit />

    <!-- Features Section -->
    <LandingFeatures />

    <!-- Testimonials Section -->
    <LandingTestimonial />

    <!-- Pricing Section -->
    <LandingPricing />

    <!-- FAQs Section -->
    <LandingFaq />

    <!-- Footer -->
    <LandingFooter />
  </div>
</template>

<script setup>
import { ref, h, resolveComponent, onMounted } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import AOS from "aos";

// Initialize AOS on component mount
onMounted(() => {
  AOS.init({
    duration: 800, // animation duration
    once: true, // whether animation should happen only once - while scrolling down
  });
});

const isDark = useDark();
const toggleDarkMode = useToggle(isDark);

const isDragging = ref(false);
const selectedFiles = ref([]);
const isUploading = ref(false);
const fileInput = ref(null);

// Added animation properties for the "How It Works" section
const howItWorksSteps = [
  {
    icon: "mdi:file-upload-outline",
    title: "Upload Your Files",
    description:
      "Drag and drop your files or select them from your device. No registration needed.",
    animation: "fade-right",
    delay: 100,
  },
  {
    icon: "mdi:link-variant-plus",
    title: "Generate a Secure Link",
    description:
      "We instantly generate a unique and secure link for your files once the upload is complete.",
    animation: "fade-left",
    delay: 200,
  },
  {
    icon: "mdi:send-outline",
    title: "Share with Anyone",
    description:
      "Copy the link and share it via email or messenger. The recipient can download instantly.",
    animation: "fade-right",
    delay: 300,
  },
];

const features = [
  {
    icon: "mdi:file-multiple",
    title: "Up to 20 GB",
    description:
      "Feel free to send large files. We support transfers of up to 20 GB at no cost.",
  },
  {
    icon: "mdi:shield-check",
    title: "Security",
    description:
      "Your files are your own. We encrypt them during transit and at rest for maximum security.",
  },
  {
    icon: "mdi:rocket-launch",
    title: "Blazing Speeds",
    description:
      "We have servers all over the world to ensure your files are transferred as quickly as possible.",
  },
  {
    icon: "mdi:link-variant",
    title: "Shareable Links",
    description:
      "Generate secure links to share your files with anyone, anywhere. Links expire automatically.",
  },
  {
    icon: "mdi:bell-remove",
    title: "No Notifications",
    description:
      "We won't bother you with emails or notifications. Just a simple, clean file sharing experience.",
  },
  {
    icon: "mdi:account-off",
    title: "No Registration",
    description:
      "No need to create an account. Just drag and drop your files and get a shareable link instantly.",
  },
];

const testimonials = [
  {
    quote:
      "OGTransfer is a lifesaver. I needed to send a massive video file to a client, and other services failed. This was fast, free, and incredibly simple.",
    name: "Casey Jordan",
    title: "Freelance Videographer",
    avatar: "mdi:account-circle",
  },
  {
    quote:
      "The fact that it's free and doesn't require an account is a game-changer. It's now my go-to for any quick file sharing needs. Highly recommended!",
    name: "Alex Rivera",
    title: "Web Developer",
    avatar: "mdi:account-circle",
  },
  {
    quote:
      "Secure, reliable, and no strings attached. What more could you ask for? The interface is clean and the user experience is flawless.",
    name: "Morgan Lee",
    title: "UI/UX Designer",
    avatar: "mdi:account-circle",
  },
];

const pricingFeatures = [
  "Up to 20GB file transfers",
  "End-to-end encryption",
  "Password protected links",
  "No registration required",
  "Files available for 7 days",
];

const faqs = [
  {
    question: "Is OGTransfer really free?",
    answer:
      "Yes, absolutely. All features, including sending files up to 20GB, are completely free. We do not have any paid plans.",
  },
  {
    question: "How long are my files stored?",
    answer:
      "To keep the service free and fast for everyone, files are stored on our servers for 7 days. After this period, they are permanently deleted.",
  },
  {
    question: "Is it secure to transfer my files here?",
    answer:
      "Security is our top priority. We use TLS encryption during transit and all files are encrypted at rest on our servers. No one can access your files without the unique share link.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No, registration is not required. You can start transferring files immediately without signing up, making the process as fast as possible.",
  },
];

const openFaqIndex = ref(null);
const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index;
};

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
    const { useAuthStore } = await import("~/stores/user");
    const auth = useAuthStore();
    // Simulate storage upload; in real app, upload to S3/Cloudinary and get public link
    // For now, use a placeholder link per file
    for (const file of selectedFiles.value) {
      const publicLink = `https://files.example.com/${encodeURIComponent(file.name)}`;
      await auth.createUpload({
        title: file.name,
        type: getFileType(file.name),
        size: file.size,
        link: publicLink,
      });
    }
    alert(`${selectedFiles.value.length} files submitted!`);
    selectedFiles.value = [];
  } catch (error) {
    console.error("Upload error:", error);
    alert("Upload failed. Please try again.");
  } finally {
    isUploading.value = false;
  }
}

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
