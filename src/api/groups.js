import request from "@/utils/request";
export function getGroupsList(params) {
  return request({
    url: "/groups/list",
    method: "get",
    params,
  });
}
