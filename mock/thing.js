var mock = require("mockjs");
let detailData = mock.mock({
  id: "@id",
  "content|1-8": ["@word"],
  "tags|1-8": ["@word"],
  summary: "@paragraph",
  license: ["@word"],
  "topics|1-10000": 100,
  "things|1-10000": 100,
  "members|1-10000": 100,
});
let downloadInfo = mock.mock({
  "data|10": [
    {
      id: "@id",
      url: "@image('300x200','@color', '@color', '@word')",
      name: "@word",
      downloadNumber: "@integer(0, 1000)",
      size: "@integer(0, 10)",
      updatedTime: "@datetime(yyyy MM dd)",
    },
  ],
});
let userInfo = mock.mock({
  id: "@id",
  avatar: "@image('300x200','@color', '#FFF', '@word')",
  thingName: "@word",
  publicTime: "@datetime(yyyy MM dd)",
  name: "@word",
  isLike: "@boolean",
  isCollected: "@boolean",
  "image|3-10": [
    {
      id: "@id",
      url: "@image('300x200','@color', '#FFF', '@word')",
    },
  ],
});
let comments = [
  {
    id: "1",
    uid: mock.mock("@id"),
    pid: "0",
    thingId: mock.mock("@id"),
    avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
    name: mock.mock("@word"),
    publicTime: mock.mock("@datetime(yyyy MM dd)"),
    comment: mock.mock("@sentence()"),
  },
  {
    id: "2",
    uid: mock.mock("@id"),
    pid: "1",
    thingId: mock.mock("@id"),
    avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
    name: mock.mock("@word"),
    publicTime: mock.mock("@datetime(yyyy MM dd)"),
    comment: mock.mock("@sentence()"),
  },
  {
    id: "3",
    uid: mock.mock("@id"),
    pid: "2",
    thingId: mock.mock("@id"),
    avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
    name: mock.mock("@word"),
    publicTime: mock.mock("@datetime(yyyy MM dd)"),
    comment: mock.mock("@sentence()"),
  },
  {
    id: "4",
    uid: mock.mock("@id"),
    pid: "2",
    thingId: mock.mock("@id"),
    avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
    name: mock.mock("@word"),
    publicTime: mock.mock("@datetime(yyyy MM dd)"),
    comment: mock.mock("@sentence()"),
  },
  {
    id: "5",
    uid: mock.mock("@id"),
    pid: "0",
    thingId: mock.mock("@id"),
    avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
    name: mock.mock("@word"),
    publicTime: mock.mock("@datetime(yyyy MM dd)"),
    comment: mock.mock("@sentence()"),
  },
  {
    id: "6",
    uid: mock.mock("@id"),
    pid: "5",
    thingId: mock.mock("@id"),
    avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
    name: mock.mock("@word"),
    publicTime: mock.mock("@datetime(yyyy MM dd)"),
    comment: mock.mock("@sentence()"),
  },
  {
    id: "7",
    uid: mock.mock("@id"),
    pid: "5",
    thingId: mock.mock("@id"),
    avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
    name: mock.mock("@word"),
    publicTime: mock.mock("@datetime(yyyy MM dd)"),
    comment: mock.mock("@sentence()"),
  },
];
let userMakesData = mock.mock({
  "makes|1-13": [
    {
      thingId: "@id",
      userId: "@id",
      avatar: "@image('300x200','@color', '#FFF', '@word')",
      name: "@word",
      thingName: "@word",
      publicTime: "@datetime(yyyy MM dd)",
      url: "@image('300x200','@color', '#FFF', '@word')",
      likes: "@integer(60, 1000)",
      comments: "@integer(60, 1000)",
      isLike: "@boolean",
    },
  ],
});
let thingListData = mock.mock({
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
    },
  ],
});

module.exports = [
  {
    url: "/thing/detail",
    type: "get",
    response: (config) => {
      let { thingId } = config.query;
      console.log("/thing/detail", thingId);
      return {
        status: 200,
        message: "ok",
        data: detailData,
        length: detailData.length,
      };
    },
  },
  {
    url: "/thing/downloadInfo",
    type: "get",
    response: (config) => {
      let { thingId } = config.query;
      console.log("/thing/downloadInfo", thingId);
      return {
        status: 200,
        message: "ok",
        data: downloadInfo.data,
        length: downloadInfo.length,
      };
    },
  },
  {
    url: "/thing/getUserInfo",
    type: "get",
    response: (config) => {
      let { thingId } = config.query;
      console.log("/thing/getUserInfo", thingId);
      return {
        status: 200,
        message: "ok",
        data: userInfo,
        length: userInfo.length,
      };
    },
  },
  {
    url: "/thing/getThingList",
    type: "get",
    response: (req) => {
      console.log("thing list query:", req.query);
      let { currentPage, pageSize } = req.query;
      currentPage = parseInt(currentPage);
      pageSize = parseInt(pageSize);
      let data = [];
      let start = (currentPage - 1) * pageSize;
      let end = start + pageSize;
      for (let i = start; i < end; i++) {
        data.push(thingListData.things[i]);
      }
      return {
        status: 200,
        message: "ok",
        data: data,
        length: thingListData.things.length,
      };
    },
  },
  {
    url: "/thing/addUserComments",
    type: "post",
    response: (req) => {
      comments.push(req.query);
      return {
        status: 200,
        message: "ok",
        data: comments,
        length: comments.length,
      };
    },
  },
  {
    url: "/thing/getUserComments",
    type: "get",
    response: (req) => {
      let { thingId } = req.query;
      console.log("/thing/getUserComments:", thingId);
      return {
        status: 200,
        message: "ok",
        data: comments,
        length: comments.length,
      };
    },
  },
  {
    url: "/thing/getUserMakes",
    type: "get",
    response: (req) => {
      let { thingId } = req.query;
      console.log("/thing/getUserMakes", thingId);
      return {
        status: 200,
        message: "ok",
        data: userMakesData,
        length: userMakesData.length,
      };
    },
  },
  {
    url: "/thing/changeCollect",
    type: "post",
    response: (req) => {
      let { thingId, isCollected, userId } = req.query;
      let message = ""
      console.log("/thing/changeCollect", thingId, isCollected, userId);
      console.log("isCollected", isCollected);
      if (isCollected) {
        message = "Uncollected successfully";
      } else {
        message = "Collected successfully";
      }
      return {
        status: 200,
        message: message,
      };
    },
  },
  {
    url: "/thing/changeLike",
    type: "post",
    response: (req) => {
      console.log(req.query);
      return {
        status: 200,
        message: "success",
      };
    },
  }
];
