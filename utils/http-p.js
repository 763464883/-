import {
  config
} from "../config.js"

const tips = {

}

class HTTP {
  request({
    url,
    data = {},
    method = "GET"
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  request1({
    url,
    data = {},
    method = "GET"
  }) {
    return new Promise((resolve, reject) => {
      this._request1(url, resolve, reject, data, method)
    })
  }

  getToken() {
    var token = wx.getStorageSync("token");
    if (!token) {
      token = ""
    }
    return token;
  }

  setToken(token) {
    wx.setStorageSync("token", token)
  }

  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.showLoading({
      title: '正在加载...',
    });
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        // Authorization: "Bearer" + this.getToken()
      },
      success: (res) => {
        wx.hideLoading();
        resolve(res.data)
      },
      fail: (err) => {
        wx.hideLoading();
        reject()
      }
    })
  }

  _request1(url, resolve, reject, data = {}, method = 'GET') {
    
    wx.showLoading({
      title: '正在加载...',
    });
    wx.request({
      url: config.api_douyin_url + url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        wx.hideLoading();
        resolve(res.data)
      },
      fail: (err) => {
        wx.hideLoading();
        reject()
      }
    })
  }
}

export {
  HTTP
}