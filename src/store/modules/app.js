const state = {
  title: "home",
  tabbarList: [
    {
      iconPath:
        "https://bocai-kitchen.oss-cn-hangzhou.aliyuncs.com/upload/slider/000/000/001/5f68aa847ba3d749.png",
      pagePath: "/pages/shop_index/index",
      pageType: "shopIndex",
      selected: true,
      selectedIconPath:
        "https://bocai-kitchen.oss-cn-hangzhou.aliyuncs.com/upload/slider/000/000/001/5f68aa847bb1c523.png",
      text: "首页",
      type: "0",
    },
    {
      iconPath:
        "https://bocai-kitchen.oss-cn-hangzhou.aliyuncs.com/upload/slider/000/000/001/5f68abe238597280.png",
      isSpecial: true,
      pagePath: "/pages/my/my_order?store_id=",
      pageType: "page",
      selected: false,
      selectedIconPath:
        "https://bocai-kitchen.oss-cn-hangzhou.aliyuncs.com/upload/slider/000/000/001/5f68abe23867d527.png",
      text: "订单",
      type: "0",
    },
    {
      iconPath:
        "https://bocai-kitchen.oss-cn-hangzhou.aliyuncs.com/upload/slider/000/000/001/5f68aaec7a086601.png",
      pagePath: "/pages/plat_menu/my",
      pageType: "myIndex",
      selected: false,
      selectedIconPath:
        "https://bocai-kitchen.oss-cn-hangzhou.aliyuncs.com/upload/slider/000/000/001/5f68aaec7a165817.png",
      text: "我的",
      type: "0",
    },
  ],
};

const mutations = {
  SET_TABBARlIST: (state, tabbarList) => {
    state.tabbarList = tabbarList;
  },
  SET_TITLE: (state, title) => {
    state.title = title;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
