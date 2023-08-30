// pages/search/search.ts
import { getHotSearch, searchSong } from "../../api/search";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSearch: [],
    searchResult: [],
    keywords: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getHotSeatch()
  },

  /**
   * 获取热门搜索数据
   */
  async getHotSeatch() {
    let hotSearchList = await getHotSearch() as { result: { hots: [] } }
    this.setData({
      hotSearch: hotSearchList.result.hots
    })
  },
  itemSearch(e: any) {
    this.setData({
      keywords: e.target.dataset.item
    })
    this.getSearchSongs(e.target.dataset.item);

  },

  /**
   * 搜索
   */
  searchHandle(e: any) {
    this.getSearchSongs(e.detail.value);
  },


  /**
   * 获取搜索歌曲列表
   */
  async getSearchSongs(val: string) {
    let searchSongList = await searchSong(val) as { result: { songs: [] }, code: number }
    if (searchSongList.result) {
      this.setData({
        searchResult: searchSongList.result.songs
      })
    } else {
      this.setData({
        searchResult: []
      })
    }
  },
  playSong(e: any) {

    app.globalData.playingID = e.currentTarget.dataset.id
    wx.setStorageSync('musicList', this.data.searchResult)
    wx.switchTab({
      url: '/pages/playing/playing'
    })

  }
})