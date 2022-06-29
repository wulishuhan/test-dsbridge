const mock = require("mockjs");
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
module.exports = [
  {
    url: "/select/type",
    type: "get",
    response: (req) => {
      console.log(req.query);
      return {
        status: 200,
        message: "ok",
        data: data,
      };
    },
  },
];
