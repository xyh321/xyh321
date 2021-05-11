const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({
  data: {
    pageType: 2,
    pageActive: 4,
    pageTitle: '个人主页',
    isShow: false,
    isHome: true,
    statusBarHeight: app.globalData.statusBarHeight,

    avatar: '../../../resource/ceshi.png',
    uid: 0,
    mobile: 1,
    nickname: '昵称',

    status: 1
  },
  getOnlineStatus: function (token) {
    let that = this;
    _cori.default.request('POST', 'Operator/getOnlineStatus', token).then(function (res) {
      console.log('获取在线状态', res.data.code);
      that.setData({
        status: res.data.data
      })
    });
  },
  setOnline: function (status) {
    let that = this;
    var token = that.data.token;
    _cori.default.request('POST', 'Operator/setOnline', token, {
      status: status
    }).then(function (res) {
      console.log('设置状态', res.data.code);
      wx.showToast({
        title: res.data.msg,
        icon: 'none'
      })
      if (res.data.code == 200) {
        that.getOnlineStatus(token)
      }
    });
  },
  changeStatus: function (e) {
    let that = this;
    wx.showActionSheet({
      itemList: ['在线', '离线'],
      success: function (res) {
        if (res.tapIndex) {
          that.setOnline(2);
        } else {
          that.setOnline(1);
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  getUserInfo: function (e) {
    let that = this;
    var userinfo = wx.getStorageSync('userinfo');
    console.log('userinfo', userinfo);
    if (!userinfo) {
      that.setData({
        isShowLogin: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var token = wx.getStorageSync('token');
    var userinfo = wx.getStorageSync('userinfo');
    if (token) {
      that.setData({
        avatar: userinfo.avatar,
        uid: userinfo.uid,
        nickname: userinfo.nickname,
        mobile: userinfo.mobile,
        group_id: userinfo.group_id,
        isShowLogin: false,
        token: token
      })
      that.getOnlineStatus(token)
    }
    var statusBarHeight = that.data.statusBarHeight;
    that.setData({
      titleHeight: statusBarHeight + 6,
      titleHeight1: statusBarHeight + 6 + 40,
    })
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