import request from "@/utils/request";
export function save(params) {
  return request({
    url: `library/resource`,
    method: "post",
    params,
  });
}
