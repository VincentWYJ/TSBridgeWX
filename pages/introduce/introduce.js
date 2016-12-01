//introduce.js
var app = getApp()
var that = null
Page({
    data: {
        mode: 'scaleToFill',
        imgUrls: [
            '../../images/guide_01.jpg',
            '../../images/guide_02.jpg',
            '../../images/guide_03.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        //url: '../bulletin/bulletin',
        btnText: '进入校推'
    },
    onLoad: function() {
      console.log("introduce page onLoad")
      //init something
      that = this
    },
    btnGotoIndex: function() {
      //只有点击进入校推按钮，下次启动才不会显示引导页面
      app.globalData.firstLogin = false
      wx.navigateBack({
        delta: 1
        //url: that.data.url
      })
    }
})