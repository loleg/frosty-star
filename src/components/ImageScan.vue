<template>
  <div class="scanner">
    <n-space vertical>

      <div v-if="!photo" class="info top">
        Tap the button above to scan a code.
      </div>

      <read-barcode :image="photo" @found-barcode="getFoodRepo" />

      <div class="info product">
        Product data:
        <ul v-if="products">
          <li v-for="p in products" :key="p.id">
            {{ p.name_translations.de }}</li>
        </ul>
        <div v-if="products && products.length === 0" class="notfound">
          No products found, please try again.
        </div>
      </div>

      <div class="info expiry">
        Expiry date:
      </div>

      <n-date-picker
        v-model:value="expiry"
        type="date" />

      <read-expiry :image="photo" />

    </n-space>
  </div>
</template>

<script>
import ReadBarcode from "./ReadBarcode.vue"
import ReadExpiry from "./ReadExpiry.vue"

import { defineComponent } from 'vue'
import { NDatePicker, NSpace } from 'naive-ui'

export default defineComponent({
  name: "image-scan",
  props: {
    photo: Object,
  },
  components: {
    ReadBarcode,
    ReadExpiry,
    NDatePicker,
    NSpace,
  },
  data() {
    return {
      expiry: + new Date(),
      barcode: undefined,
      products: undefined,
      locale: undefined // Browser locale
    }
  },
  methods: {
    async getFoodRepo(barcode) {
      const src = "https://www.foodrepo.org/api/v3/products?" +
                  "excludes=images%2Cnutrients&barcodes=" +
                  barcode
      const token = process.env.VUE_APP_FOODREPO_TOKEN
      if (!token) return alert('Missing VUE_APP_FOODREPO_TOKEN')
      const headers = new Headers()
      headers.append(
        "Authorization", "Token token=" + token
      )
      const request = new Request(src,
        {
          method: "GET",
          headers,
          mode: "cors",
          cache: "default"
        }
      )
      fetch(request)
        .then(async (response) => {
          console.log('Fetching product data ...')
          const { data } = await response.json()
          this.products = data

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
          }

        })
        .catch((error) => {
          console.error(error)
          // this.errorMessage = error
        });
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
