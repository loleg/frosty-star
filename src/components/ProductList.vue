<template>
  <div class="flex py-12 px-8 mt-8 lg:flex-shrink-0 lg:mt-0">
    <ul v-if="products && products.length > 0">
      <h1
        class="clear font-extrabold tracking-tight text-gray-900"
        >
        My list
      </h1>
      <li v-for="p in products" :key="p.id">
        <button
          @click="removeItem(p.id)"
          >⭕
        </button>&nbsp;
        <a :href="'https://www.foodrepo.org/ch/products/' + p.id" target="_blank">
          {{ p.name_translations.de }}
        </a>
        expires
        <b>{{ moment(p.expiry).fromNow() }}</b>
      </li>
    </ul>
    <div v-if="!products || products.length === 0" class="notfound">
      Products you have added to your list will appear here.
      Tap <b>Scan product</b> to get started.
    </div>
  </div>
</template>


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
      } catch(e) {
        localStorage.removeItem('myList');
      }
    }
  },
  methods: {
    removeItem(pid) {
      this.products = this.products.filter(
        p => p.id !== pid
      )
    }
  }
}
</script>
