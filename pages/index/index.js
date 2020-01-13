import {
  ListModel
} from '../../models/videoList.js'
const app = getApp()
const listModel = new ListModel()

Page({
  data: {
    topArray: [],
    page: 1,
    currentIndex: null,
    scrollLeft: 0,
    videoData: [],
    addList: [],
    categoryId: null,
    current: 1,
    size: 10,
    getPage: null,
    // 广告配置
    adSetting: null
  },
  onLoad: function() {
    this.getTabList();
    this.getAddList();
    this.getAddSetting()

  },

  onShow: function() {
    this.getVideoDataList();
  },

  onPullDownRefresh: function() {
    this.setData({
      current: 1,
      videoData: []
    })
    this.getVideoDataList()
    setTimeout(function() {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500)
  },

  onplay: function() {
    // let videoContext = wx.createVideoContext('myVideo');
    // videoContext.requestFullScreen();
  },
  itemClick(e) {
    console.log("e", e)
    var that = this
    var shortUrl = e.currentTarget.dataset.url
    var id = e.currentTarget.dataset.id
    var avatar = e.currentTarget.dataset.avatar
    var username = e.currentTarget.dataset.username
    var videoName = e.currentTarget.dataset.videoname
    if (!shortUrl) {
      return
    }
    listModel.addVideoNumber(id).then(res => {
      if (res.code == 0) {
        that.data.videoData.forEach(item => {
          if (item.id == id) {
            item.playNum = item.playNum + 1
          }
        })
        wx.navigateTo({
          url: '../video/video?url=' + shortUrl + '&avatar=' + avatar + '&username=' + username + '&videoName=' + videoName,
        })
      }
    })
  },

  // 获取广告信息
  getAddList() {
    listModel.getAddList().then(res => {
      console.log("getAddList", res)
      this.setData({
        addList: res.data
      })
    })
  },

  // 获取广告配置
  getAddSetting() {
    listModel.getAddSetting().then(res => {
      console.log("getAddSetting", res)
      this.setData({
        adSetting: res.data
      })
    })
  },

  // 获取顶部信息
  getTabList() {
    listModel.getTabList().then(res => {
      this.setData({
        topArray: res.data
      })
    })
  },

  // 获取视频列表
  getVideoDataList() {
    var id = this.data.categoryId
    var current = this.data.current
    var size = this.data.size
    listModel.getVideoList(id, current, size).then(res => {
      console.log(" this.data.addList", this.data.addList)
      var pages = res.data.pages
      var arr1 = this.data.videoData
      var arr2 = res.data.records
      arr1 = arr1.concat(arr2);
      var addLength = this.data.addList.length
      for (var i = 0, y = 0; i < arr1.length; i++, y++) {
        if (addLength == y) {
          y = 0;
        }
        if ((i + 1) == this.data.adSetting.adPosition) {
          arr1[i].adId = this.data.addList[y].adId
        } else {
          if (((i + 1 - this.data.adSetting.adPosition) > 0) &&
            (i + 1 - this.data.adSetting.adPosition) % (this.data.adSetting.adInterval+1 ) == 0) {
            arr1[i].adId=this.data.addList[y].adId
          }
        }
      }
      console.log("")
      this.setData({
        videoData: arr1,
        getPage: pages
      })
    })

  },

  onReachBottom: function() {
    if (this.data.current == this.data.getPage) {
      wx.showToast({
        title: '暂无更多数据',
        icon: 'none'
      })
      return false
    }
    var current = this.data.current + 1
    this.setData({
      current: current
    })
    this.getVideoDataList()
  },

  getList() {
    listModel.getList(this.data.page).then(res => {
      this.setData({
        douyinData: res.aweme_list
      })
    })
  },

  scroll(e) {},
  // tab改变事件
  tapChange(e) {
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    this.setData({
      currentIndex: index,
      categoryId: id,
      current: 1,
      videoData: []
    })
    var that = this;
    that.getVideoDataList();
    var query = wx.createSelectorQuery();
    query.select('#item-' + id).boundingClientRect();
    query.select('#scroll-view').boundingClientRect();
    query.select('#scroll-view').scrollOffset(); //获取页面滑动位置的查询请求
    query.exec(function(res) {
      that.setData({
        scrollLeft: res[2].scrollLeft + res[0].left + res[0].width / 2 - res[1].width / 2
      })
    })
  }
})