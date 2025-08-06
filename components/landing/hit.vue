<template>
  <!-- How It Works Section -->
  <section id="how-it-works" class="py-20 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16" data-aos="fade-up">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
        >
          How It <span class="text-blue-500">Works</span>
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 mt-4">
          Send files in 3 simple steps.
        </p>
      </div>

      <!-- Desktop Layout with Connecting Line -->
      <div class="hidden md:flex items-start justify-center">
        <template v-for="(step, index) in howItWorksSteps" :key="step.title">
          <div
            class="flex flex-col items-center text-center max-w-xs"
            :data-aos="step.animation"
            :data-aos-delay="step.delay"
          >
            <div
              class="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-100 dark:bg-gray-800 rounded-full border-4 border-white dark:border-gray-900"
            >
              <Icon :name="step.icon" class="text-4xl text-blue-500" />
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              {{ step.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ step.description }}
            </p>
          </div>

          <!-- Render connecting line if it's not the last item -->
          <div
            v-if="index < howItWorksSteps.length - 1"
            class="flex-auto hidden md:block border-t-2 border-dashed border-gray-300 dark:border-gray-600 mx-8 mt-10"
          ></div>
        </template>
      </div>

      <!-- Mobile Layout -->
      <div class="grid grid-cols-1 md:hidden gap-12">
        <div
          v-for="(step, index) in howItWorksSteps"
          :key="index"
          class="text-center"
          data-aos="fade-up"
          :data-aos-delay="100 * index"
        >
          <div
            class="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-100 dark:bg-gray-800 rounded-full"
          >
            <Icon :name="step.icon" class="text-4xl text-blue-500" />
          </div>
          <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            {{ step.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
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
</script>