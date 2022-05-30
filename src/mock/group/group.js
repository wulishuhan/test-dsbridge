import mock from "mockjs";

export const getGroupsList = mock.mock("/groups/list", "get", (options) => {
  let { currentPage, pageSize } = JSON.parse(options.body);
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
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
  let temp = [];
  for (let i = start; i < end; i++) {
    temp.push(data.data[i]);
  }
  return {
    status: 200,
    message: "ok",
    data: temp,
    length: data.length,
  };
});
