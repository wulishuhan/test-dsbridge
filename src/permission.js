import router from "./router";
import store from "./store";
// import { Message } from "element-ui";
// import { getToken } from "@/utils/auth"; // get token from cookie
router.beforeEach(async (to, from, next) => {
  //切换页面滚动条自动回到顶部
  window.scrollTo(0, 0);
  console.log("to", to);
  if (to.name == "catelog") {
    store.commit("app/SET_TITLE", to.query.title);
  } else {
    store.commit("app/SET_TITLE", to.meta.title);
  }
  store.commit("app/SET_NAVHIDDEN", to.meta.hidden);
  next();
});

router.afterEach(() => {
  // finish progress bar
});
