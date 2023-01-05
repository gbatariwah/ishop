<template>
  <nuxt-link :to="`/products/${product.id}`" class="relative group rounded-sm w-32 overflow-hidden transition-all">
    <figure>
      <figure :to="`/products/${product.id}`">
        <nuxt-img :lazy-src="$img(product.thumbnail, { width: 10, quality: 70 })" loading="lazy"
                  :src="product.thumbnail" :alt="product.title"
                  class="h-32 w-full object-cover rounded-md hover:scale-105 transition transform"/>
      </figure>
    </figure>
    <div class="p-2 space-y-2">

      <p class="text-lg font-extrabold mb-2"><span class="text-xs pr-1">₵</span>{{ product.price.toFixed(2) }}</p>
      <div class="flex items-center gap-1 text-xs">
        <Icon name="ant-design:star-filled" class="w-4"/>
        <span>{{ product.rating.toFixed(2) }}</span>
      </div>


      <p class="text-sm">{{ product.description.slice(0, 20) }}...</p>
    </div>
  </nuxt-link>
</template>

<script setup>
const props = defineProps({
  product: Object
})

</script>

