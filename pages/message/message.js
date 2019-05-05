// pages/message/message.js
var app = getApp();
const _url = app.data._url
// const openId = wx.openId

Page({
  /**
   * 页面的初始数据
   */
  data: {
      message:'',
  },
  xiangxi:function(e){
    let id = e.currentTarget.dataset.index
    let openId = wx.openId
    wx.navigateTo({
      url: '../warm/warm?id='+ id,
    })
    var that = this
    wx.request({
      url: _url + 'sysMessage/checkMessage',
      method: 'post',
      data: { customerId: openId, messageId: id },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {  
      },
      fail: function () { }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openId = wx.openId
    var that = this
    wx.request({
      url: _url + 'sysMessage/selectMessageList',
      method: 'post',
      data: { customerId: openId },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success:function(res){
        let obj = res.data.data
        for (let i = 0; i < obj.length; i++) {
          let date = new Date(obj[i].sendTime)
          let Y = date.getFullYear()
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          let h = date.getHours();
          let m = date.getMinutes();
          // var s = date.getSeconds();
          obj[i].sendTime = [Y + '-' + M + '-' + D + '  ' + h + ':' + m]
        }
        that.setData({
          message: res.data.data,          
        })
      },
      fail:function(){}
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
    this.onLoad()
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