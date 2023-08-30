// components/play/songInfo/songinfo.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isPlaying: Boolean,
    songInfo: Object,
    currentTime: Number,
    songIyric: Object,
    iyricIndex: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeswiper(e: any) {
      (this as any).setData({
        active: e.detail.current
      })
    },

  }
})
