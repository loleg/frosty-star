<script setup>
import ButtonRepo from '@/components/ButtonRepo.vue'
</script>

<template>
  <div class="bg-gray-50">
    <div
      class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
    >
      <h2
        class="lg:px-10 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        <span class="text-indigo-600">Technical background</span>
      </h2>

      <p>
        In this project, we analyse the technical viability of a solution for tackling food waste by tracking the expiry date of consumable products. The result is a report on strategies from the perspective of low-cost, open-source development, and a prototype application for smartphones intended to help identify and classify the product by scanning in the barcode and the use-by or expiry date on products. We are motivated to understand the possibilities and limitations of automatically acquiring data to meaningfully inform the user of product expiry.
      </p>

      <p>
        In future versions of the app, you will receive a notification when a product is about to expire.
      </p>

      <p>
        Developed by <a href="https://github.com/loleg">
          Oleg Lavrovsky, Datalets</a>
      </p>

      <div class="flex mt-8 lg:flex-shrink-0 lg:mt-0">
        <ButtonRepo />
      </div>
    </div>
  </div>
</template>
