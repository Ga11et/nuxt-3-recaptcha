import { defineNuxtPlugin, useHead, useRuntimeConfig } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.recaptcha

  useHead({
    script: [
      {
        key: 'google-recaptcha',
        src: `https://www.google.com/recaptcha/api.js?hl=${config.lang}`,
        async: true,
        defer: true,
      },
    ],
  })
})
