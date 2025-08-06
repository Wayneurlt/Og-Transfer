<template>
 
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8" data-aos="fade-up">
      <!-- Header -->
      <div class="text-center">
        <div class="flex items-center justify-center space-x-2">
          <Icon name="ph:cloud-arrow-up-fill" class="text-4xl text-blue-600" />
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            OGTransfer
          </h1>
        </div>
        <h2
          class="mt-6 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white"
        >
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Or
          <NuxtLink
            to="/auth/sign-in"
            class="text-blue-600 hover:text-blue-500 font-medium"
          >
            sign in to your existing account
          </NuxtLink>
        </p>
      </div>

      <!-- Social Sign Up Buttons -->
      <div class="grid grid-cols-2 gap-3">
        <button
          class="flex items-center justify-center w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          <Icon name="mdi:google" class="text-xl" />
          <span class="sr-only">Sign up with Google</span>
        </button>
        <button
          class="flex items-center justify-center w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          <Icon name="mdi:github" class="text-xl" />
          <span class="sr-only">Sign up with GitHub</span>
        </button>
      </div>

      <!-- Divider -->
      <div class="relative my-4">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div class="relative flex justify-center text-sm">
          <span
            class="px-3 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400"
          >
            Or continue with
          </span>
        </div>
      </div>

      <!-- Sign Up Form -->
      <form @submit.prevent="handleSignUp" class="space-y-5">
        <div class="space-y-4">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autocomplete="email"
              placeholder="Email address"
              class="input-field rounded-t-md"
              aria-label="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autocomplete="new-password"
              placeholder="Password"
              class="input-field"
              aria-label="Password"
            />
          </div>
          <div>
            <label for="confirm-password" class="sr-only"
              >Confirm Password</label
            >
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              autocomplete="new-password"
              placeholder="Confirm Password"
              class="input-field rounded-b-md"
              aria-label="Confirm Password"
            />
          </div>
        </div>

        <!-- Terms and Conditions -->
        <div class="flex items-center text-sm text-gray-700 dark:text-gray-300">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            class="h-4 w-4 text-blue-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
          />
          <label for="terms" class="ml-2">
            I agree to the
            <a
              href="/terms"
              class="text-blue-600 hover:text-blue-500 font-medium"
            >
              Terms of Service
            </a>
          </label>
        </div>

        <!-- Submit -->
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
  });
});

function handleSignUp() {
  // Signup logic placeholder
  alert("Sign up form submitted!");
}
</script>
