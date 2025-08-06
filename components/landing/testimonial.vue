<template>
  <!-- Testimonials Section -->
  <section id="testimonials" class="py-20 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16" data-aos="fade-up">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
        >
          Loved by <span class="text-blue-500">Creators</span> Worldwide
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 mt-4">
          Don't just take our word for it. Here's what people are saying.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-white dark:bg-gray-800 p-8 rounded-lg"
          data-aos="zoom-in-up"
          :data-aos-delay="100 * index"
        >
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            "{{ testimonial.quote }}"
          </p>
          <div class="flex items-center">
            <Icon
              :name="testimonial.avatar"
              class="text-4xl text-blue-500 mr-4"
            />
            <div>
              <p class="font-bold text-gray-900 dark:text-white">
                {{ testimonial.name }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ testimonial.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
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
</script>
