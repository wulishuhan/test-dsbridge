import request from "@/utils/request";

export function getResourceList(params) {
  return request({
    url: `/library/resource/list`,
    method: "get",
    params,
  });
}
export function getLikesList(params) {
  return request({
    url: `/library/like/list`,
    method: "get",
    params,
  });
}

export function updateDiy(params) {
  return request({
    url: `/thing/changeCollect`,
    method: "post",
    params,
  });
}
