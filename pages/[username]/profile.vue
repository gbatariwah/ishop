<template>
  <div class="p-6">
    <div class="h-md">
      <nuxt-img :src="`/images/profile/c${randomId}.jpg`" class="h-full w-full object-cover"/>

    </div>
    <div class="flex gap-6 mb-10">
      <div class="avatar -mt-18 ml-16">
        <div class="w-48 rounded-full bg-neutral ring-4 ring-base-100">
          <nuxt-img :src="user.image"/>
        </div>
      </div>
      <div>
        <p class="text-2xl font-bold traking-wider py-2">{{ user.firstName }} {{ user.lastName }}</p>
        <p>{{ user.email }}</p>
        <p>{{ user.phone }}</p>
      </div>
    </div>

    <div class="tabs">
      <a class="tab tab-lifted tab-lg gap-2 text-lg font-semibold tracking-wider" @click="setActiveTab('about')"
         :class="{'tab-active': activeTab === 'about'}">
        <Icon name="mdi:account-box-outline"/>
        About
      </a>
      <a class="tab tab-lg tab-lifted gap-2 text-lg font-semibold tracking-wider" @click="setActiveTab('wish-list')"
         :class="{'tab-active': activeTab === 'wish-list'}">
        <Icon name="mdi:cards-heart"/>
        Wish list
      </a>
    </div>

    <div class="mt-4">
      <div class="" v-show="activeTab === 'about'">
        <section class="p-6">
          <form novalidate="" action=""
                class="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
            <fieldset class="grid grid-cols-4 gap-6 p-6 rounded-md">
              <div class="space-y-2 col-span-full lg:col-span-1">
                <p class="font-medium">Personal Inormation</p>
              </div>
              <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div class="col-span-full sm:col-span-3">
                  <label for="firstname" class="label font-thin">First Name</label>
                  <input disabled v-model="user.firstName" id="firstname" type="text"
                         class="w-full input input-bordered">
                </div>
                <div class="col-span-full sm:col-span-3">
                  <label for="lastname" class="label font-thin">Last Name</label>
                  <input disabled v-model="user.lastName" id="lastname" type="text"
                         class="w-full input input-bordered">
                </div>
                <div class="col-span-full sm:col-span-3">
                  <label for="email" class="label font-thin">Email</label>
                  <input disabled v-model="user.email" id="email" type="text"
                         class="w-full input input-bordered">
                </div>
                <div class="col-span-full">
                  <label for="address" class="label font-thin">Address</label>
                  <input disabled v-model="user.address.address" id="address" type="text"
                         class="w-full input input-bordered">
                </div>
                <div class="col-span-full sm:col-span-2">
                  <label for="city" class="label font-thin">City</label>
                  <input disabled v-model="user.address.city" id="city" type="text"
                         class="w-full input input-bordered">
                </div>
                <div class="col-span-full sm:col-span-2">
                  <label for="state" class="label font-thin">State / Province</label>
                  <input disabled v-model="user.address.state" id="state" type="text"
                         class="w-full input input-bordered">
                </div>
                <div class="col-span-full sm:col-span-2">

                  <label for="postalCode" class="label font-thin">ZIP / Postal</label>
                  <input disabled v-model="user.address.postalCode" id="postalCode" type="text"
                         class="w-full input input-bordered">
                </div>
              </div>
            </fieldset>
            <fieldset class="grid grid-cols-4 gap-6 p-6 rounded-md">
              <div class="space-y-2 col-span-full lg:col-span-1">
                <p class="font-medium">Profile</p>
              </div>
              <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div class="col-span-full sm:col-span-3">
                  <label for="username" class="label font-thin">Username</label>
                  <input disabled v-model="user.username" id="username" type="text"
                         class="w-full input input-bordered">
                </div>
                <div class="col-span-full sm:col-span-3">

                  <label for="website" class="label font-thin">Website</label>
                  <input disabled id="website" type="text"
                         class="w-full input input-bordered">
                </div>
                <div class="col-span-full">
                  <label for="bio" class="text-sm">Bio</label>
                  <textarea id="bio"
                            class="w-full textarea textarea-bordered" disabled></textarea>
                </div>
              </div>
            </fieldset>
          </form>
        </section>
      </div>
      <div v-show="activeTab === 'wish-list'">
        <div class="flex flex-col gap-4">
          <div v-for="item in wishList.items" :key="item.id" class="flex justify-between border rounded-md group">
            <div class="flex gap-2 col-span-2">
              <figure class="w-42 h-42 bg-pink-200">
                <nuxt-img :src="item.thumbnail" class="w-full h-full object-cover rounded-sm"/>
              </figure>
              <div class=" flex flex-col justify-between text-sm py-2">
                <div>
                  <nuxt-link :to="`/products/${item.id}`" class="font-bold mb-2 block">{{ item.title }}</nuxt-link>
                  <p class="text-info text-xs">{{ item.description }}</p>
                </div>
                <div class="grid grid-cols-2 mt-4 w-64">
                  <p><span class="text-zinc-600 font-thin tracking-wide">Price</span>:
                    <span>₵ {{ item.price.toFixed(2) }}</span></p>
                  <p><span class="text-zinc-600 font-thin tracking-wide">Stock</span>:
                    <span>{{ item.stock }}</span></p>
                </div>
              </div>
            </div>
            <div class="p-2 text-sm">
              <p class="text-right mb-8 invisible transition group-hover:visible">
                <button class="btn btn-error btn-xs btn-circle btn-outline" @click="wishList.removeFromWishList(item.id)">✕
                </button>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script setup>
import {useWishList} from "../../stores/wishList";

const randomId = ref(Math.floor(Math.random() * 4))

const activeTab = ref('about')

const setActiveTab = (tab) => activeTab.value = tab

const {
  data,
} = useSession()


const user = await $fetch(`https://dummyjson.com/users/${data.value.user.id}`)

const wishList = useWishList()


</script>