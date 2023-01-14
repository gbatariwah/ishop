<template>
  <section class="py-6 dark:bg-gray-800 dark:text-gray-100">
    <div class="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
      <figure class="text-center">
        <nuxt-img src="/images/logo.svg" class="min-w-xs"/>
      </figure>
      <div class="max-w-2xl space-y-4">
        <p>Welcome to our online shop!</p>

        <p> We are a team of passionate and dedicated individuals who are committed to bringing you the best selection
          of
          high-quality products at affordable prices. We understand that shopping online can be overwhelming at times,
          which is why we strive to make the process as seamless and enjoyable as possible.
        </p>
        <p> Our selection of products includes everything from clothing and accessories to home goods and electronics.
          We
          are constantly updating our inventory to ensure that we have the latest and greatest products on the market.
        </p>
        <p> We take pride in our customer service and strive to provide a personalized shopping experience for each and
          every one of our customers. If you have any questions or need assistance with your order, our team is always
          here to help.
        </p>
        <p> Thank you for choosing our online shop. We hope you have a wonderful shopping experience and find everything
          you are looking for.
        </p>
      </div>
       <div>
         <h2 class="text-2xl font-bold leading-none text-center sm:text-5xl pt-6">Our team</h2>

         <div class="flex flex-row flex-wrap-reverse justify-center">
           <div class="flex flex-col justify-center m-8 text-center" v-for="member in team" :key="member.id">
             <img alt="" class="self-center flex-shrink-0 w-28 h-28 ring-3 ring-base-300 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
                  :src="member.avatar">
             <p class="text-xl font-semibold leading-tight">{{ member.firstName }} {{ member.lastName }}</p>
             <p class="dark:text-gray-400 font-thin">{{ member.jobTitle }}</p>
           </div>

         </div>
       </div>



    </div>
    <div style="background-image: url('/images/contact-us.jpg')" class="h-md w-full bg-cover">
      <p class="p-10 text-6xl font-bold tracking-wider text-gray-500">Contact Us</p>
    </div>
    <div class="p-6 space-y-2">

      <p><span class="font-semi-bold">Email:</span> {{contact.email}}</p>
      <p><span class="font-semi-bold">Phone Number:</span> {{contact.number}}</p>

    </div>

    <iframe
        class="min-h-md w-full"
        width="300"
        height="170"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://maps.google.com/maps?q=9.4062055,-0.8427655&hl=es&z=14&amp;output=embed"
    >
    </iframe>
  </section>
</template>

<script setup>

import {faker} from '@faker-js/faker';

const team = ref([])
const contact = ref({email: faker.internet.email(), number: faker.phone.number('+233 91 ### ## ##')})

// let {users:team} = await $fetch('https://dummyjson.com/users?limit=5')
// console.log(team)

onMounted(() => {

  for (let i = 0; i < 5; i++) {
    team.value.push({
      id: faker.datatype.uuid(),
      avatar: faker.image.avatar(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      jobTitle: faker.name.jobTitle()
    })
  }

  console.log(team.value)
})

</script>

