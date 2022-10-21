import router from "./router";
import store from "./store";
// import { Message } from "element-ui";
// import { getToken } from "@/utils/auth"; // get token from cookie
router.beforeEach(async (to, from, next) => {
  //切换页面滚动条自动回到顶部
  window.scrollTo(0, 0);
  store.commit("app/SET_TITLE", to.meta.title);
  next();
});

router.afterEach(() => {
  // finish progress bar
});
