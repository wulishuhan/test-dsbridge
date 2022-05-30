import mock from "mockjs";
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
      like: /\d{1,4}/,
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
      "followers|1-10000": 100,
      "following|1-10000": 100,
      "designs|1-100": 100,
      address: "@word()",
      isLike: "@boolean",
    },
  ],
});

let data = user.data;
export const getUserList = mock.mock("/user/list", "get", (options) => {
  const { currentPage, pageSize, subject, grade } = JSON.parse(options.body);
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
  return {
    status: 200,
    message: "ok",
    data: temp,
    length: t1.length,
  };
});

export const login = mock.mock("/user/login", "post", (options) => {
  const { username, password } = JSON.parse(options.body);
  console.log(username, password);
  return {
    status: 200,
    data: mock.mock({
      name: "@name",
      avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
      token: /(\w\W\d){10,15}/,
      roles: ["user"],
      userId: "@id",
    }),
  };
});

export const getInfo = mock.mock("/user/getInfo", "post", (options) => {
  const { username, password } = JSON.parse(options.body);
  console.log(username, password);
  return {
    status: 200,
    data: mock.mock({
      name: "@name",
      avatar: "@image('300x200','@color', '#FFF', '@word')",
      token: /(\w\W\d){10,15}/,
      roles: ["user"],
      id: "@id",
    }),
  };
});

export const resetToken = mock.mock("/user/resetToken", "post", (options) => {
  const { username, password } = JSON.parse(options.body);
  console.log(username, password);
  return {
    status: 200,
    data: mock.mock({
      name: "@name",
      avatar: "@image('300x200','@color', '#FFF', '@word')",
      token: /(\w\W\d){10,15}/,
      roles: ["user"],
    }),
  };
});

export const logout = mock.mock("/user/logout", "post", () => {
  return {
    code: 200,
    data: "success",
  };
});

export const getUserInfoByUserId = mock.mock(
  "/user/getUserInfoByUserId",
  "get",
  (options) => {
    let { id } = JSON.parse(options.body);
    console.log("mock getUserInfoByUserId id", id);
    let data = mock.mock({
      id: "@id",
      avatar: "@image('300x200','@color', '#FFF', '@word')",
      name: "@word",
      background: "@image('300x200','@color', '#FFF', '@word')",
      publicTime: "@datetime(yyyy MM dd)",
      followers: "@integer(60, 1000)",
      following: "@integer(60, 1000)",
      designs: "@integer(1, 30)",
      "design|1-7": [
        {
          id: "@id",
          thingName: "@word",
          publicTime: "@datetime(yyyy MM dd)",
          isLike: "@boolean",
          likes: "@integer(1, 1000)",
          comments: "@integer(1, 1000)",
          uploadImg: "@image('300x200','@color', '#FFF', '@word')",
        },
      ],
    });
    return {
      status: 200,
      message: "ok",
      data: data,
      length: data.length,
    };
  }
);
