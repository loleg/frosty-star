<template>
  <div class="scanner">
    <n-space vertical>

      <div v-if="!photo" class="info top">
        Tap the button above to scan a code.
      </div>

      <read-barcode :image="photo" />

      <div class="info expiry">
        Expiry date:
      </div>

      <n-date-picker
        v-model:value="expiry"
        type="date" />

    </n-space>
  </div>
</template>

<script>
import ReadBarcode from "./ReadBarcode.vue"

import { defineComponent } from 'vue'
import { NDatePicker, NSpace } from 'naive-ui'

export default defineComponent({
  name: "image-scan",
  props: {
    photo: Object,
  },
  components: {
    ReadBarcode,
    NDatePicker,
    NSpace,
  },
  data() {
    return {
      expiry: + new Date(),
      barcode: undefined,
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

.info {
  font-family: monospace;
  margin-top: 1em;
}
</style>
