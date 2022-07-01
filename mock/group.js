const mock = require("mockjs");
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
let groupInfo = mock.mock({
  groupId: "@id",
  groupName: "@word",
  groupImg: "@image('300x200','@color', '#FFF', '@word')",
  isJoinGroup: "@boolean()",
  topics: "@integer(1,1000)",
  things: "@integer(1,1000)",
  members: "@integer(1,1000)",
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
module.exports = [
  {
    url: "/groups/list",
    type: "get",
    response: (req) => {
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
      return {
        status: 200,
        message: "ok",
        data: temp,
        length: data.data.length,
      };
    },
  },
  {
    url: "/groups/members",
    type: "get",
    response: (req) => {
      console.log(req.query);
      let { currentPage, pageSize } = req.query;
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
        console.error("Bad Pagination");
      } else {
        return {
          status: 200,
          message: "ok",
          data: temp,
          length: members.data.length,
        };
      }
    },
  },
  {
    url: "/groups/info",
    type: "get",
    response: (req) => {
      console.log(req.query);
      return {
        status: 200,
        message: "ok",
        data: groupInfo,
      };
    },
  },
  {
    url: "/groups/thingsInfo",
    type: "get",
    response: (req) => {
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
        console.error("Bad Pagination");
      } else {
        return {
          status: 200,
          message: "ok",
          data: temp,
          length: groupThingsInfo.data.length,
        };
      }
    },
  },
  {
    url: "/groups/groupAboutInfo",
    type: "get",
    response: (req) => {
      console.log(req.query);
      console.log(groupAboutInfo);
      return {
        status: 200,
        message: "ok",
        data: groupAboutInfo,
      };
    },
  },
  {
    url: "/groups/changeUserGroup",
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
    url: "/groups/createGroup",
    type: "post",
    response: (req) => {
      console.log(req.query);
      return {
        status: 200,
        message: "ok",
      };
    },
  },
];
