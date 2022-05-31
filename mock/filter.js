var mock = require("mockjs");

let data = mock.mock({
  "list|20": [
    {
      value: "@name",
      label: "@name",
      "children|1-15": [
        {
          value: "@name",
          label: "@name",
          "children|0-5": [
            {
              value: "@name",
              label: "@name",
            },
          ],
        },
      ],
    },
  ],
});
const filterMock = function (app) {
  app.get("/select/type", function (req, res) {
    res.json({
      status: 200,
      message: "ok",
      data: data,
    });
  });
};

module.exports = filterMock;
