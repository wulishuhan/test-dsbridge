var mock = require("mockjs");
let user = mock.mock({
  "data|1000": [
    {
      id: "@id", // 数字从当前数开始依次 +1
      "age|18-40": 20, // 年龄为18-40之间的随机数字
      "sex|1": ["男", "女"], // 性别是数组中随机的一个
      name: "@name()", // 名字为随机中文名字
      email: "@email", // 随机邮箱
      isShow: "@boolean", // 随机获取boolean值
      avatar: "@image('30x20','@color', '@color', '@word')", //
      uploadImg: "@image('300x200','@color', '@color', '@word')", //
      url: "@image('300x200','@color', '@color', '@word')",
      thingName: "@word",
      likes: /\d{1,4}/,
      date: "@date",
      "subject|1": [
        "Art",
        "Engineering",
        "Geography",
        "History",
        "Science",
        "Special Ed",
        "Technology",
        "Languages",
        "Math",
        "Reset",
      ],
      "grade|1": ["K-6", "7-12", "University", "Reset"],
      "followers|1-100": 100,
      "following|1-100": 100,
      "designs|1-100": 100,
      address: "@word()",
      isLike: "@boolean",
      isCollected: "@boolean",
    },
  ],
});

let data = user.data;
const userMock = function (app) {
  app.get("/user/list", function (req, res) {
    let { currentPage, pageSize, subject, grade } = req.query;
    currentPage = Number(currentPage);
    pageSize = Number(pageSize);
    let t1 = [];
    if (subject && grade) {
      for (const val of data) {
        if (val.grade == grade && val.subject == subject) {
          t1.push(val);
        }
      }
    } else {
      t1 = data;
    }
    let start = pageSize * (currentPage - 1);
    let end = start + pageSize;
    let temp = [];
    for (let i = start; i < end && i < t1.length; i++) {
      temp.push(t1[i]);
    }
    console.log(start, end);
    res.json({
      status: 200,
      message: "ok",
      data: temp,
      length: t1.length,
    });
  });

  let loginData = mock.mock({
    name: "@name",
    avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
    token: /(\w\W\d){10,15}/,
    roles: ["user"],
    userId: "@id",
  });
  app.post("/user/login", function (req, res) {
    const { username, password } = req.query;
    console.log(username, password);
    res.json({
      status: 200,
      data: loginData,
    });
  });

  let getInfo = mock.mock({
    name: "@name",
    avatar: "@image('300x200','@color', '#FFF', '@word')",
    token: /(\w\W\d){10,15}/,
    roles: ["user"],
    id: "@id",
  });
  app.get("/user/getInfo", function (req, res) {
    const { username, password } = req.query;
    console.log(req.query);
    console.log(username, password);
    res.json({
      status: 200,
      data: getInfo,
    });
  });

  let resetTokenData = mock.mock({
    name: "@name",
    avatar: "@image('300x200','@color', '#FFF', '@word')",
    token: /(\w\W\d){10,15}/,
    roles: ["user"],
  });
  app.post("/user/resetToken", function (req, res) {
    const { username, password } = req.query;
    console.log(username, password);
    res.json({
      status: 200,
      data: resetTokenData,
    });
  });

  app.post("/user/logout", function (req, res) {
    res.json({
      code: 200,
      data: "success",
    });
  });

  let userInfoByUserId = mock.mock({
    id: "@id",
    avatar: "@image('300x200','@color', '#FFF', '@word')",
    name: "@word",
    background: "@image('300x200','@color', '#FFF', '@word')",
    publicTime: "@datetime(yyyy MM dd)",
    followers: "@integer(60, 1000)",
    following: "@integer(60, 1000)",
    designs: "@integer(1, 30)",
    isFollow: "@boolean",
    "design|1-7": [
      {
        id: "@id",
        thingName: "@word",
        publicTime: "@datetime(yyyy MM dd)",
        isLike: "@boolean",
        likes: "@integer(1, 1000)",
        comments: "@integer(1, 1000)",
        url: "@image('300x200','@color', '#FFF', '@word')",
        isCollected: "@boolean",
      },
    ],
  });
  app.get("/user/getUserInfoByUserId", function (req, res) {
    const { id, userId } = req.query;
    console.log(id, userId);
    res.json({
      status: 200,
      message: "ok",
      data: userInfoByUserId,
      length: userInfoByUserId.length,
    });
  });
  app.post("/user/receiveImg", function (req, res) {
    console.log(req.query);
    res.json({
      status: 200,
      message: "ok",
    });
  });
};

module.exports = userMock;
