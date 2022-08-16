// eslint-disable-next-line
import { Login, Logout, getUserInfo, refresh, register } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";

const getDefaultState = () => {
  return {
    loginDialogVisible: false,
    isLoginForm: true,
    userInfo: {
      user_id: 0,
      nick_name: "",
      avatar: "",
      email: "",
      user_name: "",
    },
    expiresIn: [],
    isLogin: false,
    accessToken: getToken(),
  };
};
const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_LOGININFO: (state, payload) => {
    state.userInfo = payload.user_info;
    state.expiresIn = payload.expires_in;
    state.accessToken = payload.access_token;
    state.isLogin = true;
  },
  SET_USERINFO: (state, payload) => {
    state.userInfo.user_id = payload.user_id;
    state.userInfo.nick_name = payload.nick_name;
    state.userInfo.avatar = payload.avatar;
    state.userInfo.email = payload.email;
    state.userInfo.user_name = payload.user_name;
    state.isLogin = true;
  },
  SWITCH_LOGIN_REGISTER_FORM: (state, payload) => {
    state.loginDialogVisible = payload.loginDialogVisible;
    state.isLoginForm = payload.isLoginForm;
  },
  CLOSE_LOGIN_REGISTER_FORM: (state) => {
    state.loginDialogVisible = false;
  },
  //eslint-disable-next-line
  SET_ISLOGIN: (state, loginStatus) => {
    state.isLogin = loginStatus;
  },
};

const actions = {
  // eslint-disable-next-line
  login({ commit }, payload) {
    const { loginForm, loginSuccess } = payload;
    Login({
      client_subtype: "Windows",
      client_type: "pc",
      password: loginForm.password,
      username: loginForm.username,
    })
      .then((res) => {
        let data = res.data.data;
        commit("SET_LOGININFO", data);
        setToken(data.access_token);
        loginSuccess(data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  register({ commit }, payload) {
    return new Promise((resolve, reject) => {
      register(payload)
        .then((res) => {
          console.log("register=========", res);
          commit("SET_LOGININFO", res.data.data);
          setToken(res.data.data.access_token);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then((res) => {
          if (res.data.code == 0) {
            res.data.data.avatar = res.data.data.avatar
              ? res.data.data.avatar + "?" + Math.random()
              : res.data.data.avatar;
            commit("SET_USERINFO", res.data.data);
          }
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      Logout(state.token)
        .then((res) => {
          removeToken(); // must remove  token  first
          commit("RESET_STATE");
          commit("SET_ISLOGIN", false);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  resetToken({ commit }) {
    return new Promise((resolve) => {
      // must remove  token  first
      refresh().then((res) => {
        removeToken();
        commit("RESET_STATE");
        console.log("resetToken", res);
        resolve();
      });
    });
  },
  switchLoginRegisteForm({ commit }, payload) {
    commit("SWITCH_LOGIN_REGISTER_FORM", payload);
  },
  closeLoginRegisteForm({ commit }) {
    commit("CLOSE_LOGIN_REGISTER_FORM");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
