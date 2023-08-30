import request from "../utils/request";

/**
 * 获取歌手
 *@param type   (类型 -1表示全部)
 *@param area   (国家 -1表示全部)
 *@param initial  (歌手首字母 -1表示热门歌手)
 */
const getSong = (type: number, area: number, initial: string) => request(`/artist/list?type=${type}&area=${area}1&initial=${initial}`, 'GET')


export {
  getSong
}
