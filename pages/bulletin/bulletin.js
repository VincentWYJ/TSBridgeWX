//bulletin.js
var app = getApp()
var util = require('../../utils/util.js')
var that = null
var tempBulletin = null
var oldestTime = 0
Page({
  data: {
    content: ['最难忘的莫过于回忆，最使人前进的也莫过于回忆。','我们时常可以从回忆中，发现前进的力量，发现身边值得珍惜的人。','不要以为，回忆是拿来怀念的，回忆，是用来更加珍惜现在的。'],
    bulletins: [],
    indexC: 0,
    loadingHidden: true,
    url: '../splash/splash',
    loadingText: '正在加载...'
  },
  onLoad: function () {
    console.log('bulletin page onLoad')
    that = this
    that.handleLoginOrNot()
  },
  onShow: function() {
    console.log("bulletin page onShow")
    that.handleLoginOrNot()
  },
  handleLoginOrNot: function() {
    if(app.globalData.firstLogin) {
        wx.navigateTo({
          url: that.data.url,
        })
    } else {
      app.getUserInfo(function(userInfo){
        oldestTime = Date.now();
        userInfo.time = util.formatTime(new Date(oldestTime))
        tempBulletin = userInfo
        //更新数据，类型时数组
        that.setData({
          bulletins:[tempBulletin]
        })
      })
    }
  },
  onPullDownRefresh: function() {
    setTimeout( function() {
      tempBulletin.time = util.formatTime(new Date(Date.now()))
      var array = that.data.bulletins
      //添加的是公告对象，而不是单值数据和数组
      array.unshift(tempBulletin)
      that.setData({
        indexC:(Math.floor(Math.random()*15))%3,
        bulletins:array
      })
      wx.stopPullDownRefresh()
    }, 500)
  },
  //加载新数据事件处理函数，测试利用最新时间点
  loadingNewBulletin: function() {
    that.setData({
      loadingHidden:false
    })
    setTimeout( function() {
      tempBulletin.time = util.formatTime(new Date(Date.now()))
      var array = that.data.bulletins
      //添加的是公告对象，而不是单值数据和数组
      array.unshift(tempBulletin)
      that.setData({
        indexC:(Math.floor(Math.random()*15))%3,
        bulletins:array,
        loadingHidden:true
      })
     }, 200)
  },
  //加载旧数据事件处理函数，测试时间点往回走
  loadingOldBulletin: function() {
    if(oldestTime > 10000) {
        oldestTime -= 10000;
        that.setData({
          loadingHidden:false
        })
        setTimeout( function() {
          tempBulletin.time = util.formatTime(new Date(oldestTime))
          var array = that.data.bulletins
          array.push(tempBulletin)
          that.setData({
            indexC:(Math.floor(Math.random()*15))%3,
            bulletins:array,
            loadingHidden:true
          })
        }, 200)
      }
  },
})