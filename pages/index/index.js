//index.js
//获取应用实例
//引入代理
var hotapp = require('../../utils/hotapp.js');
var app = getApp()
Page({
  data: {
    imgUrls: [
      'http://img4.imgtn.bdimg.com/it/u=853537835,3029652797&fm=23&gp=0.jpg',
      'http://img0.imgtn.bdimg.com/it/u=1582567067,766279201&fm=23&gp=0.jpg',
      'http://img4.imgtn.bdimg.com/it/u=1489243952,524930210&fm=23&gp=0.jpg',
    ],
    senpression: '',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userpession: '',
    allpression: [],
    allanswer: []
  },
  bindKeyInput: function (e) {
    const that = this
    this.setData({
      inputValue: e.detail.value,
      senpression: e.detail.value
    })
  },
  getanswer: function () {
    const that = this
    hotapp.request({
      useProxy: true,
      url: 'http://op.juhe.cn/robot/index',
      data: {
        info: that.data.senpression,
        key: 'ab41bef4e64021c6bc1b1a3f8533b4f8'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          answerValue: res.data.result.text
        })
      },
    })  
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
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
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  bindFormSubmit: function (e) {
  }
})
