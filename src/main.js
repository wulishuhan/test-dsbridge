import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";

import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";
// import mock from "mockjs";
// import style
import "swiper/css/swiper.css";
import "@/permission";
import "@/style/index.scss";
import "@/assets/css/icon.css";
Vue.config.productionTip = false;
Vue.use(ElementUI);
const VueAwesomeSwiper = require("vue-awesome-swiper/dist/ssr");
Vue.use(VueAwesomeSwiper);

// Vue.use(mock);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
