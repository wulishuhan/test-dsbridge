import { getCommentList } from "@/api/user";
const state = {
  commentList: [],
};

const mutations = {
  SET_LIST: (state, payload) => {
    state.commentList = payload;
  },
};

const actions = {
  getCommentList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getCommentList(payload)
        .then((res) => {
          commit("SET_LIST", res.data.rows);
          resolve(res.data.rows);
        })
        .catch((error) => {
          reject(error);
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
