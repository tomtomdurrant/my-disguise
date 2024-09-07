// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  devServer: {
    port: 8000,
  },
  plugins: ["~/plugins/socket.client.ts"],

  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "shadcn-nuxt"],
  colorMode: {
    classSuffix: "",
    preference: "system", // You can set this to 'dark' or 'light' if you prefer
    fallback: "light",
    dataValue: "theme",
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});