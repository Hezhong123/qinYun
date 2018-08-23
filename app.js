//app.js
App({
  onLaunch: function () {

    require('./utils/sdk-v1.4.0 2.js')

    // 初始化 SDK
    let clientID = 'b72c569e8364d81052f9'
    wx.BaaS.init(clientID)


    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    
    // 知晓云登陆
    wx.BaaS.login().then((res) => {
      // 用户允许授权，res 包含用户完整信息，详见下方描述
      console.log('用户信息', res, )
      getApp().globalData.userInfo = res  //传入用户id

    }, (res) => {
      // 用户拒绝授权，res 包含基本用户信息：id、openid、unionid
      console.log(res)
      this.globalData.userInfo = res
    })

    // 获取用户信息
    wx.getSetting({
    
    })

  },
  globalData: {
    userInfo: null,
    table:{
      activity: 49223
    }
  }
})