const mock = require("mockjs");
let designer = mock.mock({
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
      like: /\d{1,4}/,
      "followers|1-100": 100,
      "following|1-100": 100,
      "designs|1-100": 100,
      address: "@word()",
      isLike: "@boolean",
      isFollow: "@boolean",
    },
  ],
});

let data = designer.data;
module.exports = [
  {
    url: "/designer/list",
    type: "get",
    response: (req) => {
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
      return {
        status: 200,
        message: "ok",
        data: temp,
        length: t1.length,
      };
    },
  },
  {
    url: "/designer/unfollowDesigner",
    type: "get",
    response: (req) => {
      let { designerId, userId } = req.query;
      console.log("/designer/unfollowDesigner", designerId, userId);
      return {
        status: 200,
        message: "success",
      };
    },
  },
  {
    url: "/designer/followDesigner",
    type: "get",
    response: (req) => {
      let { designerId, userId } = req.query;
      console.log("/designer/followDesigner", designerId, userId);
      return {
        status: 200,
        message: "success",
      };
    },
  },
];
