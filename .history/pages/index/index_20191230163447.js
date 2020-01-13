//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    topArray:['最新','精选','情感','正能量','搞笑','生活','历史','小视频','aaa'],
    currentIndex: 0,
    scrollLeft: 0
  },
  onLoad: function () {
    
  },
  scroll(e){
    console.log(e)
  },
  // tab改变事件
  tapChange(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      currentIndex: index
    })
    var that = this;
    var query = wx.createSelectorQuery();
    
  }
})
