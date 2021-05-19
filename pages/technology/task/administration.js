const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageType: 2,
    pageActive: 1,
    pageTitle: '任务管理',
    isShow: false,
    isHome: true,
    statusBarHeight: app.globalData.statusBarHeight,

    statusList: [{
      id: 1,
      name: '未接单',
      status: 1
    }, {
      id: 2,
      name: '处理中',
      status: 4
    }, {
      id: 3,
      name: '待确认',
      status: 6
    }, {
      id: 4,
      name: '已完成',
      status: 7
    }],
    currentStatus: 1,

    page: 1,
    pageNum: 8,
    list: []
  },
  lookApply: function (e) {
    let that = this;
    var code = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: '/pages/technology/task/apply?code=' + code,
    })
  },
  confirmOrder: function (e) {
    let that = this;
    var oid = e.currentTarget.dataset.oid,
      token = that.data.token,
      status = that.data.currentStatus;
    wx.showModal({
      title: '提示',
      content: '确认接单吗？',
      success: function (res) {
        if (res.confirm) {
          _cori.default.request('POST', 'Operator/confirmOrder', token, {
            oid: oid
          }).then(function (res) {
            wx.showToast({
              title: '接单成功',
              icon: 'success',
              duration: 1000,
              success: function () {
                that.setData({
                  page: 1,
                  list: []
                })
                that.getlist(token, 1, status);
              }
            })
          });
        }
      }
    })
  },
  chooseParts: function (e) {
    var code = e.currentTarget.dataset.code,
      oid = e.currentTarget.dataset.oid;
    wx.navigateTo({
      url: '/pages/technology/task/chooseParts?code=' + code + '&oid=' + oid,
    })
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
  getlist: function (token, page, status) {
    let that = this;
    var pageNum = that.data.pageNum;
    _cori.default.request('POST', 'Operator/getDoingOrderlist', token, {
      page: page,
      pageNum: pageNum,
      status: status
    }).then(function (res) {
      console.log('任务管理列表', res.data);
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
  taskFeedback: function (e) {
    var oid = e.currentTarget.dataset.oid;
    wx.navigateTo({
      url: '/pages/technology/task/feedback?oid=' + oid,
    })
  },
  lookProgress: function (e) {
    var oid = e.currentTarget.dataset.oid;
    wx.navigateTo({
      url: '/pages/technology/task/repairProgress?oid=' + oid,
    })
  },
  transferOrder: function (e) {
    var oid = e.currentTarget.dataset.oid;
    wx.navigateTo({
      url: '/pages/technology/task/selectTechnician?oid=' + oid,
    })
  },
  changeStatus: function (e) {
    let that = this;
    var token = that.data.token,
      status = e.currentTarget.dataset.status;
    that.setData({
      currentStatus: status,
      list: [],
      page: 1
    })
    wx.showLoading({
      title: '加载中',
    })
    that.getlist(token, 1, status);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var statusBarHeight = that.data.statusBarHeight;
    var token = wx.getStorageSync('token'),
      status = that.data.currentStatus;
    that.setData({
      titleHeight: statusBarHeight + 6,
      titleHeight1: statusBarHeight + 6 + 40,
      token: token
    })
    wx.showLoading({
      title: '加载中',
    })
    that.getlist(token, 1, status);
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
      page = that.data.page + 1,
      status = that.data.currentStatus;
    that.getlist(token, page, status);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})