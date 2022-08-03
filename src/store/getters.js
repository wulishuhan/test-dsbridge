const getters = {
  selectSubject: (state) => state.filterCard.selectSubject,
  selectGrade: (state) => state.filterCard.selectGrade,
  selectProfile: (state) => state.filterCard.selectProfile,
  isLogin: (state) => state.user.isLogin,
  roles: (state) => state.user.roles,
  token: (state) => state.user.accessToken,
  name: (state) => state.user.userInfo.nick_name,
  avatar: (state) => state.userInfo.avatar,
  userId: (state) => state.user.userId,
  selectorModules: (state) => state.upload.selectorModules,
  searchKeywords: (state) => state.search.userId,
};
export default getters;
