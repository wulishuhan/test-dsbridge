const state = {
  selectorModules: new Set(),
};

const mutations = {
  SET_SELECTORMODULES: (state, selectorModules) => {
    let data = new Set([...state.selectorModules]);
    data.add(selectorModules);
    state.selectorModules = data;
  },
  DELETE_SELECTORMODULES: (state, selectorModules) => {
    let data = new Set([...state.selectorModules]);
    data.delete(selectorModules);
    state.selectorModules = data;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
