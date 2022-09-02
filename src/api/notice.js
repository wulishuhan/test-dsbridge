import request from "@/utils/request";
export function getAllList(data) {
  return request({
    url: "/select/type",
    method: "get",
    data,
  });
}
export function follow(params) {
  return request({
    url: `/library/follower`,
    method: "post",
    params,
  });
}
