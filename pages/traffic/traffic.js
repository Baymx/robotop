var app = getApp();
const _url = app.data._url
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    main: '',//主会场
    sessions: '',//分论坛
    pavilion: '',//展馆
    cars: '',//摆渡车
    hotel: '',//酒店
    around: '',//周边游
    Pickup: '',//接站点
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  addressGo: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    let latitude = e.currentTarget.dataset.latitude
    let longitude = e.currentTarget.dataset.longitude
    let name = e.currentTarget.dataset.name
    //验证和二次获取用户信息
    wx.getSetting({
      success: (res) => {
        console.log(res);
        console.log(res.authSetting['scope.userLocation']);
        wx.hideLoading();
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
            success: function (res) {
              if (res.cancel) {
                console.info("1授权失败返回数据");

              } else if (res.confirm) {
                wx.openSetting({
                  success: function (data) {
                    console.log(data);
                    if (data.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 5000
                      })
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 5000
                      })
                    }
                  }
                })
              }
            }
          })

        } else {
          wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            name: name,
            complete: function (res) {
              wx.hideLoading();
            }
          })
        }
      }
    })
    // wx.getLocation({
    //   success: function(res) {
    //     // wx.hideLoading();
    //     wx.openLocation({
    //       latitude: latitude,
    //       longitude: longitude,
    //       name: name,
    //       complete:function(res){
    //         wx.hideLoading();
    //       }
    //     })

    //   },
    //   fail:function(error){
    //     wx.hideLoading();
    //     console.log(error)
    //   }
    // })

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
      url: '/traffic',
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
  gomore: function (e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../jingqu/jingqu?id=' + id,
    })
  },
  onShow: function () {
    var that = this
    //主会场请求
    wx.request({
      url: _url + 'navigation/selectNavigationList',
      method: 'post',
      data: { search: 4 },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          main: res.data.data
        })
      },
      fail: function (res) {
        console.log('sss')
      }
    });
    //分论坛请求
    wx.request({
      url: _url + 'navigation/selectNavigationList',
      method: 'post',
      data: { search: 6 },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          sessions: res.data.data
        })
      },
      fail: function (res) {
        console.log('sss')
      }
    });
    //展馆请求
    wx.request({
      url: _url + 'navigation/selectNavigationList',
      method: 'post',
      data: { search: 5 },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          pavilion: res.data.data
        })
      },
      fail: function (res) {
        console.log('sss')
      }
    });
    //摆渡车
    wx.request({
      url: _url + 'navigation/selectNavigationList',
      method: 'post',
      data: { search: 7 },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          cars: res.data.data
        })
      },
      fail: function (res) {
        // console.log('sss')
      }
    });
    //酒店
    wx.request({
      url: _url + 'navigation/selectNavigationList',
      method: 'post',
      data: { search: 1 },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          hotel: res.data.data
        })
      },
      fail: function (res) {
        // console.log('sss')
      }
    });
    //周边游
    wx.request({
      url: _url + 'navigation/selectNavigationList',
      method: 'post',
      data: { search: 2 },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          around: res.data.data
        })
      },
      fail: function (res) {
        // console.log('sss')
      }
    });
    wx.request({
      url: _url + 'navigation/selectNavigationList',
      method: 'post',
      data: { search: 3 },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          Pickup: res.data.data
        })
      },
      fail: function (res) {
        // console.log('sss')
      }
    });
  },
  onShareAppMessage: function () {

  },
  onLoad: function () {
    var that = this;
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
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log('获取地址-----' + res)
      }
    });
  },
  footerTap: app.footerTap

})