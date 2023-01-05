<template>
  <div class="container mx-auto max-w-5xl p-6">
     <div v-if="cart.items.length">
       <h1 class="text-3xl font-semibold tracking-wide mb-10 mt-4">Your cart ({{ numberOfItems }})</h1>
       <div class="flex justify-between items-center text-base-content">
         <nuxt-link to="/" class="link link-warning link-hover">Continue Shopping</nuxt-link>
         <span>Need help? Call +233123456789</span>
       </div>
       <div class="divider"></div>
       <div class="grid grid-cols-12 gap-4">
         <div class="col-span-8 flex flex-col gap-4">

           <div v-for="item in cart.items" :key="item.id" class="flex justify-between border rounded-md group">
             <div class="flex gap-2 col-span-2">
               <figure class="w-42 h-42 bg-pink-200">
                 <nuxt-img :src="item.thumbnail" class="w-full h-full object-cover rounded-sm"/>
               </figure>
               <div class=" flex flex-col justify-between text-sm py-2">
                 <div>
                   <nuxt-link :to="`/products/${item.id}`" class="font-bold mb-2 block">{{ item.title }}</nuxt-link>
                   <p class="text-info text-xs max-w-64">{{ item.description }}</p>
                   <div class="grid grid-cols-2 mt-4">
                     <p><span class="text-zinc-600 font-thin tracking-wide">Price</span>:
                       <span>₵ {{ item.price.toFixed(2) }}</span></p>
                     <div class="form-control">
                       <label class="input-group">
                         <button class="btn btn-xs btn-square" @click="cart.addToCart(item)">
                           <Icon name="mdi:plus"/>
                         </button>
                         <input v-model="item.qty" type="text" placeholder="10"
                                class="input input-xs input-bordered max-w-8 text-center"/>
                         <button class="btn btn-xs btn-square" @click="cart.reduceQty(item.id)">
                           <Icon name="mdi:minus"/>
                         </button>
                       </label>
                     </div>
                   </div>
                 </div>

                 <p>
                   <span class="cursor-pointer"><Icon name="ant-design:heart-outlined"/></span>
                 </p>
               </div>
             </div>
             <div class="p-2 text-sm">
               <p class="text-right mb-8 invisible transition group-hover:visible">
                 <button class="btn btn-error btn-xs btn-circle btn-outline" @click="cart.removeFromCart(item.id)">✕</button>
               </p>
               <p class="font-semibold">₵ {{ (item.price * item.qty).toFixed(2) }}</p>
             </div>
           </div>
         </div>
         <div class="col-span-4">
           <div class="border rounded-md p-4 text-sm space-y-6">
             <div>
               <h3 class="font-bold mb-4 tracking-wider uppercase">Order Summary</h3>
               <div class="flex flex-col gap-4">
                 <p class="flex justify-between">
                   <span class=" font-thin tracking-wide">Subtotal</span>
                   <span class="font-bold">₵ {{ cart.total.toFixed(2) }}</span>
                 </p>

                 <p class="flex justify-between">
                   <span class="font-thin tracking-wide">Shipping cost</span>
                   <span class="font-bold">₵ 0.00</span>
                 </p>

                 <p class="flex justify-between">
                   <span class="font-thin tracking-wide">Estimated Sales tax</span>
                   <span class="font-bold">₵ 0.00</span>
                 </p>

                 <p class="flex justify-between">
                   <span class="font-thin tracking-wide">Estimated total</span>
                   <span class="font-bold">₵ {{ cart.total.toFixed(2) }}</span>
                 </p>

                 <button class="btn">
                   Checkout
                 </button>
               </div>
             </div>
             <div>
               <h3 class="font-bold mb-4 tracking-wider uppercase">Need help?</h3>
               <div>
                 <p class="link">Shipping</p>
                 <p class="link">Returns & Exchanges</p>
                 <p class="link">Contact Us</p>
               </div>
             </div>
             <div>
               <h3 class="font-bold mb-2 tracking-wider uppercase">Accepted payment methods</h3>
               <div class="grid grid-cols-4 gap-2">
                 <nuxt-img src="/images/payment/visa.png"/>
                 <nuxt-img src="/images/payment/mastercard.png"/>
                 <nuxt-img src="/images/payment/paypal.png"/>
                 <nuxt-img src="/images/payment/bitcoin.png"/>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
    <div v-else class="flex flex-col items-center gap-6 p-10">
      <nuxt-img src="/images/empty-cart.svg" class="max-w-64"/>
       <h2 class="text-2xl font-semibold tracking-wider text-gray-600">Your cart is empty</h2>
      <p class="font-thin">Looks like you haven't added anything to your cart yet.</p>
       <nuxt-link to="/" class="btn gap-2 btn">
         <Icon name="ic:round-home" class="w-6" />
         Go Home
       </nuxt-link>
    </div>
    <div class="divider"></div>
     <SuggestedProducts />
  </div>
</template>

<script setup>
import {useCart} from "@/stores/cart";
import SuggestedProducts from "../../components/suggestedProducts";

const cart = useCart()

let selectedItems = ref([])


let numberOfItems = computed(() => `${cart.items.length} ${cart.items.length === 0 ? 'Item' : 'Items'}`)


let checkAllItems = (e) => {
  let checked = e.target.checked

  if (checked) {
    selectedItems.value = cart.items.map(i => i.id)
  } else {
    selectedItems.value = []
  }

}

let removeSelection = () => {
  if (selectedItems.value.length) {
    selectedItems.value.forEach(i => cart.removeFromCart(i))
  }
}


</script>

