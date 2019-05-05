// pages/leaveingmessage/leaveingmessage.js
const _url = getApp().data._url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    main:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  // 表单提交
  bindFormSubmit: function (e) {
    console.log(e.detail.value.textarea)
    let openId = wx.openId
    wx.request({
      url: _url + 'message/addMessage',
      method:'POST',
      data: {message:e.detail.value.textarea,
        customerId: openId},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        if(res.data.state == 200){
          wx.redirectTo({
            url: '../messages/messages',
          })
        }
        if (res.data.state == 300){
          console.log('sss')
          wx.showModal({
            title: '没有正在进行中的会议', 
          })
        }
        if (res.data.state == 100) {
          console.log('sss')
          wx.showModal({
            title: '存在多个进行中的会议',
          })
        }
      },
      fail:function(res){
      
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})