<template>
  <div>
    <h3 class="text-2xl text-center text-slate-500 tracking-wider font-bold mb-10">You may also like</h3>
    <div class="grid grid-cols-5">
      <Product v-for="product in randomProducts.products" :product="product" :key="product.id"/>
    </div>
  </div>
</template>

<script setup>
let randomSkip = ref(Math.floor(Math.random() * 95))

let {data: randomProducts} = await useAsyncData(() => $fetch(`https://dummyjson.com/products?limit=${5}&skip=${randomSkip.value}`))

</script>
