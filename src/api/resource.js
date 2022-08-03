import request from "@/utils/request";
export function getResourceList(data) {
  return request({
    url: `/library/resource/list`,
    method: "get",
    data,
  });
}
