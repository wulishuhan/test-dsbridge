import request from "@/utils/request";
export function getCatelogList(params) {
  return request({
    url: "/open/faq/type/list",
    method: "get",
    params,
  });
}

export function getFaqCommonList(params) {
  return request({
    url: "/open/faq/listCommon",
    method: "get",
    params,
  });
}

export function getFaqDetail(id) {
  return request({
    url: `/open/faq/${id}`,
    method: "get",
  });
}

export function getFaqList(params) {
  return request({
    url: `/open/faq/list`,
    method: "get",
    params: params,
  });
}

export function feedback(params) {
  return request({
    url: `/open/faq/feedback`,
    method: "post",
    params: params,
  });
}

export function search(params) {
  return request({
    url: `/open/faq/search`,
    method: "get",
    params: params,
  });
}
