import request from "@/utils/request";
export function getUserList(params) {
  return request({
    url: "/user/list",
    method: "get",
    params,
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

export function getUserInfoByUserId(params) {
  return request({
    url: "/user/getUserInfoByUserId",
    method: "get",
    params,
  });
}

export function updateUserProfile(params) {
  return request({
    url: "/user/updateProfile",
    method: "post",
    params,
  });
}

export function postUserMessage(params) {
  return request({
    url: "/user/getMessage",
    method: "post",
    params,
  });
}

export function findFollowsByUserId(params) {
  return request({
    url: "/user/getFollowsByUserId",
    method: "get",
    params,
  });
}
