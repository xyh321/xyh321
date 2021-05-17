const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pageTitle: '常见问题',
		isShow: true,
		statusBarHeight: app.globalData.statusBarHeight,
	},
	//to用户须知
	toUserKnows: function() {
		wx.navigateTo({
			url: '/pages/primary/index/userKnows'
		})
	},
	//to用户常见问题
	toProblem: function() {
		wx.navigateTo({
			url: '/pages/primary/my/commonProblem'
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let that = this;
		var statusBarHeight = that.data.statusBarHeight;
		that.setData({
			titleHeight: statusBarHeight + 6,
			titleHeight1: statusBarHeight + 6 + 40,
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
