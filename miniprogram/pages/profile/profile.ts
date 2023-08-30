// pages/profile/profile.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  choseLocation() {
    wx.chooseLocation({

    })
  },
  address() {
    wx.chooseAddress()
  },
  getinfo() {
    wx.login({
      success(res) {
        console.log(res);

      }
    })
  }
})