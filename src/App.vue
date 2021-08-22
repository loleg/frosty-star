<template>
  <Camera />
</template>

<script>
import Camera from "./components/Camera.vue";
export default {
  name: "App",
  components: {
    Camera,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@300&display=swap');

#app {
  font-family: 'Montserrat Alternates', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
