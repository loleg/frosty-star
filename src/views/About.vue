<script setup>
import ButtonRepo from '@/components/ButtonRepo.vue'
</script>

<template>
  <div class="bg-gray-50">
    <div
      class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
    >
      <h2
        class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        About Page
        <br />
        <span class="text-indigo-600">Technical background</span>
      </h2>

      <p>1. Research and integration of native API services to access and process camera data in real time, for processing with on-device Computer Vision libraries.</p>

      <ul><li>
        <a href="https://serratus.github.io/quaggaJS/">
          Quagga
        </a>
      </li></ul>

      <p>2. Extraction of matched product data and extrapolation of expiry date.</p>

      <ul>
        <li>http://www.barcodelive.org/</li>
        <li>https://www.barcodefaq.com/1d/gs1-databar/gs1-composite/</li>
        <li>http://product-open-data.com/</li>
      </ul>

      <p>3. Dataset of sample product barcodes and expiry dates</p>

      <ul>
        <li>https://web.tresorit.com/l/ckd5n#epMa1rLNu5dksf8I34IjYw</li>
        <li>https://www.kaggle.com/whoosis/barcode-detection-annotated-dataset</li>
      </ul>

      <p>Further reading on machine learning-based approach to character recognition, with recommendation of a process for training and export of custom models.</p>

      <ul>
        <li>
              A Novel Camera Based Approach for Automatic Expiry Date Detection and Recognition on Food Packages
              https://doi.org/10.1007/978-3-319-92007-8_12
                  Gong, Liyun, Yu, Miao, Duan, Wenting et al (2018)
        </li><li>
              Recognition of Expiration Dates Written on Food Packages with Open Source OCR
              https://www.semanticscholar.org/paper/Recognition-of-Expiration-Dates-Written-on-Food-OCR-Hosozawa-Wijaya/c761d85e2e5e0d3fd2abb18c4845174e26d038c7
                  Kento Hosozawa, R. Wijaya et al (2018)
                </li><li>
              Expiry-Date Recognition System Using Combination of Deep Neural Networks for Visually Impaired
              https://link.springer.com/chapter/10.1007/978-3-030-58796-3_58
            </li><li>
              Applications of Artificial Intelligence in Supply Chain Management and Logistics: Focusing Onto Recognition for Supply Chain Execution
              https://link.springer.com/chapter/10.1007/978-3-030-06234-7_27
            </li><li>
              Enhancing Pharmaceutical Packaging through a Technology Ecosystem to Facilitate the Reuse of Medicines and Reduce Medicinal Waste
              https://www.mdpi.com/2226-4787/8/2/58
            </li>
      </ul>


      <div class="flex mt-8 lg:flex-shrink-0 lg:mt-0">
        <div class="inline-flex rounded-md shadow">
          <router-link
            to="/"
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none"
            >Back Home</router-link
          >
        </div>
        <ButtonRepo />
      </div>
    </div>
  </div>
</template>
