// eslint-disable-next-line
import { Login, Logout, getInfo, refresh } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";

const getDefaultState = () => {
  return {
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
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response.data;
          if (!data) {
            return reject("Verification failed, please Login again.");
          }
          const { name, avatar, roles, id } = data;
          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_USERID", id);
          resolve(data);
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
