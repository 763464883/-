//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // topArray:[{id:"0",name:"最新"},{id="1",name:"精选"},{id="2",name:"情感"},{id="3",name:"正能量"},{id="4",name:"搞笑"},
    // {id:"5",name:"生活"},{id:"6",name:"历史"},{id:"7",name:"小视频"},{id:"8","aaa"}],
    couponData:[{id:"1",itemTitle:"1G",itemPrice:"15.00元",isSelected:true},{id:"2",itemTitle:"2G",itemPrice:"26.00元",isSelected:false},
    {id:"3",itemTitle:"3G",itemPrice:"29.00元",isSelected:false},{id:"4",itemTitle:"4G",itemPrice:"35.00元",isSelected:false},{id:"5",itemTitle:"200M",itemPrice:"10.00元",isSelected:false},
    {id:"6",itemTitle:"500M",itemPrice:"18.00元",isSelected:false}],

    currentIndex: 0,  
    scrollLeft: 0
  },
  onLoad: function () {
    
  },
  scroll(e){
  },
  // tab改变事件
  tapChange(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      currentIndex: index
    })
    var that = this;
    var query = wx.createSelectorQuery();
    query.select('#item-index').boundingClientRect();
    query.select('#scroll-view').boundingClientRect();
    query.select('#scroll-view').scrollOffset();//获取页面滑动位置的查询请求
    query.exec(function(res){
      console.log("exec",res)
      that.setData({
        scrollLeft: res[2].scrollLeft + res[0].left + res[0].width / 2 - res[1].width / 2
      })
    })
  }
})
