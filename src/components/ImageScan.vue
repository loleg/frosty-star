<template>
  <div class="scanner">

      <div v-show="!photo.src" class="info top">
        Tap the buttons above to scan a code or upload a photo.
      </div>

      <div v-show="photo.src">

        <h1>Product info</h1>

        <read-barcode :image="photo" @found-barcode="getFoodRepo" />

        <div class="info product">
          <ul v-if="products">
            <li v-for="p in products" :key="p.id">
              <a :href="'https://www.foodrepo.org/ch/products/' + p.id" target="_blank">
                {{ p.name_translations.de }}
              </a>
            </li>
          </ul>
          <div v-if="products && products.length === 0" class="notfound">
            No products found, please try again.
          </div>
        </div>

      </div>
      <div v-show="photo.src" class="py-10">

        <h1>Expiry date</h1>

        <read-expiry :image="photo" />

      </div>
  </div>
</template>

<script>
import ReadBarcode from "./ReadBarcode.vue"
import ReadExpiry from "./ReadExpiry.vue"

import { ref } from 'vue';

export default {
  name: "image-scan",
  props: {
    photo: Object,
  },
  components: {
    ReadBarcode,
    ReadExpiry,
  },
  data() {
    return {
      barcode: undefined,
      products: undefined,
      locale: undefined, // Browser locale
    }
  },
  methods: {
    async getFoodRepo(barcode) {
      const src = "https://www.foodrepo.org/api/v3/products?" +
                  "excludes=images%2Cnutrients&barcodes=" +
                  barcode

      const token = import.meta.env.VITE_FOODREPO_TOKEN
      if (!token) return alert('Missing VITE_FOODREPO_TOKEN')
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
}
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

.info ul, .info li {
  margin: 0px; padding: 0px;
  margin-bottom: 1em;
}
</style>
