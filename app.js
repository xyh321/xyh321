// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    coriander_requset: 'https://www.bxsrj.com/api/',
    cori_root: 'https://www.bxsrj.com/',
    key: '6RLBZ-ZI5LR-7QQW5-WIGZL-VAKKH-MGBC4'
  }
})