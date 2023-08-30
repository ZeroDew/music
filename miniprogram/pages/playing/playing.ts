import { getSongUrl, getIyric } from "../../api/play";
const app = getApp()
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    isPlaying: true,
    currentTime: 0,
    songLength: 0,
    musicList: [],
    songInfo: {},
    lyric: {
      time: [],
      con: ['']
    },
    songUrl: '',
    playmode: 'defalut',
    playIndex: 0,
    timer: null,//获取时间定时器
    showdialog: false,
    iyricIndex: 0,//当前歌词索引
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    if (wx.getStorageSync('randomIndex')) {
      this.setData({
        playIndex: wx.getStorageSync('randomIndex')
      })
      this.getSongInfo(this.data.playIndex)
    }
    this.defaultSong()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (wx.getStorageSync('musicList')) {
      this.setData({
        musicList: wx.getStorageSync('musicList')
      })
    }
    if (app.globalData.playingID) {
      this.setData({
        id: app.globalData.playingID,
        isPlaying: true
      }, () => {
        this.getSongIdx(this.data.id)
      })
    } else {
      this.setData({
        isPlaying: false
      })
    }
    this.backgroundAudioChange()
  },

  /**
   * 根据id获取播放音乐索引
   */
  getSongIdx(id: number) {

    let idx = this.data.musicList.findIndex((ele: { al: { id: number } | undefined, id: number }) => {
      return ele.al?.id == id || ele.id == id
    })

    this.setData({
      playIndex: idx
    }, () => {
      this.getSongInfo(this.data.playIndex)
    })
  },
  /**
   * 根据索引获取播放音乐信息
   */
  getSongInfo(idx: number) {
    let res = this.data.musicList[idx] as { id: number }
    this.setData({
      songInfo: res
    }, () => {
      this.getSongUrl(res.id);
      this.getSongLyric(res.id)
      this.getSongTime()
    })
  },
  /**
   * 获取歌曲时间
   */
  getSongTime() {
    clearInterval((this as any).data.timer);
    (this as any).data.timer = setInterval(() => {
      this.setData({
        currentTime: backgroundAudioManager.currentTime,
        songLength: backgroundAudioManager.duration,
      })
    }, 1000)
  },
  /**
   * 获取歌词
   */
  async getSongLyric(id: number) {
    let songIyric = await getIyric(id) as { lrc: { lyric: string } }
    let songIyricList = songIyric.lrc.lyric.split('[').map(ele => ele.split(']'))
    let time: any = songIyricList.map(ele => {
      return ele[0].split(":")
    })
    time = time.map((ele: any) => ele[0] * 60 + Math.round(ele[1]))
    let con = songIyricList.map(ele => ele[1])
    time.shift()
    con.shift()
    this.setData({
      lyric: {
        time,
        con
      }
    })
  },
  /**
   * 获取音乐地址
   */
  async getSongUrl(id: number) {
    let res = await getSongUrl(id) as { data: [{ url: string }] }
    if (res.data[0].url) {
      this.setData({
        songUrl: res.data[0].url
      }, () => {
        this.playAudio()
      })
    } else {
      wx.showToast({
        title: '歌曲没有版权',
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.navigateTo({
              url: `/pages/songlist/songlist?id=${app.globalData.bangdanID}`
            })
          }, 3000);

        }
      })
    }
  },
  /**
   * 播放音乐
   */
  playAudio() {
    backgroundAudioManager.title = (this.data.songInfo as { name: string }).name
    backgroundAudioManager.src = this.data.songUrl;
    this.setData({
      isPlaying: true
    })
  },
  /**
   * 暂停音乐
   */
  pauseAudio() {
    backgroundAudioManager.pause()
    this.setData({
      isPlaying: false
    })
  },
  /**
   * 上一首
   */
  perv() {
    if (this.data.playIndex == 0) {
      this.setData({
        playIndex: this.data.musicList.length
      })
    }
    this.setData({
      playIndex: this.data.playIndex - 1
    }, () => {
      this.getSongInfo(this.data.playIndex)
      this.playAudio()
    })
  },
  /**
   * 下一首
   */
  next() {


    if (this.data.playIndex == this.data.musicList.length - 1) {
      this.setData({
        playIndex: -1
      })
    }
    this.setData({
      playIndex: this.data.playIndex + 1
    }, () => {
      this.getSongInfo(this.data.playIndex)
      this.playAudio()
    })
  },
  /**
   * 循环播放
   */
  loopSong() {
    backgroundAudioManager.onEnded(() => {
      this.playAudio()
    })

  },
  /**
   * 随机播放
   */
  randonSong() {
    backgroundAudioManager.onEnded(() => {
      const randomIndex = Math.floor(Math.random() * this.data.musicList.length)
      this.getSongInfo(randomIndex)
    })
  },
  /**
   * 顺序播放
   */
  defaultSong() {
    backgroundAudioManager.onEnded(() => {
      this.next()
    })
  },
  /**
   * 获取播放模式
   */
  getMode(e: any) {
    this.setData({
      playmode: e.detail
    })
  },
  /**
   * 点击菜单栏
   */
  changeMode() {
    switch (this.data.playmode) {
      case 'random':
        this.randonSong()
        break;
      case 'loop':
        this.loopSong()
        break;
      case 'defalut':
        this.defaultSong()
        break;
      case 'next':
        this.next()
        break;
      case 'prev':
        this.perv()
        break;
      case 'play':
        this.playAudio()
        break;
      case 'pause':
        this.pauseAudio()
        break;
      default:
        break;
    }
  },
  /**
   * 显示列表
   */
  showdialog() {
    this.setData({
      showdialog: !this.data.showdialog
    })
  },
  /**
   * 用户点击列表改变歌曲
   */
  changeSong(e: any) {
    let idx = e.currentTarget.dataset.index
    this.setData({
      playIndex: idx,
      showdialog: false
    })
    this.getSongInfo(idx)
    this.playAudio()
  },
  /**
   * 关闭列表
   */
  close() {
    this.setData({
      showdialog: !this.data.showdialog
    }
    )
  },
  /**
   * 用户改变歌曲
   */
  userChangeSong(e: any) {
    this.setData({
      currentTime: e.detail
    }, () => {
      backgroundAudioManager.seek(e.detail)
    })
  },
  /**
   * 监听音频播放进度改变
   */
  backgroundAudioChange() {
    backgroundAudioManager.onTimeUpdate(() => {
      let idx = this.data.lyric.time.findIndex((ele, index) => {
        return backgroundAudioManager.currentTime >= ele && backgroundAudioManager.currentTime <= this.data.lyric.time[index + 1];
      })
      this.setData({
        iyricIndex: idx
      })
    })
  }

})