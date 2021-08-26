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
        placeholder="Ready to scan ..."
        :value="result">
          {{ result }}
    </n-input>
  </div>
</template>

<script>
import Tesseract from "tesseract.js"

const { createWorker } = Tesseract
const worker = createWorker()

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
      this.error = 'Reading ...'
      this.detectPhoto(this.image.src)
    }
  },
  methods: {
    async detectPhoto(image) {
      const self = this
      const reader = new FileReader()

      return new Promise((resolve, reject) => {

        reader.onerror = () => {
          reader.abort()
          reject(new DOMException("Problem parsing input file."))
        }

        reader.onload = async () => {

          console.log(`Recognizing ...`);
          const { data: { result } } = await worker.recognize(reader.result)
          resolve(reader.result)

          console.log(result)
          self.result = result.toString()
          self.error = null

          if (result) {
            // self.result = result.codeResult.code
            self.$emit('found-expiry', self.result)
          } else {
            self.error = "Reading error"
          }

        }

        reader.readAsDataURL(image)

      })
    }
  },
  async mounted() {
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
  },
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
