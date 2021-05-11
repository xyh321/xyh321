const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageType: 2,
    pageActive: 2,
    pageTitle: '抢单',
    isShow: false,
    isHome: true,
    statusBarHeight: app.globalData.statusBarHeight,

    page: 1,
    pageNum: 8,
    list: [],

    status: 0
  },
  grabOrder: function (e) {
    let that = this;
    var oid = e.currentTarget.dataset.id,
      token = that.data.token;
    _cori.default.request('POST', 'Operator/grabOrder', token, {
      oid: oid
    }).then(function (res) {
      console.log('抢单', res.data.msg);
      wx.showToast({
        title: res.data.msg,
        icon: 'none'
      })
    });
  },
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var images = e.currentTarget.dataset.images;
    wx.previewImage({
      current: images[index], //当前图片地址
      urls: images, //所有要预览的图片的地址集合 数组形式
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  getlist: function (token, page) {
    let that = this;
    var pageNum = that.data.pageNum;
    _cori.default.request('POST', 'Operator/getTodoOrderList', token, {
      page: page,
      pageNum: pageNum
    }).then(function (res) {
      console.log('抢单列表', res.data);
      var list = that.data.list,
        list_new = res.data.data;
      if (list_new.length) {
        that.setData({
          list: list.concat(list_new),
          page: page
        })
      } else {
        wx.showToast({
          title: '没有更多了~',
          icon: 'none'
        })
      }
      wx.hideLoading();
    });
  },
  isGrabPrivilege: function (token) {
    let that = this;
    _cori.default.request('POST', 'Operator/isGrabPrivilege', token, null).then(function (res) {
      console.log('是否开启抢单', res.data);
      var status = res.data.data;
      if (status === 1) {
        that.getlist(token, 1);
      }
      that.setData({
        status: status
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var token = wx.getStorageSync('token');
    var statusBarHeight = that.data.statusBarHeight;
    that.setData({
      titleHeight: statusBarHeight + 6,
      titleHeight1: statusBarHeight + 6 + 40,
      token: token
    })
    wx.showLoading({
      title: '加载中',
    })
    that.isGrabPrivilege(token);
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
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    var token = that.data.token,
      page = that.data.page + 1;
    that.getlist(token, page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})