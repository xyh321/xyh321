const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pageType: 1,
		pageActive: 2,
		pageTitle: '报修进度',
		isShow: true,
		statusBarHeight: app.globalData.statusBarHeight,
		oid: '',

		stepsList: [],
		active: 0,
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
		});
		// console.log(options.id);
		that.setData({
			oid:options.id
		});
		that.getStepList();
	},
	//获取报修进度
	getStepList: function() {
		let that = this;
		var token = wx.getStorageSync('token'),
					oid = that.data.oid;
		_cori.default.request('POST', 'Operator/schedule', token, {
			oid: oid
		}).then(function(res) {
			console.log(res);
			that.setData({
				stepsList: res.data.data.schedule
			})
		});
	},

	clickDetail: function(event) {
		// console.log(event.detail);
		this.setData({
			active: event.detail
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
