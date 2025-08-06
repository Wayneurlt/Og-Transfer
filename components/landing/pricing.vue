<template>
  <!-- Pricing Section -->
  <section id="pricing" class="py-20">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16" data-aos="fade-up">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
        >
          Simple and <span class="text-blue-500">Transparent</span> Pricing
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 mt-4">
          Choose the plan that's right for you.
        </p>
      </div>

      <!-- Pricing Cards -->
      <div
        class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div
          v-for="(plan, index) in pricingPlans"
          :key="index"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col transition-all duration-300"
          :class="
            plan.popular
              ? 'border-2 border-blue-500 transform lg:scale-105'
              : 'border border-gray-200 dark:border-gray-700'
          "
        >
          <!-- Popular Badge -->
          <div v-if="plan.popular" class="relative">
            <span
              class="absolute -top-12 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase"
              >Most Popular</span
            >
          </div>

          <h3
            class="text-2xl font-bold text-center text-gray-900 dark:text-white"
          >
            {{ plan.name }}
          </h3>
          <p
            class="text-center text-gray-500 dark:text-gray-400 mt-2 flex-grow"
          >
            {{ plan.description }}
          </p>
          <p
            class="text-5xl md:text-6xl font-bold text-center my-8 text-gray-900 dark:text-white"
          >
            ${{ plan.price
            }}<span class="text-lg font-medium text-gray-500">/month</span>
          </p>
          <ul class="space-y-4 mb-10">
            <li
              v-for="(item, i) in plan.features"
              :key="i"
              class="flex items-center"
            >
              <Icon
                name="mdi:check-circle"
                class="text-xl text-green-500 mr-3 flex-shrink-0"
              />
              <span class="text-gray-700 dark:text-gray-300">{{ item }}</span>
            </li>
          </ul>
          <button
            class="w-full mt-auto font-bold py-3 px-6 rounded-lg transition"
            :class="
              plan.popular
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white'
            "
          >
            {{ plan.buttonText }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const pricingPlans = [
  {
    name: "Free",
    price: 0,
    description: "For quick and simple file sharing. No hidden costs. Ever.",
    features: [
      "Up to 20GB file transfers",
      "End-to-end encryption",
      "No registration required",
      "Files available for 7 days",
    ],
    popular: false,
    buttonText: "Start Transferring Now",
  },
  {
    name: "Pro",
    price: 12,
    description: "For professionals who need more power and customization.",
    features: [
      "Up to 100GB file transfers",
      "Password protected links",
      "Files available for 30 days",
      "Customize your download page",
      "Detailed download statistics",
    ],
    popular: true,
    buttonText: "Get Started with Pro",
  },
  {
    name: "Business",
    price: 25,
    description: "For teams and organizations that need advanced features.",
    features: [
      "Up to 1TB per transfer",
      "Everything in Pro",
      "Team management features",
      "Centralized billing",
      "Priority support",
    ],
    popular: false,
    buttonText: "Contact Sales",
  },
];
</script>
