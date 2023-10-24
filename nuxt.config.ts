// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "Resume ATS: %s",
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
          content: "Resume ATS Advisor.",
        }
      ]
    },
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-gtag', '@nuxtjs/robots', 'nuxt-simple-sitemap'
  ],
  gtag: {
    id: 'G-8TVWBV7GYQ',
    initialConsent: false
  },
  runtimeConfig: {// availabe only server side
    openAIKey: process.env.OPENAIKEY,
    mongoURI: process.env.MONGOURI,
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    // Public keys that are exposed to the client
    public: {
      siteUrl: 'https://resume-ats.com',
    },
  },
  site: {
    url: 'https://resume-ats.com',
  },
})
