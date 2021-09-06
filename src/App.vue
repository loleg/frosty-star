<template>
  <AppProvider>
    <RouterView />
  </AppProvider>
</template>

<script setup>
// import { useRoute } from 'vue-router';
import { AppProvider } from '@/components/Application';

// const route = useRoute();

</script>

<style lang="less">
  // @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@300&display=swap');
  @import 'styles/index.less';
</style>
