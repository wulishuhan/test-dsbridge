const mock = require("mockjs");
let activityListData = mock.mock({
  "things|100-200": [
    {
      id: "@id",
      thingId: "@id",
      userId: "@id",
      avatar: "@image('300x200','@color', '#FFF', '@word')",
      userName: "@word",
      thingName: "@word",
      publicTime: "@datetime(yyyy MM dd)",
      url: "@image('300x200','@color', '#FFF', '@word')",
      likes: "@integer(60, 1000)",
      isLike: "@boolean",
      isCollected: "@boolean",
      comments: "@integer(60, 1000)",
    },
  ],
});
let watchListData = mock.mock({
  "things|100-200": [
    {
      id: "@id",
      thingId: "@id",
      userId: "@id",
      avatar: "@image('300x200','@color', '#FFF', '@word')",
      userName: "@word",
      thingName: "@word",
      publicTime: "@datetime(yyyy MM dd)",
      url: "@image('300x200','@color', '#FFF', '@word')",
      likes: "@integer(60, 1000)",
      isLike: "@boolean",
      isCollected: "@boolean",
      comments: "@integer(60, 1000)",
    },
  ],
});
let getDesignerListData = mock.mock({
  "things|10-20": [
    {
      id: "@id",
      userId: "@id",
      avatar: "@image('300x200','@color', '#FFF', '@word')",
      userName: "@word",
      "imgUrls|3": ["@image('300x200','@color', '#FFF', '@word')"],
      designs: "@integer(60, 1000)",
    },
  ],
});
module.exports = [
  {
    url: "/dashboard/getWatchList",
    type: "get",
    response: (req) => {
      return {
        status: 200,
        message: "ok",
        data: watchListData.things,
        length: 100,
      };
    },
  },
  {
    url: "/dashboard/getActivityList",
    type: "get",
    response: (req) => {
      return {
        status: 200,
        message: "ok",
        data: activityListData.things,
        length: 1000,
      };
    },
  },
  {
    url: "/dashboard/getDesignerList",
    type: "get",
    response: (req) => {
      return {
        status: 200,
        message: "ok",
        data: getDesignerListData.things,
        length: 1000,
      };
    },
  },
];
