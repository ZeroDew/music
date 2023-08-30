// pages/songlist/songlist.ts
import { getSongList, getSonger } from '../../api/songlist'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverImg: '',
    hotList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option: any) {
    if (option.id) {
      this.getHotList(option.id, 'bangdan')
    }
    if (option.songerid) {
      this.getHotList(option.songerid, 'songer')
    }

  },
  /**
   * 获取热门榜单详情
   */
  async getHotList(id: number, method: 'bangdan' | 'songer') {
    if (method == 'bangdan') {
      let songList = await getSongList(id) as { playlist: { tracks: [{ al: { picUrl: string } }] }, privileges: [] }
      console.log(songList.playlist.tracks);

      this.setData({
        coverImg: songList.playlist.tracks[0].al.picUrl,
        hotList: (songList.playlist.tracks as any)
      }, () => {
        wx.setStorageSync('musicList', this.data.hotList)
      })
    }
    else {
      let songerList = await getSonger(id) as { songs: [{ al: { picUrl: string } }] }
      console.log(songerList.songs);
      this.setData({
        coverImg: songerList.songs[0].al.picUrl,
        hotList: (songerList.songs as any)
      }, () => {
        wx.setStorageSync('musicList', this.data.hotList)
      })
    }

  },

  tosonglist(e: any) {
    app.globalData.playingID = e.currentTarget.dataset.id
    wx.switchTab({
      url: `/pages/playing/playing`
    })
  },
  /**
   * 随机歌曲
   */
  randomSong() {
    const randomIdx = Math.floor(Math.random() * this.data.hotList.length)
    wx.setStorageSync('randomIndex', randomIdx)
    wx.switchTab({
      url: '/pages/playing/playing'
    })
  }
})