const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageTitle: '报修进度',
    isShow: true,
    statusBarHeight: app.globalData.statusBarHeight,

    duration: 5,
    attitude: 4,
    level: 1,

    arr: [{
      id: 1,
      text: '处理及时',
      select: false
    }],

    feedback: [],
    schedule: []
  },
  schedule: function (token, oid) {
    let that = this;
    _cori.default.request('POST', 'Operator/schedule', token, {
      oid: oid
    }).then(function (res) {
      console.log('获取报修进度', res.data);
      var feedback = res.data.data.feedback,
        wordArr = [];
      if (feedback.length) {
        wordArr = feedback.word;
        if (wordArr.indexOf(",") !== false) {
          wordArr = wordArr.split(",");
        } else {
          wordArr[0] = wordArr
        }
        console.log('wordArr', wordArr)
      }
      that.setData({
        schedule: res.data.data.schedule,
        feedback: feedback,
        wordArr: wordArr
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var token = wx.getStorageSync('token'),
      oid = options.oid;
    var statusBarHeight = that.data.statusBarHeight;
    that.setData({
      titleHeight: statusBarHeight + 6,
      titleHeight1: statusBarHeight + 6 + 40,
      token: token,
      oid: oid
    })
    that.schedule(token, oid);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})