import request from "../utils/request";
/**
 * 获取mv详情
 */
const getMVDetail = (id: number) => request(`/mv/url?id=${id}`, 'GET')

export {
  getMVDetail
}