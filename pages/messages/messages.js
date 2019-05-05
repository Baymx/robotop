// pages/messages/messages.js
const app =getApp()
const _url = app.data._url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages:'',
    openId:'',
    lg:0,
  },
  liu:function(){
  
   var that = this
   that.setData({
     lg:1
   })
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
      url: '../stay/stay',
    })
  },
  liuyan: function () {
    wx.redirectTo({
      url: '../messages/messages',
    })
  },
  zan:function(e){
    const id = e.currentTarget.dataset.id
    const praise = e.currentTarget.dataset.praise
    var that = this
    console.log(id)
    wx.getStorage({
      key: 'key',
      success: function(res) {
        const openId = res.data
        if (!praise == 1){
          wx.request({
            url: _url + 'message/addPraise',
            method: 'post',
            data: { customerId: openId, messageId: id },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              let obj = res.data.data
              for (let i = 0; i < obj.length; i++) {
                let date = new Date(obj[i].createTime)
                let date2 = new Date(obj[i].answerTime)
                let Y = date.getFullYear()
                let Y2 = date2.getFullYear()
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1); var M2 = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1)
                var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                var D2 = date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate();
                var h = date.getHours();
                var h2 = date2.getHours();
                var m = date.getMinutes();
                var m2 = date2.getMinutes();
                // var s = date.getSeconds();
                console.log(Y + '-' + M + '-' + D + '  ' + h + ':' + m)
                obj[i].createTime = [Y + '-' + M + '-' + D + '  ' + h + ':' + m]
                obj[i].answerTime = [Y2 + '-' + M2 + '-' + D2 + '  ' + h2 + ':' + m2]
              }
              that.setData({
                messages: res.data.data,
              })
            },
            fail: function () { }
          })         
        }else{     
          wx.request({
            url: _url + 'message/removePraise',
            method: 'post',
            data: { customerId: openId, messageId: id },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              let obj = res.data.data
              for (let i = 0; i < obj.length; i++) {
                let date = new Date(obj[i].createTime)
                let date2 = new Date(obj[i].answerTime)
                let Y = date.getFullYear()
                let Y2 = date2.getFullYear()
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1); var M2 = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1)
                var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                var D2 = date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate();
                var h = date.getHours();
                var h2 = date2.getHours();
                var m = date.getMinutes();
                var m2 = date2.getMinutes();
                // var s = date.getSeconds();
                console.log(Y + '-' + M + '-' + D + '  ' + h + ':' + m)
                obj[i].createTime = [Y + '-' + M + '-' + D + '  ' + h + ':' + m]
                obj[i].answerTime = [Y2 + '-' + M2 + '-' + D2 + '  ' + h2 + ':' + m2]
              }
              that.setData({
                messages: res.data.data,
              })
            },
            fail: function () { }
          })        
        }
      },
    });
   
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'key',
      success: function (res) {
        const openId = res.data
        wx.request({
          url: _url + 'message/selectMessageList',
          method: 'post',
          data: { customerId: openId },
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            let obj = res.data.data
            for (let i = 0; i < obj.length; i++) {
              let date = new Date(obj[i].createTime)
              let date2 = new Date(obj[i].answerTime)
              let Y = date.getFullYear()
              let Y2 = date2.getFullYear()
              var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);             var M2 = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1)
              var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
              var D2 = date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate();
              var h = date.getHours();
              var h2 = date2.getHours();
              var m = date.getMinutes();
              var m2 = date2.getMinutes();
              // var s = date.getSeconds();
              console.log(Y + '-' + M + '-' + D + '  ' + h + ':' + m)
              obj[i].createTime = [Y + '-' + M + '-' + D + '  ' + h + ':' + m]
              obj[i].answerTime = [Y2 + '-' + M2 + '-' + D2 + '  ' + h2 + ':' + m2]
            }
            console.log(res)
            that.setData({
              messages: res.data.data,
            })
          },
          fail: function () { }
        })
      }
    })
   
    
    
  },
  // 表单提交
  bindFormSubmit: function (e) {
    console.log(e.detail.value.textarea)
    var that =this
    let openId = wx.openId
    wx.request({
      url: _url + 'message/addMessage',
      method: 'POST',
      data: {
        message: e.detail.value.textarea,
        customerId: openId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.state == 200) {
          that.setData({
            lg:0
          })
          wx.showModal({
            title: '留言成功',
          })
        }
        if (res.data.state == 300) {
          that.setData({
            lg: 0
          })
          wx.showModal({
            title: '没有正在进行中的会议',
          })
        }
        if (res.data.state == 100) {
          that.setData({
            lg: 0
          })
          wx.showModal({
            title: '存在多个进行中的会议',
          })
        }
      },
      fail: function (res) {

      }
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