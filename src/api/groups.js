import request from "@/utils/request";
export function getGroupsList(params) {
  return request({
    url: "/groups/list",
    method: "get",
    params,
  });
}

export function getGroupsMembers(params) {
  return request({
    url: "/groups/members",
    method: "get",
    params,
  });
}
