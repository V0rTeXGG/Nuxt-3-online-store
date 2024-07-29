// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['@/assets/scss/style.scss'],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/svg-sprite',
  ],
  svgSprite: {
    input: '~/assets/sprite/svg',
    output: '~/assets/sprite/gen',
  },
})
