<template>
  <div class="scanner">
    <tt>{{ photos.length }}</tt>

    <n-space vertical>

      <n-input
        label="Barcode"
        type="text"
        placeholder="Detecting barcode ..." />

      <tt>Expiry date:</tt>

      <n-date-picker
        v-model:value="expiry"
        type="date" />

    </n-space>
  </div>
</template>

<script>

import { defineComponent } from 'vue'
import { NInput, NDatePicker } from 'naive-ui'

export default defineComponent({
  name: "image-scan",
  props: {
    photos: Array,
  },
  components: {
    NInput,
    NDatePicker,
  },
  data() {
    return {
      expiry: new Date(),
      locale: undefined // Browser locale
    }
  }
})
</script>

<style scoped>
button {
  width: 100%;
  height: 3em;
  background: lightgreen;
  border: 2px solid salmon;
}
</style>
