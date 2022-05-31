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
      length: data.length,
    });
  });
};

module.exports = groupMock;
