<template>
  <div class="navbar bg-dark-900 text-gray-300 px-6 h-24 relative">
    <div class="navbar-start">
      <nuxt-link to="/" class="cursor-pointer normal-case text-xl">
        <nuxt-img src="/images/logo.svg"/>
      </nuxt-link>
    </div>
    <div class="navbar-center hidden lg:flex">
       <ul class="flex gap-8 ">
         <li>
           <nuxt-link class="font-semibold tracking-wider font-sm uppercase transition hover:text-info" to="/">Home</nuxt-link>
         </li>
         <li class="group">
           <p @click="toggleDropdownMenu" class="cursor-pointer font-semibold tracking-wider font-sm uppercase transition hover:text-info">Products</p>
             <div v-show="showDropdownMenu">
               <div @click="toggleDropdownMenu" class="absolute w-screen h-screen left-0  top-0">
               </div>


               <div  class="bg-dark-900 text-gray-300 absolute top-24 w-full min-h-64 left-0 py-6 px-6">
                 <div class="grid grid-cols-4 gap-y-9 gap-x-6">
                   <template v-for="(category, id) in categories" v-bind:key="id">
                     <div   @click="setActiveTab(category.name)" class="hover:text-info cursor-pointer transition duration-500" :class="{'text-info': category.name === activeTab}">
                       <p class="flex gap-2">
                         <Icon :name="category.icon" />
                         <span class="capitalize text-lg font-semibold tracking-wider hover:text-info">{{ category.name.replace('-', ' ') }}</span>
                       </p>
                     </div>
                   </template>
                 </div>

                 <div class="divider"></div>
                  <template v-for="aTab in categories" :key="aTab.name" >
                    <div  v-if="activeTab === aTab.name" class="flex gap-10">
                       <div v-for="product in response.products" :key="product.id" class="w-18 rounded-md overflow-hidden">
                          <nuxt-img :src="product.thumbnail" class="w-full h-18 object-cover" />
                           <p class="text-sm mt-2 font-thin">{{product.title}}</p>
                       </div>
                       <div v-if="response.products.length" class="flex justify-center items-center">
                         <nuxt-link :to="`/products/category/${aTab.name}`" @click="toggleDropdownMenu" class="btn btn-ghost btn-circle">
                           <Icon name="ic:round-arrow-circle-right"/>
                         </nuxt-link>
                       </div>
                    </div>
                  </template>



               </div>
             </div>
         </li>
         <li>
           <nuxt-link class="font-semibold tracking-wider font-sm uppercase transition hover:text-info" to="/about">About</nuxt-link>
         </li>
       </ul>
    </div>
    <div class="navbar-end space-x-4 ">
      <nuxt-link :to="`/${user.username}/cart`">
        <div class="indicator">
          <span class="indicator-item badge badge-primary badge-sm">{{ numberOfItems }}</span>
          <button class="btn btn-ghost btn-circle">
            <Icon  name="ant-design:shopping-cart-outlined" class="w-6" />
          </button>
        </div>
      </nuxt-link>
      <div class="dropdown dropdown-end" v-if="status === 'authenticated'">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img :src="user.image" />
          </div>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-dark-900 rounded-box w-52">
          <li>
            <nuxt-link :to="`/${user.username}/profile`" class="flex gap-2">
              <Icon name="mdi:account"/> <span class="font-semibold tracking-wider">Profile</span>
            </nuxt-link>
          </li>
          <li><a  @click="signOut" class="flex gap-2">
            <Icon name="ic:twotone-logout"/>
            <span class="font-semibold tracking-wider">Logout</span>
          </a></li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script setup>
import {useCart} from "@/stores/cart";

const {
  status,
  data,
  signOut,
} = useSession()

const cart = useCart()
let activeTab = ref('smartphones')
const categories = [
  {name: "smartphones", icon: "ic:outline-phone-android"},
  {name: "laptops", icon: "ic:baseline-laptop"},
  {name: "fragrance", icon: "mdi:lotion"},
  {name: "skincare", icon: "mdi:face-man-shimmer"},
  {name:"groceries", icon: "mdi:food"},
  {name:"home-decoration", icon: "mdi:flower"},
  {name:"furniture", icon: "mdi:bed-king"},
  {name:"tops", icon: "mdi:tshirt-crew"},
  {name:"womens-dresses", icon: "mdi:lingerie"},
  {name:"womens-shoes", icon: "mdi:shoe-heel"},
  {name:"mens-shirts", icon: "mdi:tshirt-crew-outline"},
  {name:"mens-shoes", icon: "mdi:shoe-formal"},
  {name:"mens-watches", icon: "mdi:watch-variant"},
  {name:"womens-watches", icon: "mdi:watch"},
  {name:"womens-bags", icon: "mdi:basket"},
  {name:"womens-jewellery", icon: "mdi:necklace"},
  {name:"sunglasses", icon: "mdi:glasses"},
  {name:"automotive", icon: "mdi:car"},
  {name:"motocycle", icon: "mdi:motorbike"},
  {name:"lighting", icon: "mdi:lightbulb"},
]

const showDropdownMenu = ref(false)

const toggleDropdownMenu = () => showDropdownMenu.value = !showDropdownMenu.value

const {
  data: response,
  pending,
  refresh
} = await useAsyncData(() => $fetch(`https://dummyjson.com/products/category/${activeTab.value}`), {watch: [activeTab.value]})

const setActiveTab = (name) => {
  activeTab.value = name
  refresh()
}

const user = computed(()=> data?.value?.user)
const numberOfItems = computed(() => cart.items.length)

</script>