import request from '../utils/request'

/**
 * 获取轮播图数据
 */
const getBanners = () => request('/banner?type=1', "GET")


/**
 * 获取热门榜单列表
 */
const getHotList = () => request('/toplist/detail', 'GET')

/**
 * 获取热门MV推荐
 */
const getHotMV = (limit: number = 10, offset: number = 1) => request(`/top/mv?limit=${limit}&offset=${offset}`, 'GET')

export {
  getBanners,
  getHotList,
  getHotMV
}