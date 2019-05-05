//index.js
//获取应用实例
const app = getApp()
const _url = app.data._url
Page({
  data: {
    imgUrls:'',
    notices:'',
    news:'',
    meeting:'',
    urlss:'',
    urlsss:'',
    wei:'',
  },
  onShow:function(){
    this.onLoad();
  },
  know1:function(){
    var that =this
    wx.request({
      url: _url + 'install/selectInstallList',
      data: { search:3},
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      dataType: 'json',
      success: function (res) {
        var ss = new Array()
      for(var i=0;i<1;i++){
        ss.push(res.data.data[i].picture)   
      }
        wx.previewImage({
          urls:ss,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    });

  },
  know2: function () {
    wx.navigateTo({
      url: '../know2/know2',
    })
  },  
  onLoad: function () {
    var that = this
    wx.request({
      url: _url + 'install/selectInstallList',
      data: { search: 1 },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      dataType: 'json',
      success: function (res) {
        let ss = new Array()
        for (var i = 0; i < 1; i++) {
          ss.push(res.data.data[i].picture)
        }
        that.setData({
          urlss: ss,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    });

    wx.request({
      url: _url + 'install/selectInstallList',
      data: { search: 2 },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      dataType: 'json',
      success: function (res) {
        let ss = new Array()
        for (var i = 0; i < 1; i++) {
          ss.push(res.data.data[i].picture)
        }
        that.setData({
          urlsss: ss,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    });

    //轮播图
    wx.request({
      url: _url + 'install/selectInstallList',
      data: {search:0},
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      dataType: 'json',
      success: function(res) {
        that.setData({
          imgUrls:res.data.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    });
    //系统消息
     wx.getStorage({
      key: 'key',
      success: function(res) {
        var openId =res.data
        wx.request({
          url: _url + 'sysMessage/selectMessageList',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: { customerId: openId },
          method: 'post',
          dataType: 'json',
          success: function (res) {
          
            let qq = res.data.data
            let wei = 0
            for (let i = 0; i < qq.length; i++) {
              // console.log(qq[i].state)
              if (qq[i].state == 1) {
                wei = wei
                console.log(wei)
              } else {
                wei = wei + 1
                console.log(wei)
              }
            }

            that.setData({
              notices: res.data.data,
              wei: wei
            })
          },
          fail: function (res) { console.log('错误') },
          complete: function (res) { },
        });
      },
      
    })
    

    //新闻动态
    wx.request({
      url: _url + 'news/selectNews',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      dataType: 'json',
      success: function (res) {
      
      let obj = res.data.data
      for (let i = 0; i <obj.length;i++){
        let date = new Date(obj[i].createTime)
        let Y = date.getFullYear()
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
        let h = date.getHours();  
        let m = date.getMinutes();
        // var s = date.getSeconds();
        // console.log(Y +'-'+ M +'-' + D +'  ' + h+':' +m)
        obj[i].createTime = [Y + '-' + M + '-' + D + '  ' + h + ':' + m]
      }
    
        that.setData({
          news:res.data.data
        })
      },
      fail: function (res) { console.log('错误') },
      complete: function (res) { },
    });
    //会议列表
    wx.request({
      url: _url + 'meeting/selectOne',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      dataType: 'json',
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          meeting: res.data.data
        })
      },
      fail: function (res) { console.log('错误') },
      complete: function (res) { },
    });
  },
  shouye: function () {
    wx.redirectTo({
      url: 'index',
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
  xiaoxi:function(){
    wx.navigateTo({
      url: '../message/message',
    })
  },
  dongtai:function(e){
    var id =e.currentTarget.dataset.id
    // console.log(id)
    wx.navigateTo({
      url: '../news/news?id=' + id,
    })
  },

  more:function(){
    wx.navigateTo({
      url: '../meeting/meeting',
    })
  },
  onShareAppMessage: function () {
    return {
      title: '中国机器人峰会',
      path: 'index/index',
    }
  }
})
