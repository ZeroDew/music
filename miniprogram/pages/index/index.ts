// index.ts
// 获取应用实例
import { getBanners, getHotList, getHotMV } from '../../api/index'

Page({
  data: {
    Banners: [],
    HotList: [],
    hotMV: [],
    limit: 10,
    offset: 1
  },
  async onLoad() {
    let { limit, offset } = this.data
    let Banners: any = await getBanners();
    let hotList: any = await getHotList();
    let hotMVList: any = await getHotMV(limit, offset)


    this.setData({
      Banners: Banners.banners,
      HotList: hotList.list.slice(0, 4),
      hotMV: hotMVList.data
    })

  },
  onReachBottom() {
    let { limit, offset, hotMV } = this.data
    this.setData({
      offset: limit + offset
    }, async () => {
      let hotMVList: any = await getHotMV(limit, offset)
      if (hotMVList.data) {
        this.setData({
          hotMV: hotMV.concat(hotMVList.data)
        })
      }
    })
  }
})
