<template>
  <div>
    <n-input
        label="Barcode"
        type="text"
        placeholder="Detecting barcode ..."
        :value="result">
          {{ result }}
    </n-input>
    <div class="error">
      {{ error }}
    </div>
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
      result: undefined
    }
  },
  watch: {
    image(newPhoto) {
      this.result = 'Interpreting ...'
      this.detectPhoto(newPhoto.src)
    }
  },
  methods: {
    detectPhoto(photo) {
      let self = this
      console.log(photo)
      let tmpImgURL = photo //URL.createObjectURL(photo)

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
          console.log(result);
          self.result = 'Processing ...'
          if (result) {
            if (result.codeResult != null) {
              self.result = result.codeResult.code
            } else {
              self.error = "Internal error - Not detected"
            }
          } else {
            self.error = "Internal error - Not detected"
          }
        }
      ) // -decodeSingle
    }
  }
})
</script>

<style scoped>
</style>
