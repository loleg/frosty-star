<template>
  <div class="expiry-result">
    <div class="expiry-message">
      <span class="success" v-if="result && !error">
        Detection complete
      </span>
      <span class="error" v-if="error">
        {{ error }}
      </span>
    </div>

    <div class="expiry-fields py-5">
      <q-input
        label="Expiry"
        type="text"
        placeholder="Ready to scan ..."
        v-if="result"
        v-model="result">
      </q-input>

      <q-date-picker
        class="py-5"
        v-model="expiry"
        type="date" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import moment from 'moment';

import { createWorker, PSM, OEM } from "tesseract.js"

const worker = createWorker({
  logger: m => {
    console.debug(m)
    window.document.title = Math.round(m.progress * 100) + "%"
  },
})

export default {
  name: "read-expiry",
  props: {
    image: Object,
  },
  components: {
  },
  data() {
    return {
      result: undefined,
      error: undefined,
      expiry: new Date(),
      moment: moment,
    }
  },
  watch: {
    image() {
      if (typeof this.image === 'undefined' || this.image === null) {
        console.log("Image not ready")
        return
      }
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
      this.error = 'Recognizing ...'
      worker
        .recognize(image)
        .then(result => {
          console.debug(result.data)
          self.error = null
          let hasResult = false
          if (result.data.confidence > 20 && result.data.lines.length > 0) {
            result.data.lines.forEach(function(l) {
              if (hasResult) return
              // Detect date formatting
              let detect = l.text.match(/[0-9]+\.[0-9]+\.[0-9]+/)
              if (detect !== null) {
                const d = detect[0].trim()
                console.log("Detected text:", d)
                const m = self.moment(d, "DD.MM.YYYY", false)
                if (!m.isValid()) {
                  console.log("Expiry date not understood")
                } else {
                  console.log(m.format())
                  self.error = null
                  self.expiry = m.toDate()
                  self.result = m.fromNow()
                  self.$emit('found-expiry', d)
                  hasResult = true
                }
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
}
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
