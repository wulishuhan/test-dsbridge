/* eslint-disable */
module.exports = [
  {
    url: "/test/test",
    type: "get",
    response: (req) => {
      console.log(req.query);
      return {
        status: 200,
        data: "data",
        a: "abc",
      };
    },
  },
];
