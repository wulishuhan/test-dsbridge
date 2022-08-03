import axios from "axios";
import { getToken } from "@/utils/auth";
import store from "@/store";
const service = axios.create({
  // timeout: 1000,
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
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
  console.log("request", res);
  switch (code) {
    case 0:
      return Promise.resolve(res);
    case 2:
      return Promise.reject({
        msg: "server error",
      });

    case 200:
      return Promise.resolve(res);

    case 201:
      return Promise.reject({
        msg: "Created",
      });

    case 401:
      return Promise.reject({
        msg: "Unauthenticated",
      });

    case 403:
      return Promise.reject({
        msg: "Forbidden",
      });

    case 404:
      return Promise.reject({
        msg: "Not Found",
      });

    case 1002:
      return Promise.reject({
        msg: "username and password must be entered",
      });

    case 1003:
      return Promise.reject({
        msg: "username is not in the specified range",
      });

    case 1004:
      return Promise.reject({
        msg: "username and password is not in the specified range",
      });

    case 1006:
      return Promise.reject({
        msg: "username does not exist",
      });

    case 1007:
      return Promise.reject({
        msg: "Sorry, your account has been deleted",
      });

    case 1008:
      return Promise.reject({
        msg: "this account has been disabled. Please contact the administrator",
      });

    case 1009:
      return Promise.reject({
        msg: "Incorrect username or password",
      });
    case 1010:
      return Promise.reject({
        msg: "userName and Password must be entered",
      });
    case 1011:
      return Promise.reject({
        msg: "The username already exists",
      });
    case 1012:
      return Promise.reject({
        msg: "The email already exists",
      });
    case 1013:
      //未登录
      if (WHITE_LIST_URL.indexOf(res.config.url) != 0) {
        store.dispatch("user/switchLoginRegisteForm", {
          loginDialogVisible: true,
          isLoginForm: true,
        });
        store.dispatch("user/logout");
      }

      return Promise.reject({
        code: 1013,
        msg: "Token已经过期,请重新登录",
      });
    case 1016:
      return Promise.reject({
        msg: "Your device does not support logins",
      });
  }
  return Promise.resolve(res);
});

export default service;
