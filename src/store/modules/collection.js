// eslint-disable-next-line
const getDefaultState = () => {
  return {
    selectCollectionBox: "",
  };
};
const state = getDefaultState();

const mutations = {
  SET_SELECTCOLLECTIONBOX: (state, payload) => {
    state.selectCollectionBox = payload;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
