import axios from "axios";
import { getToken } from "@/utils/auth";
import store from "@/store";
import i18n from "./i18n";
let baseURL = process.env.VUE_APP_BASE_API;
const service = axios.create({
  // timeout: 1000,
  baseURL: baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});
// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    //if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    config.headers["Authorization"] = "Bearer " + getToken();
    //}
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use((res) => {
  const code = res.data.code;
  const WHITE_LIST_URL = ["/system/user/getUserInfo"];
  switch (code) {
    case 0:
      return Promise.resolve(res);
    case 1:
      return Promise.reject({
        code: 1,
        msg: i18n.t("error.serverDatabaseError"),
      });
    case 2:
      return Promise.reject({
        code: 2,
        msg: i18n.t("error.serverError"),
      });

    case 200:
      return Promise.resolve(res);

    case 201:
      return Promise.reject({
        code: 201,
        msg: i18n.t("error.created"),
      });

    case 401:
      return Promise.reject({
        code: 401,
        msg: i18n.t("error.unauthenticated"),
      });

    case 403:
      return Promise.reject({
        code: 403,
        msg: i18n.t("error.forbidden"),
      });

    case 404:
      return Promise.reject({
        code: 404,
        msg: i18n.t("error.notFound"),
      });

    case 1002:
      return Promise.reject({
        code: 1002,
        msg: i18n.t("error.usernameAndPasswordMustEnter"),
      });

    case 1003:
      return Promise.reject({
        code: 1003,
        msg: i18n.t("error.usernameRange"),
      });

    case 1004:
      return Promise.reject({
        code: 1004,
        msg: i18n.t("error.usernameAndPasswordRange"),
      });

    case 1006:
      return Promise.reject({
        code: 1006,
        msg: i18n.t("error.usernameNotExist"),
      });

    case 1007:
      return Promise.reject({
        code: 1007,
        msg: i18n.t("error.accountDeleted"),
      });

    case 1008:
      return Promise.reject({
        code: 1008,
        msg: i18n.t("error.accountDisabled"),
      });

    case 1009:
      return Promise.reject({
        msg: i18n.t("error.passwordError"),
        code: 1009,
      });
    case 1010:
      return Promise.reject({
        msg: i18n.t("error.usernameAndPasswordMustEnter"),
        code: 1010,
      });
    case 1011:
      return Promise.reject({
        code: 1011,
        msg: i18n.t("error.usernameExist"),
      });
    case 1012:
      return Promise.reject({
        code: 1012,
        msg: i18n.t("error.emailExist"),
      });
    case 1013:
      //未登录
      if (WHITE_LIST_URL.indexOf(res.config.url) != 0) {
        store.dispatch("user/switchLoginRegisteForm", {
          loginDialogVisible: true,
          isLoginForm: true,
        });
        // store.dispatch("user/logout");
      }

      return Promise.reject({
        code: 1013,
        msg: i18n.t("error.tokenExpired"),
      });
    case 1016:
      return Promise.reject({
        code: 1016,
        msg: i18n.t("error.deviceNotSupported"),
      });
  }
  return Promise.resolve(res);
});

export default service;
export { baseURL };
