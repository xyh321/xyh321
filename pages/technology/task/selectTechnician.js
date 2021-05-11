const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageTitle: '选择技术员',
    isShow: true,
    statusBarHeight: app.globalData.statusBarHeight,

    page: 1,
    pageNum: 8,
    list: []
  },
  bindTech: function (e) {
    let that = this;
    var token = that.data.token,
      uid = e.currentTarget.dataset.id,
      oid = that.data.oid;
    wx.showModal({
      title: '提示',
      content: '确认转单吗？',
      success: function (res) {
        if (res.confirm) {
          _cori.default.request('POST', 'Operator/bindTech', token, {
            oid: oid,
            uid: uid
          }).then(function (res) {
            wx.showToast({
              title: '转单成功',
              icon: 'success',
              duration: 1000,
              success: function () {
                setTimeout(function () {
                  wx.reLaunch({
                    url: '/pages/technology/task/administration',
                  })
                }, 1000)
              }
            })
          });
        }
      }
    })
  },
  getlist: function (token, page) {
    let that = this;
    var pageNum = that.data.pageNum,
      oid = that.data.oid;
    _cori.default.request('POST', 'Operator/getTechnicianList', token, {
      oid: oid,
      page: page,
      pageNum: pageNum
    }).then(function (res) {
      console.log('技术员列表', res.data);
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
    wx.showLoading({
      title: '加载中',
    })
    that.getlist(token, 1);
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