const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({
  data: {
    pageType: 2,
    pageActive: 3,
    pageTitle: '统计分析',
    isShow: false,
    isHome: true,
    statusBarHeight: app.globalData.statusBarHeight,

    list: [],

    getWordArr: []
  },
  getWord: function (token) {
    let that = this;
    _cori.default.request('POST', 'Operator/getWord', token).then(function (res) {
      console.log('获取用户评价关键词', res.data);
      that.setData({
        getWordArr: res.data.data
      })
    });
  },
  statistic: function (token) {
    let that = this;
    _cori.default.request('POST', 'Operator/statistic', token).then(function (res) {
      console.log('数据统计', res.data);
      var statistic = res.data.data;
      that.setData({
        list: statistic.orders,
        statistic: statistic
      })
      wx.hideLoading();
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var token = wx.getStorageSync('token'),
      statusBarHeight = that.data.statusBarHeight;
    that.setData({
      titleHeight: statusBarHeight + 6,
      titleHeight1: statusBarHeight + 6 + 40,
      token: token
    })
    wx.showLoading({
      title: '加载中',
    })
    that.statistic(token);
    that.getWord(token);
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