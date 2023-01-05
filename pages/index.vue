<template>
  <div>
<!--    <div v-if="pending">Loading</div>-->
    <div>
      <Carousel :autoplay="10000" :wrap-around="true">
        <Slide v-for="slide in 5" :key="slide">
          <div class="w-full">
            <nuxt-img :src="`/images/home/${slide}.jpg`" class="h-120 w-full object-cover"/>
          </div>
        </Slide>

        <template #addons>
          <Pagination/>
        </template>
      </Carousel>
      <div class="container p-6 overflow-auto">
        <div class="flex gap-4 w-[1040px] mx-auto mt-6 mb-0">
          <div class="w-[250px] shrink-0 border p-2 space-y-4">
              <h2 class="flex items-center gap-2 my-4 font-semibold text-lg">
                <Icon name="ant-design:control-outlined" class="w-6" />
                Filters
              </h2>
            <div>
              <p class="font-semibold mb-2">Category</p>
              <select class="select select-sm select-ghost w-full max-w-xs rounded-sm">
                <option disabled selected>Select category</option>
                <option v-for="category in categories" :value="category">{{category}}</option>

              </select>
            </div>

            <div>
              <p class="font-semibold mb-2">Price</p>
              <input type="range" min="0" max="100" value="40" class="range" />
            </div>
          </div>
          <div class="w-[790px] shrink-0">
            <div class="flex flex-wrap gap-6">
              <Product v-for="product in data.products" :product="product" :key="product.id"/>
            </div>
            <div class="divider"></div>

            <div class="flex justify-end font-semibold items-center gap-4">
              <div class="flex gap-4 items-center">
                <span>number of pages</span>
                <select @change="setPage" v-model="page" class="select select-bordered select-sm w-18 rounded-sm">
                  <option v-for="page in (Math.floor(data.total / limit))" :value="page">{{ page }}</option>
                </select>
                <span>/ {{Math.floor(data.total / limit)}}</span>

              </div>
              <div class="space-x-2">
                <button class="btn btn-sm btn-square rounded-sm" @click="paginate('prev')" :disabled="page === 1">
                  <Icon name="ant-design:left-outlined"/>
                </button>
                <button class="btn btn-sm btn-square rounded-sm" @click="(paginate)" :disabled="data.products.length  < limit">
                  <Icon name="ant-design:right-outlined"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Carousel, Pagination, Slide} from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'


const route = useRoute()

let page = ref(route.query.page || 1)
let limit = ref(route.query.limit || 15)
let skip = ref(route.query.skip || 0)


const {
  data,
  pending,
  refresh
} = await useAsyncData(() => $fetch(`https://dummyjson.com/products?limit=${limit.value}&skip=${skip.value}`), {watch: [skip]})

const categories = await $fetch('https://dummyjson.com/products/categories')

const router = useRouter()

let paginate = (direction = 'next') => {
  if (direction === 'prev') {
    page.value = page.value === 1 ? 1 : page.value - 1

    skip.value = page.value === 1 ? 0 : page.value * limit.value
  }  else {
    page.value++
    skip.value = page.value * limit.value
  }


  router.push(`?page=${page.value}&limit=${limit.value}&skip=${skip.value}`)

  refresh()

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}


let setPage = (e) => {
  page.value = Number(e.target.value)
  skip.value = page.value === 1? 0 : (page.value - 1) * limit.value

  router.push(`?page=${page.value}&limit=${limit.value}&skip=${skip.value}`)

  refresh()
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}


</script>
