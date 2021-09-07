<script setup>
import ButtonRepo from '@/components/ButtonRepo.vue'
</script>

<template>
  <div class="bg-gray-50">
    <div
      class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
    >
      <h2
        class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        frosty-star
        <br />
        <span class="text-indigo-600">
            A technical demonstration of reading
            product data on a smartphone.
        </span>
      </h2>
      <p>Developed by Oleg Lavrovsky, Datalets</p>
      <div class="flex mt-8 lg:flex-shrink-0 lg:mt-0">
        <div class="inline-flex rounded-md shadow">
          <router-link
            to="/scan"
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none"
            >Scan Product</router-link
          >
        </div>
        <div class="inline-flex rounded-md shadow mx-5">
          <router-link
            to="/about"
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 transition duration-150 ease-in-out border border-transparent rounded-md focus:outline-none"
            >Background</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
