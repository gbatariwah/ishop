// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        'nuxt-windicss',
        '@formkit/nuxt',
        '@sidebase/nuxt-auth',
        '@nuxt/image-edge',
        'nuxt-icon',
        '@pinia/nuxt'
    ],
    runtimeConfig: {
        // The private keys which are only available server-side
        NUXT_SECRET: process.env.NUXT_SECRET,
        // Default http://localhost:1337/api
        STRAPI_BASE_URL: process.env.STRAPI_BASE_URL,
    },
    auth: {
        origin: process.env.ORIGIN,
        basePath: "/api/auth",
        enableGlobalAppMiddleware: true
    },
})
