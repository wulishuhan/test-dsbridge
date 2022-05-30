import mock from "mockjs";

export const thingDetail = mock.mock("/thing/detail", "get", (options) => {
  let { thingId } = JSON.parse(options.body);
  console.log("mock thingDetail thingId", thingId);
  let data = mock.mock({
    id: "@id",
    "content|1-8": ["@word"],
    "tags|1-8": ["@word"],
    summary: "@paragraph",
    "topics|1-10000": 100,
    "things|1-10000": 100,
    "members|1-10000": 100,
  });
  return {
    status: 200,
    message: "ok",
    data: data,
    length: data.length,
  };
});

export const thingDownloadInfo = mock.mock(
  "/thing/downloadInfo",
  "get",
  (options) => {
    let { thingId } = JSON.parse(options.body);
    console.log("mock thingDownloadInfo thingId", thingId);
    let data = mock.mock({
      "data|10": [
        {
          id: "@id",
          url: "@image('300x200','@color', '@color', '@word')",
          name: "@word",
          downloadNumber: "@integer(0, 1000)",
          size: "@integer(0, 10)",
          updatedTime: "@datetime(yyyy MM dd)",
        },
      ],
    });
    return {
      status: 200,
      message: "ok",
      data: data.data,
      length: data.length,
    };
  }
);

export const thingGetUserInfoByThingId = mock.mock(
  "/thing/getUserInfo",
  "get",
  (options) => {
    let { thingId } = JSON.parse(options.body);
    console.log("mock thingGetUserInfoByThingId thingId", thingId);
    let data = mock.mock({
      id: "@id",
      avatar: "@image('300x200','@color', '#FFF', '@word')",
      thingName: "@word",
      publicTime: "@datetime(yyyy MM dd)",
      name: "@word",
      "image|3-10": [
        {
          id: "@id",
          url: "@image('300x200','@color', '#FFF', '@word')",
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

export const getUserMakesByThingId = mock.mock(
  "/thing/getUserMakes",
  "get",
  (options) => {
    let { thingId } = JSON.parse(options.body);
    console.log("mock getUserMakesByThingId thingId", thingId);
    let data = mock.mock({
      "makes|1-13": [
        {
          id: "@id",
          uid: "@id",
          avatar: "@image('300x200','@color', '#FFF', '@word')",
          name: "@word",
          thingName: "@word",
          publicTime: "@datetime(yyyy MM dd)",
          url: "@image('300x200','@color', '#FFF', '@word')",
          likes: "@integer(60, 1000)",
          comments: "@integer(60, 1000)",
          isLike: "@boolean",
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

export const getUserCommentsByThingId = mock.mock(
  "/thing/getUserComments",
  "get",
  (options) => {
    let { thingId } = JSON.parse(options.body);
    console.log("mock getUserMakesByThingId thingId", thingId);
    let comments = [
      {
        id: "1",
        uid: mock.mock("@id"),
        pid: "0",
        thingId: mock.mock("@id"),
        avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
        name: mock.mock("@word"),
        publicTime: mock.mock("@datetime(yyyy MM dd)"),
        comment: mock.mock("@sentence()"),
      },
      {
        id: "2",
        uid: mock.mock("@id"),
        pid: "1",
        thingId: mock.mock("@id"),
        avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
        name: mock.mock("@word"),
        publicTime: mock.mock("@datetime(yyyy MM dd)"),
        comment: mock.mock("@sentence()"),
      },
      {
        id: "3",
        uid: mock.mock("@id"),
        pid: "2",
        thingId: mock.mock("@id"),
        avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
        name: mock.mock("@word"),
        publicTime: mock.mock("@datetime(yyyy MM dd)"),
        comment: mock.mock("@sentence()"),
      },
      {
        id: "4",
        uid: mock.mock("@id"),
        pid: "2",
        thingId: mock.mock("@id"),
        avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
        name: mock.mock("@word"),
        publicTime: mock.mock("@datetime(yyyy MM dd)"),
        comment: mock.mock("@sentence()"),
      },
      {
        id: "5",
        uid: mock.mock("@id"),
        pid: "0",
        thingId: mock.mock("@id"),
        avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
        name: mock.mock("@word"),
        publicTime: mock.mock("@datetime(yyyy MM dd)"),
        comment: mock.mock("@sentence()"),
      },
      {
        id: "6",
        uid: mock.mock("@id"),
        pid: "5",
        thingId: mock.mock("@id"),
        avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
        name: mock.mock("@word"),
        publicTime: mock.mock("@datetime(yyyy MM dd)"),
        comment: mock.mock("@sentence()"),
      },
      {
        id: "7",
        uid: mock.mock("@id"),
        pid: "5",
        thingId: mock.mock("@id"),
        avatar: mock.mock("@image('300x200','@color', '#FFF', '@word')"),
        name: mock.mock("@word"),
        publicTime: mock.mock("@datetime(yyyy MM dd)"),
        comment: mock.mock("@sentence()"),
      },
    ];

    return {
      status: 200,
      message: "ok",
      data: comments,
      length: comments.length,
    };
  }
);

export const getThingList = mock.mock(
  "/thing/getThingList",
  "get",
  (options) => {
    let { currentPage, pageSize } = JSON.parse(options.body);
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    let mockData = mock.mock({
      "things|100-200": [
        {
          thingId: "@id",
          userId: "@id",
          avatar: "@image('300x200','@color', '#FFF', '@word')",
          userName: "@word",
          thingName: "@word",
          publicTime: "@datetime(yyyy MM dd)",
          url: "@image('300x200','@color', '#FFF', '@word')",
          likes: "@integer(60, 1000)",
          isLike: "@boolean",
        },
      ],
    });
    let data = [];
    for (let i = start; i < end; i++) {
      data.push(mockData.things[i]);
    }
    return {
      status: 200,
      message: "ok",
      data: data,
      length: mockData.things.length,
    };
  }
);
