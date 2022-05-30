import request from "@/utils/request";
export function getThingDetails(data) {
  return request({
    url: "/thing/detail",
    method: "get",
    data,
  });
}
export function getThingDownloadInfo(data) {
  return request({
    url: "/thing/downloadInfo",
    method: "get",
    data,
  });
}

export function getUserInfoByThingId(data) {
  return request({
    url: "/thing/getUserInfo",
    method: "get",
    data,
  });
}

export function getUserMakesByThingId(data) {
  return request({
    url: "/thing/getUserMakes",
    method: "get",
    data,
  });
}

export function getUserCommentsByThingId(data) {
  return request({
    url: "/thing/getUserComments",
    method: "get",
    data,
  });
}

export function getThingList(data) {
  return request({
    url: "/thing/getThingList",
    method: "get",
    data,
  });
}
