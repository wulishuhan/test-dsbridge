// eslint-disable-next-line
import {
  Login,
  Logout,
  getUserInfo,
  refresh,
  register,
  getFollowingList,
  openLogin,
} from "@/api/user";
import { getLikelist } from "@/api/like";
import { getCollectionResourceList } from "@/api/collection";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { generatorDefaultAvator } from "@/utils/generateImage";

const getDefaultState = () => {
  return {
    loginDialogVisible: false,
    isLoginForm: true,
    userInfo: {
      user_id: 0,
      nick_name: "",
      avatar: generatorDefaultAvator(" ", 0),
      email: "",
      user_name: "",
    },
    myFollowingList: [],
    myLikesList: [],
    myCollectionslist: [],
    expiresIn: [],
    isLogin: false,
    accessToken: getToken(),
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    config: {
      maxPictureSize: 10 * 1024 * 1024, //10MD
      maxFileSize: 100 * 1024 * 1024, //100M
      sourceAcceptType: ".jpg,.png,.svg,.dxf,.gc,.nc,.jpeg",
      pictureAcceptType: ".jpg,.png.svg.jpeg",
      fileLimit: 20,
    },
  };
};
const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_LOGININFO: (state, payload) => {
    state.userInfo = payload.user_info;
    // eslint-disable-next-line
    state.userInfo.avatar = !!payload.user_info.avatar
      ? payload.user_info.avatar
      : generatorDefaultAvator(
          payload.user_info.nick_name,
          payload.user_info.user_id
        );
    state.expiresIn = payload.expires_in;
    state.accessToken = payload.access_token;
    state.isLogin = true;
    setToken(payload.access_token);
    state.headers = {
      Authorization: "Bearer " + payload.access_token,
    };
  },
  SET_USERINFO: (state, payload) => {
    state.userInfo.user_id = payload.user_id;
    state.userInfo.nick_name = payload.nick_name;
    // eslint-disable-next-line
    state.userInfo.avatar = !!payload.avatar
      ? payload.avatar
      : generatorDefaultAvator(payload.nick_name, payload.user_id);
    state.userInfo.email = payload.email;
    state.userInfo.user_name = payload.user_name;
    state.userInfo.third_user = payload.third_user;
    state.isLogin = true;
    state.headers = {
      Authorization: "Bearer " + getToken(),
    };
    state.accessToken = getToken();
  },
  SET_FOLLOWINGLIST: (state, payload) => {
    state.myFollowingList = payload;
  },
  SET_LIKESLIST: (state, payload) => {
    state.myLikesList = payload;
  },
  SET_COLLECTIONSLIST: (state, payload) => {
    console.log("setting collection", payload);
    state.myCollectionslist = payload;
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
    const { loginForm } = payload;
    return new Promise((resolve, reject) => {
      Login({
        client_subtype: "Windows",
        client_type: "pc",
        password: loginForm.password,
        username: loginForm.username,
      })
        .then((res) => {
          console.log("test", res.data.code);
          if (res.data.code === 1023) {
            console.log("----");
            return reject(res);
          }
          let data = res.data.data;
          commit("SET_LOGININFO", data);
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  openLogin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      openLogin(payload)
        .then((res) => {
          if (res.data.code !== 0) {
            reject(res.data);
          }

          commit("SET_LOGININFO", res.data.data);
          setToken(res.data.data.access_token);
          resolve(res.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // eslint-disable-next-line
  register({ commit }, payload) {
    return new Promise((resolve, reject) => {
      register(payload)
        .then((res) => {
          // commit("SET_LOGININFO", res.data.data);
          // setToken(res.data.data.access_token);
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
            commit("SET_USERINFO", res.data.data);
          }
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getMyFollowingList({ commit }, payload) {
    getFollowingList(payload).then((res) => {
      commit("SET_FOLLOWINGLIST", res.data.data);
    });
  },
  getMyLikesList({ commit }, payload) {
    getLikelist(payload).then((res) => {
      console.log("getMyLikesList");
      commit("SET_LIKESLIST", res.data.rows);
    });
  },
  getMyCollectionList({ commit }, payload) {
    getCollectionResourceList(payload).then((res) => {
      console.log("getMyCollectionList");
      commit("SET_COLLECTIONSLIST", res.data.rows);
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
