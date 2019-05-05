// pages/stay/stay.j
const app = getApp()
const _url = app.data._url
const WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotels:'',
  },
  shouye: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  yicheng: function () {
    wx.redirectTo({
      url: '../agenda/agenda',
    })
  },
  jiaotong: function () {
    wx.redirectTo({
      url: '../traffic/traffic',
    })
  },
  zhusu: function () {
    wx.redirectTo({
      url: 'stay',
    })
  },
  liuyan: function () {
    wx.redirectTo({
      url: '../messages/messages',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    wx.request({
      url: _url + 'stay/selectStayList',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data.data[0].detail)
        const WxParse = require('../../wxParse/wxParse.js');
        const hotels = res.data.data[0].detail;
        WxParse.wxParse('hotels', 'html', hotels, that, 5);
      },
      fail: function () { }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})