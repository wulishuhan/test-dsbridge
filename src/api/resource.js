import request from "@/utils/request";
export function saveResource(data) {
  return request({
    url: `library/resource`,
    method: "post",
    data,
  });
}
export function getResource(id) {
  return request({
    url: `library/resource/detail/${id}`,
    method: "get",
  });
}
export function updateResource(data) {
  return request({
    url: `library/resource`,
    method: "put",
    data,
  });
}
export function getResourceList(params) {
  return request({
    url: `/library/resource/search`,
    method: "get",
    params,
  });
}
export function getResourceListById(params) {
  return request({
    url: `/library/resource/list`,
    method: "get",
    params,
  });
}
export function getResourceTags(params) {
  return request({
    url: `/library/tag/list`,
    method: "get",
    params,
  });
}

export function downloadResourceFile(fileId) {
  return request({
    url: `/library/resource/download/${fileId}`,
    responseType: "blob",
    method: "get",
    headers: {
      Referer:
        "https://api.leadiffer.cn/swagger-ui/index.html?urls.primaryName=ortur-library",
      origin: "*",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export function testDownload() {
  return request({
    url: `/test/download`,
    method: "get",
  });
}
