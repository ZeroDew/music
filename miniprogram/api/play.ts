import request from "../utils/request";

/**
 * 获取音乐地址
 */
const getSongUrl = (id: number) => request(`/song/url?id=${id}`, 'GET')

/**
 * 获取音乐歌词
 */
const getIyric = (id: number) => request(`/lyric?id=${id}`, 'GET')

export {
  getSongUrl,
  getIyric
}