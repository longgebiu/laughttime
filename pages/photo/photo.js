//photo.js
//引入代理
var hotapp = require('../../utils/hotapp.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    getlogs:[],
    imgUrl: [],
    isshow: false,
    jump: 0
  },
  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  },
  scroll: function (e, res) {
    // 容器滚动时将此时的滚动距离赋值给 this.data.scrollTop
    if (e.detail.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    that.getjson()
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  getjson: function (event) {
     var that = this
     var t= that.data.jump+1
     console.log(t)
     that.setData({
      jump: t++
     })
     console.log(that.data.jump)
     hotapp.request({
      useProxy: true,
      url: 'http://route.showapi.com/341-3',
       //url: 'https://wxapi.hotapp.cn/api/get',
      data: {
        appkey: 'hotapp174343819',
        page: this.data.jump,
        maxResult: 5,
        showapi_appid: 38264,
        showapi_sign: '0889a9d432f14c0db0d044c8d0c28978'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var userInfo = res.data.showapi_res_body.contentlist
        console.log(userInfo)
        that.setData({
          "addressInfo": res.data.showapi_res_body.contentlist,
          "isshow": false
        })
        //console.log(that.data.next)
      }
    })   
  }
})
