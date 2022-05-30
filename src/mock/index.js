import mock from "mockjs";
/* eslint-disable  */
import  "./group/group";
import  "./user/user";
import  "./thing/thing";

mock.mock("/select/type", "get", () => {
  return {
    status: 200,
    message: "ok",
    data: mock.mock({
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
    }),
  };
});
