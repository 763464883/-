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
    query.select(index).boundingClientRect
    console.log("boundingClientRect",boundingClientRect)
    query.select('#scroll-view').boundingClientRect();
    query.select('#scroll-view').scrollOffset();//获取页面滑动位置的查询请求
    query.exec(function(res){
      console.log("exec",res)
    })
  }
})
