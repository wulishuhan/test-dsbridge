import request from "@/utils/request";

export function addCollection(data) {
  return request({
    url: `/library/collection`,
    method: "post",
    data,
  });
}
export function deleteCollection(params) {
  return request({
    url: `/library/collection/${params.collectionId}`,
    method: "delete",
  });
}
export function getCollectList(params) {
  return request({
    url: `/library/collection/list`,
    method: "get",
    params,
  });
}
export function getCollectResourceList(params) {
  return request({
    url: `/library/collection/${params.collectionId}/resource/list`,
    method: "get",
    params,
  });
}
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
