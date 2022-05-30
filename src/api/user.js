import request from "@/utils/request";
export function getUserList(data) {
  return request({
    url: "/user/list",
    method: "get",
    data,
  });
}
export function Login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function Logout(data) {
  return request({
    url: "/user/logout",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    // url: '/userApi/oauth/userinfos',
    url: "/user/getInfo",
    method: "get",
    headers: { Authorization: "Bearer " + token },
  });
}

export function refresh() {
  return request({
    // url: '/userApi/oauth/userinfos',
    url: "/user/refresh",
    method: "post",
  });
}

export function getUserInfoByUserId(data) {
  return request({
    url: "/user/getUserInfoByUserId",
    method: "get",
    data,
  });
}
