import request from "@/utils/request";
export function getGroupsList(data) {
  return request({
    url: "/groups/list",
    method: "get",
    data,
  });
}
