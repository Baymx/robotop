const app = getApp()
const _url = app.data._url
const WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news:'',
    title:'',
    ri:'',
    shi:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    console.log(id)
    var that = this
    wx.request({
      url: _url + 'news/selectOne',
      method: 'post',
      data:{id:id},
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res)
        let date = new Date(res.data.data.createTime)
        let Y = date.getFullYear()
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let h = date.getHours();
        let m = date.getMinutes();

        let ri = Y+'-'+M+'-'+D
        let shi = h+':'+m
        const news = res.data.data.content;
        that.setData({
          title: res.data.data.title,
          ri:ri,
          shi:shi
        })

        WxParse.wxParse('news', 'html', news, that, 5);
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