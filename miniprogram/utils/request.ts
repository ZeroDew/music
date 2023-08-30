import baseUrl from './base-url'

const request = (url: string, method: 'GET' | 'POST', data?: object) => {
  //如果需要token认证
  // let token = wx.getStorageSync('token')
  //显示加载中
  wx.showLoading({
    title: "加载中"
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method: method,
      data,
      timeout: 12000,
      header: {
        "content-type": "appliaction/json",
        // "Authoriation": token //把token放在请求头
      },
      success: (res) => {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: (err) => {
        wx.hideLoading()
        reject(err)
      }
    })
  })
}

export default request