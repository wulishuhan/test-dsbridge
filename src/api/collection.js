import request from "@/utils/request";
export function getCollectionList(params) {
  return request({
    url: "/library/collection/list",
    method: "get",
    params,
  });
}
export function addCollection(data) {
  return request({
    url: "/library/collection",
    method: "post",
    data,
  });
}
export function addResourceToCollection(data) {
  return request({
    url: `/library/collection/${data.collectionId}/resource/${data.resourceId}`,
    method: "post",
    data,
  });
}
export function getCollectionResourceList(params) {
  return request({
    url: `/library/collection/resource/list`,
    method: "get",
    params,
  });
}
export function deleteCollectionResource(params) {
  return request({
    url: `/library/collection/${params.collectionId}/resource/${params.resourceId}`,
    method: "delete",
  });
}
