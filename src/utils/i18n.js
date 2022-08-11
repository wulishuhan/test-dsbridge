import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

// 以下为语言包单独设置的场景，单独设置时语言包需单独引入
const messages = {
  zh: require("../assets/i18n/zh"), // 中文语言包
  en: require("../assets/i18n/en"), // 英文语言包
};
const dateTimeFormats = {
  en: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    },
  },
  zh: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    },
  },
};
// 最后 export default，这一步肯定要写的。
export default new VueI18n({
  locale: "en", // set locale 默认显示英文
  messages, // set locale messages
  dateTimeFormats,
});
