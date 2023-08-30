// components/index/hotlist/hotlist.ts
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    HotList: Array
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
    tosonglist(e: any) {
      console.log(e.currentTarget.dataset.id);
      app.globalData.bangdanID = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/songlist/songlist?id=${e.currentTarget.dataset.id}`
      })
    }
  }
})
export { }
