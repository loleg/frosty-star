<template>
  <div class="flex py-4 px-8 lg:flex-shrink-0 lg:mt-0">
    <ul v-if="products && products.length > 0">
      <h1
        class="clear font-extrabold tracking-tight"
        >
        My products
      </h1>
      <li v-for="p in products"
        :class="p.is_latest ? 'highlight' : ''"
        :key="p.id">
        <button style="float:right"
          @click="removeItem(p.id)"
          >🗑️
        </button>
        <a :href="'https://www.foodrepo.org/ch/products/' + p.id" target="_blank">
          {{ p.name_translations.de }}
        </a>
        <div>
          expires
          <b>{{ moment(p.expiry).fromNow() }}</b>
        </div>
      </li>
    </ul>
    <div v-if="!products || products.length === 0" class="notfound">
      Products you have added to your list will appear here.
      Tap <b>Scan product</b> to get started.
    </div>
  </div>
</template>

<style scoped>
li {
  margin-top: 1em;
  font-size: 125%;
  margin-left: 2em;
}
li::before {
  content: '⭕';
  margin-left: -2em;
  padding-right: 0.8em;
}
.highlight {
  background-color: lightyellow;
}
</style>

<script>
import moment from 'moment';

export default {
  components: {
  },
  data() {
    return {
      products: [],
      moment: moment,
    }
  },
  mounted() {
    if (localStorage.getItem('myList')) {
      try {
        this.products = JSON.parse(localStorage.getItem('myList'));
        // console.log(this.products.length)
        this.products[this.products.length-1].is_latest = true
        this.products.sort(function(a, b) {
          return moment(a.expiry) - moment(b.expiry)
        })
      } catch(e) {
        localStorage.removeItem('myList');
      }
    }
  },
  methods: {
    removeItem(pid) {
      if (!window.confirm('Remove this product?')) { return }
      this.products = this.products.filter(
        p => p.id !== pid
      )
    }
  }
}
</script>
