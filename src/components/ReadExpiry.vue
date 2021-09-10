<template>
  <div class="read-expiry text-center">

    <div class="expiry-result">
      <span v-if="expiryState == 1" style="background: #f95e2d;">
        Product is long past expiry
      </span>
      <span v-if="expiryState == 2" style="background: #f2d22b;">
        Expiry has recently passed
      </span>
      <span v-if="expiryState == 3" style="background: #5ecae7;">
        Expires rather soon
      </span>
      <span v-if="expiryState == 4" style="background: #60da5e;">
        Expires in the future
      </span>
    </div>

    <div class="error" v-if="error">
      {{ error }}
    </div>

    <div class="expiry-fields py-5">
      <q-input
        label="Expiry"
        type="text"
        disabled="1"
        placeholder="Ready to scan ..."
        v-if="result"
        v-model="result">
      </q-input>

      <q-date-picker
        class="py-5"
        v-model="expiry"
        type="date" />

      <div
        class="inline-flex ml-3 rounded-md shadow"
        v-if="expiryState > 2">
        <a
          href="javascript:alert('You will receive a notification when this product is about to expire.')"
          class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-indigo-600 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-indigo-500 focus:outline-none"
          >Add to my list</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import moment from 'moment';

import { createWorker, PSM, OEM } from "tesseract.js"

const worker = createWorker({
  logger: m => {
    // console.debug(m)
    window.document.title = Math.round(m.progress * 100) + " %"
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
      expiryState: 0,
      moment: moment,
      // progress: 0,
    }
  },
  watch: {
    image() {
      if (typeof this.image === 'undefined' || this.image === null || !this.image.src) {
        console.log("Image not ready")
        return
      }
      this.error = 'Reading ...'
      let myImg = document.createElement("IMG")
      myImg.width = this.image.width
      myImg.height = this.image.height
      myImg.src = this.image.src
      this.detectPhoto(myImg)
    }
  },
  methods: {
    async detectPhoto(image) {
      const self = this
      this.error = 'Recognizing ...'
      this.expiryState = 0

      worker
        .recognize(image, {
          tessedit_char_whitelist: '0123456789.-/',
          load_system_dawg: 0,
          load_freq_dawg: 0,
          load_punc_dawg: 0,
        })
        .then(result => {
          // console.debug(result.data)
          self.error = null
          let hasResult = false
          if (result.data.confidence > 20 && result.data.lines.length > 0) {
            result.data.lines.forEach(function(l) {
              if (hasResult) return
              // Detect date formatting
              let detect = l.text.match(/[0-9]+[\.\/\-][0-9]+[\.\/\-][0-9]+/)
              if (detect !== null) {
                const d = detect[0].trim().replaceAll('\/','.').replaceAll('-','.')
                console.log("Found", d)
                const m = self.moment(d, "DD.MM.YYYY", false)
                if (!m.isValid()) {
                  // console.log("Expiry date not understood")
                  self.error = "Not understood: " + d
                } else {
                  console.log("Understood", m.format())
                  self.error = null
                  self.expiry = m.toDate()
                  self.result = m.fromNow()
                  // Check date ranges
                  if (m.isAfter(new Date())) {
                    self.expiryState = m.isAfter(self.moment().add(1, 'M')) ? 4 : 3
                  } else {
                    self.expiryState = m.isBefore(self.moment().subtract(1, 'w')) ? 2 : 1
                  }
                  self.$emit('found-expiry', d)
                  hasResult = true
                }
              }
            })
            if (!hasResult) {
              self.error = "Expiry date not found"
            }
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
    // worker.onmessage = ({ data }) => {
    //   this.progress = data.progress;
    // }
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
.expiry-result span {
  display: inline-block;
  border-radius: 1em;
  padding: 1em;
  margin: 1em;
}
</style>
