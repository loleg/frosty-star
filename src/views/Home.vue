<script setup>
import ProductList from '@/components/ProductList.vue'
</script>

<template>
  <div class="bg-gray-50">
    <div
      class="mx-8 sm:px-6 lg:px-8 py-8 lg:items-center lg:justify-between"
    >
      <img src="/tomato.png" style="float:right;width:15%">
      <h2
        class="clear text-2xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 text-gray-300"
      >
        frosty-star v0.1.2
      </h2>
      <h3 class="text-gray-600">
        A technical demonstration of reading
        product data on a smartphone.
      </h3>
    </div>

    <ProductList />

    <div
      class="max-w-screen-xl pb-4 px-4 mx-auto sm:px-8 md:mx-12 lg:flex items-center justify-between"
    >
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
