export default defineNuxtConfig({
  modules: ['../src/module'],
  recaptcha: {
    secretKey: '6LcFw54pAAAAAKpC7FbRU0tGgf3SHcsf0uBVr313',
    siteKey: '6LcFw54pAAAAAB7pDZtAe9KDr5TO2aXHFfuh40UB',
  },
  devtools: { enabled: true },
})
