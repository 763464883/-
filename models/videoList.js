import {
  HTTP
}
from '../utils/http-p.js'

class ListModel extends HTTP {
 
  // 获取顶部分类
  getTabList() {
    return this.request({
      url: '/user/video/categoryList'
    })
  }

  // 获取视频分类
  getVideoList(categoryId, current, size) {
    if (categoryId) {
      return this.request({
        url: '/user/video/videoPage?categoryId=' + categoryId + '&current=' + current + '&size=' + size,
        
      })
    } else {
      return this.request({
        url: '/user/video/videoPage?current=' + current + '&size=' + size
      })
    }
  }

  // 点击增加视频播放数 
  addVideoNumber(id) {
    return this.request({
      url: '/user/video/addPalyNumber/' + id,
      method: 'put'
    })
  }

  // 获取广告列表
  getAddList(){
    return this.request({
      url: '/user/video/adSpaceList',
      method: 'get'
    })
  }

  // 获取广告配置
  getAddSetting(){
    return this.request({
      url: '/user/video/setting',
      method: 'get'
    })
  }


  getVideoData(data) {
    return this.request1({
      url: '',
      method: 'POST',
      data: {
        url: encodeURIComponent(data)
      },
    })
  }
}

export {
  ListModel
}