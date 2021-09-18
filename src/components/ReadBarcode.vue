<template>
  <div class="barcode-result">
    <div class="barcode-fields">
      <div class="barcode-message mb-5 text-center">
        <div class="success" v-if="result && complete">
          Code scan complete
        </div>
        <div class="error" v-if="error">
          {{ error }}
        </div>
      </div>

      <q-input
        label="Barcode"
        type="text"
        icon="search"
        placeholder="Search for product ..."
        v-on:keyup.enter="onEnter"
        v-model="result">
      </q-input>
    </div>
  </div>
</template>

<script>
import Quagga from "quagga"
import { ref } from 'vue';

export default {
  name: "read-barcode",
  props: {
    image: Object,
  },
  components: {
  },
  data() {
    return {
      complete: false,
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
    onEnter() {
      this.complete = false
      this.$emit('search-product', this.result)
    },
    detectPhoto(photo) {
      let self = this
      let tmpImgURL = photo
      //URL.createObjectURL(photo)
      self.complete = false

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
              self.complete = true
              self.result = result.codeResult.code
              self.$emit('found-barcode', self.result)
            } else {
              self.error = "Not detected"
            }
          } else {
            self.error = "Product code not seen"
          }
        }
      ) // -decodeSingle
    }
  }
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
