import request from "@/utils/request";
export function getResourceList(params) {
  return request({
    url: `/library/resource/search`,
    method: "get",
    params,
  });
}
