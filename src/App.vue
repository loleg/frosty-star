<script setup>
import { ref } from 'vue'

let counter = ref(0)

setInterval(() => {
  counter.value++
}, 1000)
</script>

<template>
  <div>
    <header class="bg-white shadow" v-if="$route.meta.title">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-6">
        <router-link
          v-if="$route.meta.title !== 'Home'"
          to="/"
          class="inline-flex float-left items-center justify-center mr-10 px-5 my-1 py-1 lg:py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none"
          >Back</router-link
        >
        <h1
          @click="counter = 0"
          class="text-3xl font-bold leading-tight text-gray-900"
        >
          {{ $route.meta.title }}
        </h1>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>
