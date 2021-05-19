const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageType: 2,
    pageActive: 1,
    pageTitle: '配件申请列表',
    isShow: true,
    statusBarHeight: app.globalData.statusBarHeight,

    list: []
  },
  getlist: function (token, code) {
    let that = this;
    _cori.default.request('POST', 'Operator/getConsumeApplyList', token, {
      code: code
    }).then(function (res) {
      console.log('配件申请列表', res.data);
      var list = res.data.data;
      that.setData({
        list: list
      })
      wx.hideLoading();
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var statusBarHeight = that.data.statusBarHeight;
    var token = wx.getStorageSync('token');
    var code = options.code;
    that.setData({
      titleHeight: statusBarHeight + 6,
      titleHeight1: statusBarHeight + 6 + 40,
      token: token,
      code: code
    })
    wx.showLoading({
      title: '加载中',
    })
    that.getlist(token, code)
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