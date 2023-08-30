import request from '../utils/request'

/**
 * 获取热门搜索
 */
const getHotSearch = () => request('/search/hot', 'GET')

/**
 * 搜索歌曲
 */
const searchSong = (keywords: string) => request(`/search/suggest?keywords=${keywords}`, 'GET')

export {
  getHotSearch,
  searchSong
}