// eslint-disable-next-line
import { Login, Logout, getInfo, refresh } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    roles: [],
    isLogin: false,
    userId: "",
  };
};
const state = getDefaultState();

const mutations = {
  SET_ISLOGIN: (state, isLogin) => {
    state.isLogin = isLogin;
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_USERID: (state, userId) => {
    state.userId = userId;
  },
};

const actions = {
  // eslint-disable-next-line
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      Login({ username: username.trim(), password: password })
        .then((response) => {
          const data = response.data.data;
          console.log(data);
          commit("SET_TOKEN", data.token);
          commit("SET_ISLOGIN", true);
          commit("SET_ROLES", data.roles);
          commit("SET_NAME", data.name);
          commit("SET_AVATAR", data.avatar);
          commit("SET_USERID", data.userId);
          setToken(data.token);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
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
