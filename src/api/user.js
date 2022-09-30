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
    url: "/auth/user/login",
    method: "post",
    data,
  });
}

export function Logout(data) {
  return request({
    url: "/auth/user/logout",
    method: "delete",
    data,
  });
}

export function getUserInfo() {
  return request({
    url: "/system/user/getUserInfo",
    method: "get",
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
    url: "/user/postUserMessage",
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
export function getFollowingList(params) {
  return request({
    url: `/library/follower/followings`,
    method: "get",
    params,
  });
}
export function register(data) {
  return request({
    url: "/auth/user/register",
    method: "post",
    data,
  });
}

export function getCommentList(params) {
  return request({
    url: "/library/comment/list",
    method: "get",
    params,
  });
}

export function getCommentListFromId(comemntId) {
  return request({
    url: `/library/comment/detail/${comemntId}`,
    method: "get",
  });
}

export function postComment(data) {
  return request({
    url: "/library/comment",
    method: "post",
    data,
  });
}

export function getMakeList(params) {
  return request({
    url: "/library/comment/make/list",
    method: "get",
    params,
  });
}

export function getMakeDetail(params) {
  return request({
    url: `/library/comment/detail/${params.commentId}`,
    method: "get",
  });
}

export function getCommentUploadS3Url(data) {
  return request({
    url: "/library/comment/uploadS3",
    method: "post",
    data,
  });
}

export function openLogin(data) {
  return request({
    url: "/auth/user/openLogin",
    method: "post",
    data,
  });
}

export function bindThird(data) {
  return request({
    url: "/system/user/bindThird",
    method: "post",
    data,
  });
}
export function unbindThird(data) {
  return request({
    url: "/system/user/unbindThird",
    method: "post",
    data,
  });
}

export function activeUserSendEmail(data) {
  return request({
    url: "/auth/user/active",
    method: "post",
    data,
  });
}

export function activeAccount(data) {
  return request({
    url: "/auth/user/active",
    method: "post",
    data,
  });
}

export function resetPasswordSendEmail(data) {
  return request({
    url: "/auth/user/reset",
    method: "post",
    data,
  });
}

export function openRegister(data) {
  return request({
    url: "/auth/user/openRegister",
    method: "post",
    data,
  });
}
