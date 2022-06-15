var mock = require("mockjs");
let data = mock.mock({
  "data|100": [
    {
      id: "@id",
      name: "@word",
      logo: "@image('300x200','@color', '#FFF', '@word')",
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
        id: "@id",
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
};

module.exports = groupMock;
