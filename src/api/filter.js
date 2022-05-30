import request from "@/utils/request";
export function getTypeFilter(data) {
  return request({
    url: "/select/type",
    method: "get",
    data,
  });
}
