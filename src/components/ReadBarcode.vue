<template>
  <div class="barcode-result">
    <span class="success" v-if="result && !error">
      Code scan success
    </span>
    <span class="error" v-if="error">
      {{ error }}
    </span>
    <n-input
        label="Barcode"
        type="text"
        placeholder="Ready to detect barcode ..."
        :value="result">
          {{ result }}
    </n-input>
  </div>
</template>

<script>
import Quagga from "quagga"

import { defineComponent } from 'vue'
import { NInput } from 'naive-ui'

export default defineComponent({
  name: "read-barcode",
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
    detectPhoto(photo) {
      let self = this
      let tmpImgURL = photo
      //URL.createObjectURL(photo)

      Quagga.decodeSingle(
        {
          src: tmpImgURL,
          numOfWorkers: 2, // Needs to be 0 when used within node
          locate: true,
          inputStream: {
            size: 800 // restrict input-size to be 800px in width (long-side)
          },
          decoder: {
            readers: [
              "code_128_reader",
              "ean_reader",
              "ean_8_reader",
              "code_39_reader",
              "code_39_vin_reader",
              "codabar_reader",
              "upc_reader",
              "upc_e_reader",
              "i2of5_reader"
            ]
          }
        },
        function (result) {
          // console.log(result);
          // self.result = ''
          self.error = null
          if (result) {
            if (result.codeResult != null) {
              self.result = result.codeResult.code
              self.$emit('found-barcode', self.result)
            } else {
              self.error = "Not detected"
            }
          } else {
            self.error = "Code not detected"
          }
        }
      ) // -decodeSingle
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
