//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    /*
     *本地缓存localStorage是永久存储的，但不建议将关键信息存储在localStorage中，以防用户换设备
     *所以将账号密码等信息存在云上的数据库中比较合适，其实换设备让用户再次登录就好了，与数据中数据进行比对
     *本地缓存应用是否是第一次启动等标记变量，来达到即时判断
    */
    var index = wx.getStorageSync('index') || 0
    wx.setStorageSync('index', index+1)
    console.log(index)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    firstLogin:true
  }
})