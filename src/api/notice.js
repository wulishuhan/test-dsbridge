import request from "@/utils/request";
export function getAllList(data) {
  return request({
    url: "/select/type",
    method: "get",
    data,
  });
}
export function getSystemList(data) {
  return request({
    url: "/select/type",
    method: "get",
    data,
  });
}
export function getCommentList(data) {
  return request({
    url: "/select/type",
    method: "get",
    data,
  });
}
export function getFollowList(data) {
  return request({
    url: "/select/type",
    method: "get",
    data,
  });
}
