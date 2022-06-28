var mock = require("mockjs");
const activityMock = function (app) {
  let activityListData = mock.mock({
    "things|100-200": [
      {
        id: "@id",
        thingId: "@id",
        userId: "@id",
        avatar: "@image('300x200','@color', '#FFF', '@word')",
        userName: "@word",
        thingName: "@word",
        publicTime: "@datetime(yyyy MM dd)",
        url: "@image('300x200','@color', '#FFF', '@word')",
        likes: "@integer(60, 1000)",
        isLike: "@boolean",
        isCollected: "@boolean",
        comments: "@integer(60, 1000)",
      },
    ],
  });
  app.get("/dashboard/getActivityList", function (req, res) {
    // let data = [];
    // for (let i = 0; i < activityListData.things.length; i++) {
    //   data.push(activityListData.things[i]);
    // }
    res.json({
      status: 200,
      message: "ok",
      data: activityListData.things,
      length: 10,
    });
  });
};
module.exports = activityMock;
