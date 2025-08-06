<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8" data-aos="fade-up">
      <!-- Header -->
      <div>
        <div class="flex items-center justify-center space-x-2">
          <Icon name="ph:cloud-arrow-up-fill" class="text-4xl text-blue-500" />
          <span class="text-3xl font-bold text-gray-900 dark:text-white">OGTransfer</span>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Forgot your password?
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Enter your email address and we'll send you a link to reset it.
        </p>
      </div>

      <!-- Forgot Password Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleForgotPassword">
        <div class="rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Email address">
          </div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900">
            Send Reset Link
          </button>
        </div>
      </form>

      <div class="text-center">
        <div class="text-sm">
          <NuxtLink to="/auth/sign-in" class="font-medium text-blue-600 hover:text-blue-500">
            <Icon name="mdi:arrow-left" class="inline" /> Back to Sign In
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
  });
});

function handleForgotPassword() {
  // Handle the forgot password logic here
  alert('Password reset link sent!');
}
</script>