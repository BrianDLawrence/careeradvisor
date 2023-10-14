// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "CA: %s",
      htmlAttrs: {
        lang: "en"
      },
      bodyAttrs: {
        class: ["body"]
      },
      meta: [
        { charset: "utf-8" },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: "description",
          content: "Career Advisor.",
        }
      ]
    },
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {// availabe only server side
    openAIKey: process.env.OPENAIKEY,
    mongoURI: process.env.MONGOURI,
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    // Public keys that are exposed to the client
    public: {
      siteUrl: 'https://tbd.com',
    },
  },
})
