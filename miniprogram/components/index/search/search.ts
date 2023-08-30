// components/search/search.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
    toSearch() {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    },
  }
})
