import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import { getToken } from "@/utils/auth"; // get token from cookie
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title;
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      next("/");
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          const res = await store.dispatch("user/getUserInfo");
          next();
          console.log("user info: ", res);
        } catch (error) {
          Message.error(error || "Has Error");
          next();
        }
      }
    }
  } else {
    /* has no token*/
    next();
  }
});

router.afterEach(() => {
  // finish progress bar
});
