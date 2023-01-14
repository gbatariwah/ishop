<template>

  <div class="container py-10 px-6 overflow-auto">
    <div class="flex gap-10 w-[1040px] mx-auto">
      <div class="flex gap-2 shrink-0">
        <nuxt-img :src="thumbnail" class="w-[372px] object-cover"
                  :class="product.images.length === 5? 'h-[456px]' : '372px'"/>
        <div class="flex flex-col gap-2 justify-between">
          <nuxt-img v-for="(image, id) in product.images" :key="id" :src="image"
                    class="w-[84px] h-[84px] object-cover cursor-pointer hover:scale-105 transition transform" @click="thumbnail = image"/>
        </div>
      </div>
      <div class="shrink-0 w-1/2">
        <div class="flex justify-between">
          <h1 class="font-bold text-3xl mb-8">{{ product.title }}</h1>


          <button class="btn btn-ghost btn-sm btn-circle"
                  @click="inWishList? removeFromWishList(product.id) : addToWishList(product)">
            <Icon :name="inWishList? 'mdi:cards-heart' : 'mdi:cards-heart-outline'" class="text-4xl"
                  :class="{'text-error': inWishList}"/>
          </button>
        </div>
        <p class="">{{ product.description }}</p>

        <div class="flex items-end gap-4 my-6">
          <p class="font-bold text-lg">GH₵ <span class="text-4xl">{{ discountPrice.toFixed(2) }}</span></p>
          <p class="font-semibold line-through text-error">GH₵ {{ product.price.toFixed(2) }}</p>
          <p>-{{ product.discountPercentage }}%</p>
        </div>

        <Rating :rating="product.rating" />

        <div class="inline-flex items-center gap-10">
          <button class="btn btn-accent-focus gap-2" @click="cart.addToCart(product)">
            <Icon name="mdi:cart-plus"/>
            Add to cart
          </button>

          <p><span class="font-bold text-2xl">{{ product.stock }}</span> left</p>


        </div>
      </div>
    </div>
    <div class="divider"></div>
    <SuggestedProducts />
  </div>

</template>

<script setup>
import {useCart} from "@/stores/cart";
import {useWishList} from "@/stores/wishList";
let route = useRoute()
let inWishList = ref(false)

const product = await $fetch(`https://dummyjson.com/products/${route.params.id}`)

let thumbnail = ref(product.thumbnail)

const cart = useCart()
const wishList = useWishList()

function addToWishList(item) {
  wishList.addToWishList(item)
  inWishList.value = true
}


function removeFromWishList(id) {
  wishList.removeFromWishList(id)

  inWishList.value = false
}

onMounted(() => {
  inWishList.value = !!wishList.items.some(p => p.id === product.id);
})

let discountPrice = computed(() => product.price - ((product.discountPercentage / 100) * product.price))

</script>

