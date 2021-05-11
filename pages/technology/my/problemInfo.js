const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageTitle: '',
    isShow: true,
    statusBarHeight: app.globalData.statusBarHeight,

    nodes: ''
  },
  notice: function (token, type) {
    let that = this;
    _cori.default.request('POST', 'Operator/notice', token, {
      type: type
    }).then(function (res) {
      console.log('信息', res.data.data);
      var nodes = res.data.data
      that.setData({
        nodes: nodes
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var title = options.title,
      token = wx.getStorageSync('token'),
      type = 0;
    var statusBarHeight = that.data.statusBarHeight;
    that.setData({
      pageTitle: title,
      titleHeight: statusBarHeight + 6,
      titleHeight1: statusBarHeight + 6 + 40,
      token: token
    })
    if (title == '用户须知') {
      type = 1;
    } else if (title == '用户常见问题') {
      type = 2;
    } else if (title == '企业注册使用流程') {
      type = 3;
    }
    that.notice(token, type);
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