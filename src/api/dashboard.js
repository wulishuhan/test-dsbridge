import request from "@/utils/request";

export function getActivityList(params) {
  return request({
    url: `/dashboard/getActivityList`,
    method: "get",
    params,
  });
}
