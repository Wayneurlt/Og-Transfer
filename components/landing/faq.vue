<template>
  <!-- FAQs Section -->
  <section id="faqs" class="py-20 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-6 max-w-4xl">
      <div class="text-center mb-16" data-aos="fade-up">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
        >
          Frequently Asked <span class="text-blue-500">Questions</span>
        </h2>
      </div>
      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          data-aos="fade-up"
          :data-aos-delay="100 * index"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full flex justify-between items-center p-6 text-left font-semibold text-lg text-gray-800 dark:text-white"
          >
            <span>{{ faq.question }}</span>
            <Icon
              :class="{ 'transform rotate-180': openFaqIndex === index }"
              name="mdi:chevron-down"
              class="text-2xl transition-transform"
            />
          </button>
          <div
            v-show="openFaqIndex === index"
            class="px-6 pb-6 text-gray-600 dark:text-gray-400"
          >
            <!-- Use v-html to correctly render line breaks if any -->
            <p v-html="faq.answer"></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const faqs = [
  {
    question: "Is OGTransfer really free?",
    answer:
      "Yes, absolutely. Our 'Free' plan includes sending files up to 20GB and is completely free. We also offer premium 'Pro' and 'Business' plans for users who need larger transfer sizes and more advanced features.",
  },
  {
    question: "How long are my files stored?",
    answer:
      "This depends on your plan. For the 'Free' plan, files are stored for 7 days. 'Pro' plan files are stored for 30 days, and 'Business' plan files can be stored for up to a year. After this period, they are permanently deleted.",
  },
  {
    question: "Is it secure to transfer my files here?",
    answer:
      "Security is our top priority. We use TLS encryption during transit and all files are encrypted at rest on our servers. Pro and Business users also get the ability to add password protection for an extra layer of security.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No registration is required for the 'Free' plan. You can start transferring files immediately. To access the features of our 'Pro' or 'Business' plans, you will need to create an account.",
  },
];

const openFaqIndex = ref(null);

const toggleFaq = (index) => {
  // If the clicked FAQ is already open, close it. Otherwise, open the new one.
  openFaqIndex.value = openFaqIndex.value === index ? null : index;
};
</script>
