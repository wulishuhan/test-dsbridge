import request from "@/utils/request";
export function getAllList(data) {
  return request({
    url: "/select/type",
    method: "get",
    data,
  });
}
export function changeName(data) {
  return request({
    url: `system/user/changeUserInfo`,
    method: "post",
    data,
  });
}
export function changePassword(data) {
  return request({
    url: `system/user/changePassword`,
    method: "post",
    data,
  });
}

export function changeEmail(data) {
  return request({
    url: `system/user/changeEmail`,
    method: "post",
    data,
  });
}
