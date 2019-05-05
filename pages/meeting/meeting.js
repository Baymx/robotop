var app = getApp();
const _url = app.data._url
const WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    metting:'',
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: _url + 'meeting/selectOne',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)       
         const content = res.data.data.content
         const expert = res.data.data.expert
         const organization = res.data.data.organization
         WxParse.wxParse('content', 'md', content, that, 5);
         WxParse.wxParse('expert', 'md', expert, that, 5);
         WxParse.wxParse('organization', 'md', organization, that, 5);
      },
      fail: function (res) { console.log('错误') },
      complete: function (res) { },
    });









    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 196;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  footerTap: app.footerTap
})