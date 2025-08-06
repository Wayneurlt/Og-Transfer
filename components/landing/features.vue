<template>
  <!-- Features Section -->
  <section id="features" class="py-20">
    <div class="container mx-auto px-6">
      <h2
        class="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white"
        data-aos="fade-up"
      >
        Everything you need, for <span class="text-blue-500">free</span>.
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-blue-500"
          data-aos="fade-up"
          :data-aos-delay="100 * (index % 3)"
        >
          <div
            class="w-14 h-14 bg-blue-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6"
          >
            <Icon :name="feature.icon" class="text-3xl text-blue-500" />
          </div>
          <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
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
</script>
