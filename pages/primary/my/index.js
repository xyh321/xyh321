const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({
	data: {
		pageType: 1,
		pageActive: 4,
		pageTitle: '个人主页',
		isShow: false,
		statusBarHeight: app.globalData.statusBarHeight,

		avatar: '../../../resource/ceshi.png',
		uid: 0,
		mobile: 1,
		nickname: '昵称',
	},
	getUserInfo: function(e) {
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
	onLoad: function(options) {
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
		}
		var statusBarHeight = that.data.statusBarHeight;
		that.setData({
			titleHeight: statusBarHeight + 6,
			titleHeight1: statusBarHeight + 6 + 40,
		})
	},

	//跳转到我的问题
	toProblem: function() {
		wx.navigateTo({
			url: 'problem',
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
