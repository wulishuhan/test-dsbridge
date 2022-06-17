var mock = require("mockjs");
let data = mock.mock({
  "data|100": [
    {
      groupId: "@id",
      groupName: "@word",
      groupLogo: "@image('300x200','@color', '#FFF', '@word')",
      "topics|1-100": 100,
      "things|1-100": 100,
      "members|1-100": 100,
      "gourpImages|1-3": [
        { id: "@id", url: "@image('300x200','@color', '#FFF', '@word')" },
      ],
    },
  ],
});
const groupMock = function (app) {
  app.get("/groups/list", function (req, res) {
    let { currentPage, pageSize } = req.query;
    console.log(req.query);
    currentPage = parseInt(currentPage);
    pageSize = parseInt(pageSize);
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    let temp = [];
    for (let i = start; i < end; i++) {
      temp.push(data.data[i]);
    }
    res.json({
      status: 200,
      message: "ok",
      data: temp,
      length: data.data.length,
    });
  });
  let members = mock.mock({
    "data|100": [
      {
        userId: "@id",
        username: "@word",
        name: "@word",
        avatar: "@image('300x200','@color', '#FFF', '@word')",
      },
    ],
  });
  app.get("/groups/members", function (req, res) {
    let { currentPage, pageSize } = req.query;
    console.log(req.query);
    currentPage = parseInt(currentPage);
    pageSize = parseInt(pageSize);
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    if (end > members.data.length) {
      end = members.data.length;
    }
    let temp = [];
    for (let i = start; i < end; i++) {
      temp.push(members.data[i]);
    }
    if (start > members.data.length) {
      res.status(500).send("Bad Pagination");
    } else {
      res.json({
        status: 200,
        message: "ok",
        data: temp,
        length: members.data.length,
      });
    }
  });
  let groupInfo = mock.mock({
    groupId: "@id",
    groupName: "@word",
    groupImg: "@image('300x200','@color', '#FFF', '@word')",
    isJoinGroup: "@boolean()",
    topics: "@integer(1,1000)",
    things: "@integer(1,1000)",
    members: "@integer(1,1000)",
  });
  app.get("/groups/info", function (req, res) {
    console.log(req.query);
    res.json({
      status: 200,
      message: "ok",
      data: groupInfo,
    });
  });

  let groupThingsInfo = mock.mock({
    "data|1-100": [
      {
        thingsId: "@id",
        thingsName: "@word",
        thingsImg: "@image('300x200','@color', '#FFF', '@word')",
        likes: "@integer(1,1000)",
        messages: "@integer(1,1000)",
        collections: "@integer(1,1000)",
        publicTime: "@datetime(yyyy MM dd)",
        avatar: "@image('300x200','@color', '#FFF', '@word')",
        author: "@word",
        isLike: "@boolean()",
        isCollected: "@boolean()",
      },
    ],
  });
  app.get("/groups/thingsInfo", function (req, res) {
    console.log(req.query);
    let { currentPage, pageSize } = req.query;
    currentPage = parseInt(currentPage);
    pageSize = parseInt(pageSize);
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    if (end > groupThingsInfo.data.length) {
      end = groupThingsInfo.data.length;
    }
    let temp = [];
    for (let i = start; i < end; i++) {
      temp.push(groupThingsInfo.data[i]);
    }
    if (start > groupThingsInfo.data.length) {
      res.status(500).send("Bad Pagination");
    } else {
      res.json({
        status: 200,
        message: "ok",
        data: temp,
        length: groupThingsInfo.data.length,
      });
    }
  });
  let groupAboutInfo = mock.mock({
    description: "@paragraph",
    "featuredThings|1-5": [
      {
        thingsId: "@id",
        thingsName: "@word",
        thingsImg: "@image('300x200','@color', '#FFF', '@word')",
        likes: "@integer(1,1000)",
        messages: "@integer(1,1000)",
        collections: "@integer(1,1000)",
        publicTime: "@datetime(yyyy MM dd)",
        avatar: "@image('300x200','@color', '#FFF', '@word')",
        author: "@word",
        isLike: "@boolean()",
        isCollected: "@boolean()",
      },
    ],
  });
  app.get("/groups/groupAboutInfo", function (req, res) {
    console.log(req.query);
    console.log(groupAboutInfo);
    res.json({
      status: 200,
      message: "ok",
      data: groupAboutInfo,
    });
  });

  app.post("/groups/changeUserGroup", function (req, res) {
    console.log(req.query);
    res.json({
      status: 200,
      message: "ok",
    });
  });
};

module.exports = groupMock;
