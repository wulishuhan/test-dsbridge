var mock = require("mockjs");
const thingMock = function (app) {
  let detailData = mock.mock({
    id: "@id",
    "content|1-8": ["@word"],
    "tags|1-8": ["@word"],
    summary: "@paragraph",
    "topics|1-10000": 100,
    "things|1-10000": 100,
    "members|1-10000": 100,
  });
  app.get("/thing/detail", function (req, res) {
    let { thingId } = req.query;
    console.log("/thing/detail", thingId);
    res.json({
      status: 200,
      message: "ok",
      data: detailData,
      length: detailData.length,
    });
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
  app.get("/thing/downloadInfo", function (req, res) {
    let { thingId } = req.query;
    console.log("/thing/downloadInfo", thingId);
    res.json({
      status: 200,
      message: "ok",
      data: downloadInfo.data,
      length: downloadInfo.length,
    });
  });

  let userInfo = mock.mock({
    id: "@id",
    avatar: "@image('300x200','@color', '#FFF', '@word')",
    thingName: "@word",
    publicTime: "@datetime(yyyy MM dd)",
    name: "@word",
    "image|3-10": [
      {
        id: "@id",
        url: "@image('300x200','@color', '#FFF', '@word')",
      },
    ],
  });
  app.get("/thing/getUserInfo", function (req, res) {
    let { thingId } = req.query;
    console.log("/thing/getUserInfo:", thingId);
    res.json({
      status: 200,
      message: "ok",
      data: userInfo,
      length: userInfo.length,
    });
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
  app.get("/thing/getThingList", function (req, res) {
    let { currentPage, pageSize } = req.query;
    currentPage = parseInt(currentPage);
    pageSize = parseInt(pageSize);
    let data = [];
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    for (let i = start; i < end; i++) {
      data.push(thingListData.things[i]);
    }
    res.json({
      status: 200,
      message: "ok",
      data: data,
      length: thingListData.things.length,
    });
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
  app.get("/thing/getUserComments", function (req, res) {
    let { thingId } = req.query;
    console.log("/thing/getUserComments:", thingId);
    res.json({
      status: 200,
      message: "ok",
      data: comments,
      length: comments.length,
    });
  });

  let userMakesData = mock.mock({
    "makes|1-13": [
      {
        id: "@id",
        uid: "@id",
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
  app.get("/thing/getUserMakes", function (req, res) {
    let { thingId } = req.query;
    console.log("/thing/getUserMakes", thingId);
    res.json({
      status: 200,
      message: "ok",
      data: userMakesData,
      length: userMakesData.length,
    });
  });

  app.post("/thing/changeCollect", function (req, res) {
    let { thingId, isCollected, userId } = req.query;
    console.log("/thing/changeCollect", thingId, isCollected, userId);
    res.json({
      status: 200,
      message: "success",
    });
  });

  app.post("/thing/changeLike", function (req, res) {
    let { thingId, isLike, userId } = req.query;
    console.log("/thing/changeCollect", thingId, isLike, userId);
    res.json({
      status: 200,
      message: "success",
    });
  });
};
module.exports = thingMock;
