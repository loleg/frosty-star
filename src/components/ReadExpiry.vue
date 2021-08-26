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
import { createWorker, PSM, OEM } from "tesseract.js"

const worker = createWorker({
  logger: m => {
    console.debug(m)
    window.document.title = Math.round(m.progress * 100) + "%"
  },
})

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
      error: undefined,
    }
  },
  watch: {
    image() {
      if (typeof this.image === 'undefined' || this.image === null) return
      this.error = 'Reading ...'
      let myImg = document.createElement("IMG")
      myImg.width = 640
      myImg.height = 480
      myImg.src = this.image.src
      this.detectPhoto(myImg)
    }
  },
  methods: {
    async detectPhoto(image) {
      const self = this

      console.log(`Recognizing ...`);
      worker
        .recognize(image)
        .then(result => {
          console.log(result.data)
          self.error = null
          self.result = undefined
          if (result.data.confidence > 20 && result.data.lines.length > 0) {
            result.data.lines.forEach(function(l) {
              // Detect date formatting
              if (self.result) return
              let detect = l.text.match(/[0-9]+\.[0-9]+\.[0-9]+/)
              if (detect !== null) {
                const d = detect[0].trim()
                self.result = d
                self.$emit('found-expiry', d)
              }
            })
          } else {
            self.error = "Expiry not readable"
          }
        })
    }
  },
  async mounted() {
    console.log("Initializing worker")
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng', OEM.LSTM_ONLY)
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    })
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
