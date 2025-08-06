<template>
  <div
    class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8" data-aos="fade-up">
      <!-- Header -->
      <div>
        <div class="flex items-center justify-center space-x-2">
          <Icon name="ph:cloud-arrow-up-fill" class="text-4xl text-blue-500" />
          <span class="text-3xl font-bold text-gray-900 dark:text-white"
            >OGTransfer</span
          >
        </div>
        <h2
          class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
        >
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or
          <NuxtLink
            to="/auth/sign-up"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            start for free
          </NuxtLink>
        </p>
      </div>

      <!-- Social Sign In -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <button
            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <Icon name="mdi:google" class="text-xl" />
            <span class="sr-only">Sign in with Google</span>
          </button>
        </div>
        <div>
          <button
            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <Icon name="mdi:github" class="text-xl" />
            <span class="sr-only">Sign in with GitHub</span>
          </button>
        </div>
      </div>

      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div class="relative flex justify-center text-sm">
          <span
            class="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400"
          >
            Or continue with
          </span>
        </div>
      </div>

      <!-- Sign In Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleSignIn">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
            />
            <label
              for="remember-me"
              class="ml-2 block text-sm text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <NuxtLink
              to="/forgot-password"
              class="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot your password?
            </NuxtLink>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
          >
            Sign in
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

function handleSignIn() {
  // Handle the sign-in logic here
  alert("Sign in form submitted!");
}
</script>
