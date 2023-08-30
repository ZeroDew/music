// components/index/hotmv/hotmv.ts
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotMV: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e: any) {
      // app.globalData.playingID = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/mvdetail/mvdetail?id=${e.currentTarget.dataset.id}`
      })
    }
  }
})
export { }