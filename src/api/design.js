import request from "@/utils/request";

export function getResourceList(params) {
  return request({
    url: `/thing/getThingList`,
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
