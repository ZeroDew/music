// components/play/progress/progress.ts
import formatTime from '../../../utils/foramtTime'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentTime: Number,
    songLength: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    playTime: 0,
    totalTime: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeSong(e: any) {
      (this as any).triggerEvent('songChange', e.detail.value)
    }
  },
  observers: {
    'currentTime': function (val: number) {
      (this as any).setData({
        playTime: formatTime(val)
      })
    },
    'songLength': function (val: number) {
      (this as any).setData({
        totalTime: formatTime(val)
      })
    }
  }
})
