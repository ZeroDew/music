// components/play/playOption/playOption.ts
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  properties: {
    mode: String,
    isPlaying: Boolean
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

    controlPlay(e: any) {
      (this as any).triggerEvent('playmode', e.currentTarget.dataset.mode)
    },
    changemode(e: any) {
      if ((this as any).data.active == 2)
        (this as any).setData({
          active: -1
        });

      (this as any).setData({
        active: (this as any).data.active + 1
      });
      (this as any).triggerEvent('playmode', e.currentTarget.dataset.mode)
    },
    showList() {
      (this as any).triggerEvent('showdialog', '')
    }
  }
})
