export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Global CSS
   */
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "@/assets/fonts/font.css"
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ["~/plugins/fontawesome.js", "~/plugins/vee-validate.js"],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ["vee-validate/dist/rules"],
    indicator: {
        name: 'circle',
        color: '#3B8070',
        background: 'white'
    },
    extend(config, ctx) {}
},
server: {
  port: 3500,
  // host: "192.168.43.46"
},
  env: {
    BASE_URL: "http://taxapi.cpay.ir/api/app/",
    TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTA5M2JmZTUxM2YyMDAxOGQ2NGRkMyIsInVzZXJuYW1lIjoiamF2YW5tYXJkaSIsImFwcCI6eyJhcHBJZCI6IjVlMjQ0YTQ4ZDI2YWJiZmZlYzBhY2Q3ZCIsImFwcE5hbWUiOiJDcGF5IFRheCIsIm9yZyI6eyJvcmdJZCI6IjVlOWQ0MjE4NDk1YTVhMDAxODM2YmFlZSIsInJvbGVzIjpbeyJyb2xlSWQiOiI1ZWUwYTNlZmU1MTNmMjAwMThkNjRkZTgiLCJyb2xlTmFtZSI6Itiq2LPYqiDZhtix2YUg2KfZgdiy2KfYsSIsIl9pZCI6IjVlZTBhNGUzZTUxM2YyMDAxOGQ2NGRmNiJ9XX19LCJpYXQiOjE1OTM1OTEzNjUsImV4cCI6MTU5NjE4MzM2NX0.laO7bDeg9gnnxV0PFYankh00KWhhMEN55U5-usiVbQc"
  }
};
