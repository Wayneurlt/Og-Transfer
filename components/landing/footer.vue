<template>
  <!-- Footer -->
  <footer
    class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
  >
    <div class="container mx-auto px-6 py-12" data-aos="fade-up">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Column 1: Brand & Social -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <Icon
              name="ph:cloud-arrow-up-fill"
              class="text-3xl text-blue-500"
            />
            <span class="text-2xl font-bold text-gray-900 dark:text-white"
              >OGTransfer</span
            >
          </div>
          <p class="text-gray-500 dark:text-gray-400">
            The simplest way to send files, securely and for free.
          </p>
          <div class="flex space-x-4 mt-6">
            <a href="#" class="footer-social-link"
              ><Icon name="mdi:twitter" class="text-2xl"
            /></a>
            <a href="#" class="footer-social-link"
              ><Icon name="mdi:github" class="text-2xl"
            /></a>
            <a href="#" class="footer-social-link"
              ><Icon name="mdi:linkedin" class="text-2xl"
            /></a>
          </div>
        </div>
        <!-- Column 2: Product -->
        <div>
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">Product</h3>
          <ul class="space-y-3">
            <li>
              <a href="#how-it-works" class="footer-link">How It Works</a>
            </li>
            <li><a href="#features" class="footer-link">Features</a></li>
            <li><a href="#pricing" class="footer-link">Pricing</a></li>
            <li><a href="#faqs" class="footer-link">FAQs</a></li>
          </ul>
        </div>
        <!-- Column 3: Company -->
        <div>
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">Company</h3>
          <ul class="space-y-3">
            <li><a href="#" class="footer-link">About Us</a></li>
            <li><a href="#" class="footer-link">Contact</a></li>
          </ul>
        </div>
        <!-- Column 4: Legal -->
        <div>
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">Legal</h3>
          <ul class="space-y-3">
            <li><a href="#" class="footer-link">Privacy Policy</a></li>
            <li><a href="#" class="footer-link">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div
        class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400"
      >
        <p>© {{ new Date().getFullYear() }} OGTransfer. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No additional script logic is needed for this component.
// The year is dynamically generated in the template itself.
</script>

