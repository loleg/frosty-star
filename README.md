# Frosty Star

This is a prototype application for smartphones, intended to help read the use-by date / expiry date on consumer products, and additionally identify the product by barcode to obtain data.

The user scans a product with the smartphone camera, then confirms if the date and type of product has been correctly identified. We will in later stages be able to build notifications and other interfaces on top of this.

# Project overview

The main libraries we are putting to use here are Vue, Quagga and TensorFlow, as follows:

## User interface

- https://vuejs.org/
- https://iconify.design/
- https://www.naiveui.com/

## Device access

- https://vue-native.io/
- https://github.com/pierresaid/vue-pwa-camera
- https://developer.mozilla.org/en-US/docs/Web/API/ImageCapture

## Computer vision

- https://github.com/serratus/quaggaJS
- https://www.dynamsoft.com/store/dynamsoft-barcode-reader/
- https://tesseract.projectnaptha.com/

## Data sources

- https://www.foodrepo.org/api-docs/swaggers/v3

# Developer instructions

This project requires installing a recent version of Node.js (14+) and the [Yarn package manager](https://yarnpkg.com).

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
