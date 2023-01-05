<template>
  <div :style="{'width': width}" class="mb-10">
    <p class="flex justify-between w-[100px]">
      <Icon v-for="star in 5" :key="star"
            :name="star <= Math.floor(rating)? 'ant-design:star-filled' : 'ant-design:star-outlined'"
            class="text-warning"/>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  rating: Number
})

let width = computed(()=> `${Math.round((props.rating/5) * 100)}px`)
console.log(width)
</script>
