const mock = require("mockjs");
let activityListData = mock.mock({
  "things|10-20": [
    {
      id: "@id",
      thingId: "@id",
      userId: "@id",
      avatar: "@image('300x200','@color', '#FFF', '@word')",
      author: "@word",
      thingsName: "@word",
      publicTime: "@datetime(yyyy MM dd)",
      thingsImg: "@image('300x200','@color', '#FFF', '@word')",
      likes: "@integer(60, 1000)",
      collections: "@integer(60, 1000)",
      isLike: "@boolean",
      isCollected: "@boolean",
      messages: "@integer(60, 1000)",
      type: "image",
    },
    {
      id: "@id",
      userId: "@id",
      avatar: "@image('300x200','@color', '#FFF', '@word')",
      author: "@word",
      publicTime: "@datetime(yyyy MM dd)",
      content: "@word(60, 1000)",
      type: "text",
    },
    {
      id: "@id",
      userId: "@id",
      subUserId: "@id",
      avatar: "@image('300x200','@color', '#FFF', '@word')",
      subAvatar: "@image('300x200','@color', '#FFF', '@word')",
      author: "@word",
      subAuthor: "@word",
      topic: "@word",
      publicTime: "@datetime(yyyy MM dd)",
      content: "@word(60, 1000)",
      type: "topic",
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
      author: "@word",
      thingsName: "@word",
      publicTime: "@datetime(yyyy MM dd)",
      thingsImg: "@image('300x200','@color', '#FFF', '@word')",
      likes: "@integer(60, 1000)",
      collections: "@integer(60, 1000)",
      isLike: "@boolean",
      isCollected: "@boolean",
      messages: "@integer(60, 1000)",
      type: "image",
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
    response: () => {
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
      let { type } = req.query;
      console.log("type: ", type);
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
    response: () => {
      return {
        status: 200,
        message: "ok",
        data: getDesignerListData.things,
        length: 1000,
      };
    },
  },
];
