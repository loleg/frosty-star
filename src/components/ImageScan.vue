<template>
  <div class="scanner">

      <div v-show="!photo.src" class="info top">
        Use the controls to take a picture of a product with your phone's camera.
        <img src="/snap.jpg">
        The picture should clearly show the <b>barcode</b> and/or
        <b>expiry date</b> of your product.
      </div>

      <div v-show="photo.src">

        <h1>Product</h1>

        <div class="info product">
          <ul v-if="products">
            <li v-for="p in products" :key="p.id">
              <a :href="'https://www.foodrepo.org/ch/products/' + p.id" target="_blank">
                {{ p.name_translations.de }}
              </a>
            </li>
          </ul>
        </div>

        <read-barcode :image="photo"
          @found-barcode="getFoodRepo"
          @search-product="searchFoodRepo" />

          <div v-if="products && products.length === 0" class="notfound mt-4">
           🔍 No products found, try searching.
          </div>

      </div>
      <div v-show="photo.src" class="mt-8">

        <h1>Expiry</h1>

        <read-expiry :image="photo" @save-expiry="saveProductExpiry" />

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
      myList: [],
      barcode: undefined,
      products: undefined,
      locale: undefined, // Browser locale
    }
  },
  mounted() {
    if (localStorage.getItem('myList')) {
      try {
        this.myList = JSON.parse(localStorage.getItem('myList'));
      } catch(e) {
        localStorage.removeItem('myList');
      }
    }
  },
  methods: {
    saveProductExpiry(expiry) {
      const products = this.products
      if (!products || products.length === 0) {
        return alert("Please scan a barcode or search for a product")
      }
      let product = products[0]
      product.expiry = expiry
      this.myList.push(product)
      const parsed = JSON.stringify(this.myList)
      localStorage.setItem('myList', parsed)
      console.log("Product expiry saved")
      this.$router.push({ path: '/' })
    },
    async searchFoodRepo(productname) {
      const self = this
      const query = {
        // "_source": {
        //   "includes": [
        //     "name_translations"
        //   ]
        // },
        "size": 1,
        "query": {
          "query_string": {
            "fields" : [
              // "barcode",
              "name_translations.de"
              // "name_translations.en"
            ],
            "query" : productname
          }
        },
        "sort": "nutrients.sugars.per_hundred"
      }
      const src = "https://www.foodrepo.org/api/v3/products/_search?" +
                  "excludes=images%2Cnutrients"

      const token = import.meta.env.VITE_FOODREPO_TOKEN
      if (!token) return alert('Missing VITE_FOODREPO_TOKEN')
      const headers = new Headers()
      headers.append(
        "Authorization", "Token token=" + token
      )
      const request = new Request(src,
        {
          method: "POST",
          headers,
          body: JSON.stringify(query),
          mode: "cors",
          cache: "default"
        }
      )
      fetch(request)
        .then(async (response) => {
          console.log('Fetching product data ...')
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
          }
          return await response.json()
        })
        .then(async (data) => {
          self.products = []
          // Translate data format
          data.hits.hits.forEach(function(h) {
            self.products.push(h._source)
          })
          // console.log(self.products)
        })
        .catch((error) => {
          console.error(error)
          // this.errorMessage = error
        });
    },
    async getFoodRepo(barcode) {
      const self = this
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

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
          }

          const { data } = await response.json()
          self.products = data
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
.info li::before {
  content: '✔️';
  margin-right: 0.5em;
}
</style>
