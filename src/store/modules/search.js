const state = {
  searchKeywords: "",
};

const mutations = {
  SET_SEARCH_KEYWORDS: (state, keywords) => {
    state.searchKeywords = keywords;
    console.log("set keywords successfully!");
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
