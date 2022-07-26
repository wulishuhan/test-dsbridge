const mock = require("mockjs");
let user = mock.mock({
  "data|1000": [
    {
      id: "@id", // 数字从当前数开始依次 +1
      "age|18-40": 20, // 年龄为18-40之间的随机数字
      "sex|1": ["男", "女"], // 性别是数组中随机的一个
      thingId: "@id",
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
let loginData = mock.mock({
  user_info: {
    user_name: "@name",
    nick_name: "@name",
    avatar: "@image('300x200','@color', '#FFF', '@word')",
    access_token: /(\w\W\d){10,15}/,
    user_id: "@id",
  },
});
let getInfo = mock.mock({
  user_id: "@id",
  username: "@name",
  email: "@email",
  nickname: "@name",
  avatar: "@image('300x200','@color', '#FFF', '@word')",
  token: /(\w\W\d){10,15}/,
  roles: ["user"],
});
let resetTokenData = mock.mock({
  name: "@name",
  avatar: "@image('300x200','@color', '#FFF', '@word')",
  token: /(\w\W\d){10,15}/,
  roles: ["user"],
});
let userInfoByUserId = mock.mock({
  userId: "@id",
  avatar: "@image('300x200','@color', '#FFF', '@word')",
  name: "@word",
  background: "@image('300x200','@color', '#FFF', '@word')",
  publicTime: "@datetime(yyyy MM dd)",
  followers: "@integer(60, 1000)",
  following: "@integer(60, 1000)",
  designs: "@integer(1, 30)",
  isFollow: "@boolean",
  address: "@word",
  username: "@word",
  "design|1-7": [
    {
      userId: "@id",
      thingId: "@id",
      thingName: "@word",
      publicTime: "@datetime(yyyy MM dd)",
      isLike: "@boolean",
      likes: "@integer(1, 1000)",
      comments: "@integer(1, 1000)",
      url: "@image('300x200','@color', '#FFF', '@word')",
      isCollected: "@boolean",
    },
  ],
  "favorites|1-7": [
    {
      userId: "@id",
      thingId: "@id",
      thingName: "@word",
      publicTime: "@datetime(yyyy MM dd)",
      isLike: "@boolean",
      likes: "@integer(1, 1000)",
      comments: "@integer(1, 1000)",
      url: "@image('300x200','@color', '#FFF', '@word')",
      isCollected: "@boolean",
    },
  ],
  "collections|1-7": [
    {
      userId: "@id",
      thingId: "@id",
      thingName: "@word",
      publicTime: "@datetime(yyyy MM dd)",
      isLike: "@boolean",
      likes: "@integer(1, 1000)",
      comments: "@integer(1, 1000)",
      url: "@image('300x200','@color', '#FFF', '@word')",
      isCollected: true,
    },
  ],
  "makes|1-7": [
    {
      userId: "@id",
      thingId: "@id",
      thingName: "@word",
      publicTime: "@datetime(yyyy MM dd)",
      isLike: "@boolean",
      likes: "@integer(1, 1000)",
      comments: "@integer(1, 1000)",
      url: "@image('300x200','@color', '#FFF', '@word')",
      isCollected: "@boolean",
    },
  ],
  "likes|1-7": [
    {
      thingId: "@id",
      thingName: "@word",
      publicTime: "@datetime(yyyy MM dd)",
      isLike: true,
      likes: "@integer(1, 1000)",
      comments: "@integer(1, 1000)",
      url: "@image('300x200','@color', '#FFF', '@word')",
      isCollected: "@boolean",
    },
  ],
  userProfile: {
    designLevel: "Novice",
    using3DPrinter: ["B9Creations", "Afinia", " Airwolf 3D", "CEL"],
    who: ["Designer", "Engineer", "Maker"],
    designToolsUsed: ["123D Design", "Blender", "3D Tin"],
    industry: "",
    subindustry: "",
    introduction: "@word",
    location: "@word",
    website: "@url",
    paypal: "https://paypal.me/",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  },
});
let data = user.data;

let commentList = mock.mock({
  code: 0,
  "data|10": [
    {
      id: "@increment()",
      comment: "@sentence()",
      fromNickname: "@name",
      fromAvatar: "@image('40x40','@color', '#FFF', '@word')",
      datetime: "@datetime",
      "replyList|1-12": [
        {
          commentId: "@increment",
          comment: "@sentence()",
          fromNickname: "@name",
          fromAvatar: "@image('40x40','@color', '#FFF', '@word')",
          toNickname: "@name",
          toAvatar: "@image('40x40','@color', '#FFF', '@word')",
          datetime: "@datetime",
        },
      ],
    },
  ],
});

module.exports = [
  {
    url: "/user/list",
    type: "get",
    response: (req) => {
      let { currentPage, pageSize, subject, grade } = req.query;
      currentPage = Number(currentPage);
      pageSize = Number(pageSize);
      console.log(pageSize, currentPage, subject, grade);
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
      return {
        status: 200,
        message: "ok",
        data: temp,
        length: t1.length,
      };
    },
  },
  {
    url: "/auth/user/login",
    type: "post",
    response: (req) => {
      const { username, password } = req.query;
      console.log(username, password);
      loginData.expires_in = 259200;
      return {
        status: 200,
        code: 0,
        msg: "",
        data: loginData,
      };
    },
  },
  {
    url: "/user/getInfo",
    type: "get",
    response: () => {
      return {
        code: 0,
        data: getInfo,
      };
    },
  },
  {
    url: "/user/resetToken",
    type: "post",
    response: (req) => {
      const { username, password } = req.query;
      console.log(username, password);
      return {
        status: 200,
        data: resetTokenData,
      };
    },
  },
  {
    url: "/user/logout",
    type: "post",
    response: () => {
      return {
        code: 200,
        data: "success",
      };
    },
  },
  {
    url: "/user/getUserInfoByUserId",
    type: "get",
    response: (req) => {
      const { id, userId } = req.query;
      console.log("/user/getUserInfoByUserId", id, userId);
      return {
        status: 200,
        message: "ok",
        data: userInfoByUserId,
        length: userInfoByUserId.length,
      };
    },
  },
  {
    url: "/user/receiveImg",
    type: "post",
    response: (req) => {
      console.log(req.query);
      return {
        status: 200,
        message: "ok",
        url: "@image('300x200','@color', '#FFF', '@word')",
      };
    },
  },
  {
    url: "/user/updateProfile",
    type: "post",
    response: (req) => {
      console.log(req.query);
      userInfoByUserId.userProfile = req.query;
      return {
        status: 200,
        message: "ok",
      };
    },
  },
  {
    url: "/user/postUserMessage",
    type: "post",
    response: (req) => {
      console.log(req.query);
      return {
        status: 200,
        message: "ok",
      };
    },
  },
  {
    url: "/user/getFollowsByUserId",
    type: "get",
    response: (req) => {
      console.log("/user/getFollowsByUserId", req.query);
      let followData = mock.mock({
        "data|10": [
          {
            name: "@name",
            avatar: "@image('300x200','@color', '#FFF', '@word')",
            background: "@image('300x200','@color', '#FFF', '@word')",
            address: "@word",
            userId: "@id",
            designs: "@integer(1, 100)",
            makes: "@integer(1, 100)",
            collections: "@integer(1, 100)",
            isFollow: "@boolean",
          },
        ],
      });
      return {
        status: 200,
        message: "ok",
        data: followData,
      };
    },
  },
  {
    url: "/auth/user/register",
    type: "post",
    response: (req) => {
      const { username, password } = req.query;
      console.log(username, password);
      loginData.expires_in = 259200;
      return {
        status: 200,
        code: 0,
        msg: "",
        data: loginData,
      };
    },
  },
  {
    url: "/user/getCommentList",
    type: "post",
    response: () => {
      return commentList;
    },
  },
];
