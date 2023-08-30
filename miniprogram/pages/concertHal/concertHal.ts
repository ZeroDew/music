// pages/concertHal/concertHal.ts
import { getSong } from "../../api/concretHal";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: -1,
    area: -1,
    initial: '-1',
    artists: [],
    searchType: ['热', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getSongerList()
  },

  async getSongerList() {
    let { type, area, initial } = this.data

    let songerList = await getSong(type, area, initial) as { artists: [] }
    this.setData({
      artists: songerList.artists
    })
  },

  search(e: any) {
    if (e.target.dataset.keywords == '热')
      this.setData({
        initial: '-1'
      }, () => {
        this.getSongerList()
      })
    else {
      this.setData({
        initial: e.target.dataset.keywords
      }, () => {
        this.getSongerList()
      })
    }

  }
  , todetail(e: any) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: `/pages/songlist/songlist?songerid=${e.currentTarget.dataset.id}`
    })
  },
})