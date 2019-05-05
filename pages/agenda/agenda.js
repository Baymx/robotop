// pages/agenda/agenda.js
const app = getApp()
const _url = app.data._url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['议程表', '九月九日', '九月九日', '九月九日'],
    currentTab: 0,
    agenda:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: _url + 'agenda/selectOne',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res)
        let obj = res.data.data
        var a = []
        for (let i = 0; i < obj.length; i++) {
          let date = new Date(obj[i].time)
          let Y = date.getFullYear()
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          var h = date.getHours();
          var m = date.getMinutes();
          // var s = date.getSeconds();
          obj[i].time = [ M + '月' + D + '日']
          // console.log(obj[i].time)       
          a.push(obj[i].time)
        }
        a[0] = '议程表'
        // let gg = that.data.navbar
        // console.log(gg)
        that.setData({
          agenda: res.data.data,
          navbar: a
        })
      },
      fail: function () { }
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  shouye: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  yicheng: function () {
    wx.redirectTo({
      url: 'agenda',
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