<template>
  <div class="expiry-result">
    <span class="success" v-if="result && !error">
      Expiry read success
    </span>
    <span class="error" v-if="error">
      {{ error }}
    </span>
    <n-input
        label="Expiry"
        type="text"
        placeholder="Ready to detect ..."
        :value="result">
          {{ result }}
    </n-input>
  </div>
</template>

<script>
import Tesseract from "tesseract.js"

import { defineComponent } from 'vue'
import { NInput } from 'naive-ui'

export default defineComponent({
  name: "read-expiry",
  props: {
    image: Object,
  },
  components: {
    NInput,
  },
  data() {
    return {
      result: undefined,
      error: undefined
    }
  },
  watch: {
    image() {
      if (typeof this.image === 'undefined' || this.image === null) return
      this.error = 'Interpreting ...'
      this.detectPhoto(this.image.src)
    }
  },
  methods: {
    detectPhoto(image) {
      let self = this
      console.log(`Recognizing ${image}`);

      Tesseract.detect(image, { logger: m => console.log(m) })
        .then(({ result }) => {
          console.log(result);
          self.result = ''
          self.error = null
          if (result) {
            if (result.codeResult != null) {
              // self.result = result.codeResult.code
              self.$emit('found-expiry', self.result)
            } else {
              self.error = "Not detected"
            }
          } else {
            self.error = "Detection error"
          }
        });
    }
  }
})
</script>

<style scoped>
.success {
  background: lightyellow;
  padding: 3px;
}
.error {
  background: lightblue;
  padding: 3px;
}
</style>
