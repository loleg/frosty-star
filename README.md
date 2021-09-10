# Frosty Star

This is a prototype application for smartphones, intended to help read the use-by date / expiry date on consumer products, and additionally identify the product by barcode to obtain data.

The user scans a product with the smartphone camera, then confirms if the date and type of product has been correctly identified. We will in later stages be able to build notifications and other interfaces on top of this.

# Developer overview

This project requires installing a recent version of Node.js (14+) and the [Yarn package manager](https://yarnpkg.com).

![Vite, Vue, Tailwind CSS](https://user-images.githubusercontent.com/11320080/111277027-a9384c00-8640-11eb-8323-21889bd7c609.png)

## Project setup
```
yarn install
```

### Start development server and open browser
```
yarn dev
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

## Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

This package also includes:

- [Vue Router 4.x](https://github.com/vuejs/vue-router-next)
- [Inter var font](https://github.com/rsms/inter) (self-hosted, woff2, v3.19, with 'preload' attr, check out index.html)
- [Just-in-Time](https://tailwindcss.com/docs/just-in-time-mode) mode by default introduced in Tailwind CSS v2.1 (in preview!)
- [Headless UI](https://headlessui.dev/vue/menu) - unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS
- [Heroicons](https://github.com/tailwindlabs/heroicons#vue) - beautiful hand-crafted SVG icons,
by the makers of Tailwind CSS

First-party plugins for Tailwind UI:

- [tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)
- [tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)
- [tailwindcss/line-clamp](https://github.com/tailwindlabs/tailwindcss-line-clamp)
- [tailwindcss/aspect-ratio](https://github.com/tailwindlabs/tailwindcss-aspect-ratio)

#### Further documentation

Links to resources to understand current and potential software architecture:

## User interface

- https://vuejs.org/
- https://iconify.design/
- https://www.naiveui.com/

## Device access

- https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture
- https://github.com/pierresaid/vue-pwa-camera
- https://vue-native.io/

## Computer vision

- https://github.com/serratus/quaggaJS
- https://www.dynamsoft.com/store/dynamsoft-barcode-reader/
- https://tesseract.projectnaptha.com/

## Data sources

- https://www.foodrepo.org/api-docs/swaggers/v3

## Frontend features

- [Enabling https on localhost](https://github.com/web2033/vite-vue3-tailwind-starter/discussions/112) (dev notes)
- [Vite dev server with netlify dev support](https://github.com/web2033/vite-vue3-tailwind-starter/discussions/113) (dev notes)
- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) - recommended (instead of Vetur) VSCode extension built specifically for Vue 3
- [Pinia](https://pinia.esm.dev/introduction.html) - state-management alternative to Vuex 4 with a similar to upcoming Vuex 5 API
- [VueUse](https://vueuse.org/functions.html) - collection of essential Vue Composition Utilities
