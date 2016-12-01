//splash.js
var that = null
Page({
    data: {
        mode: 'scaleToFill',
        src: '../../images/splash.jpg',
        url: '../introduce/introduce'
    },
    onLoad: function() {
        console.log("splash page onLoad")
        that = this
        setTimeout( function() {
            wx.redirectTo({
                url: that.data.url
            }) }, 2000)
    }
})

