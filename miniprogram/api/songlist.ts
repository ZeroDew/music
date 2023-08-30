import request from '../utils/request'

/**
 * 获取热门榜单详情
 */
const getSongList = (id: number) => request(`/playlist/detail?id=${id}`, 'GET')
/**
 * 获取歌手热门歌单
 */
const getSonger = (id: number) => request(`/artist/top/song?id=${id}`, 'GET')

export {
  getSongList,
  getSonger
}