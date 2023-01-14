<template>

  <div>
    <div style="background-image: url('/images/home/2.jpg')" class="h-md bg-cover">
      <div class=" h-full bg-gray-800 bg-opacity-50 text-base-100 flex justify-center items-center">
        <span class="uppercase font-bold tracking-wider text-6xl">
          {{ $route.params.category.replace('-', ' ') }}
        </span>
      </div>
    </div>
    <div class="container p-6 overflow-auto">
      <div class="grid grid-cols-6">
        <Product v-for="product in products" :key="product.id" :product="product"/>
      </div>
      <div class="divider"></div>
    </div>
  </div>
</template>

<script setup>

const route = useRoute()

// let products = ref([])

const {products} = await $fetch(`https://dummyjson.com/products/category/${route.params.category}`)


</script>
