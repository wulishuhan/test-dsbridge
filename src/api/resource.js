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
