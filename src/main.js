import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'

import Qui from '@qvant/qui-max';
import '@qvant/qui-max/styles';

const app = createApp(App)

app.use(Qui);

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.mount('#app')
