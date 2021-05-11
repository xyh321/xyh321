const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// pageType: 1,
		// pageActive: 1,
		pageTitle: '邀请成为技术员',
		isShow: false,
		statusBarHeight: app.globalData.statusBarHeight,

		uid: '',
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

		var obj = wx.getLaunchOptionsSync(),
			ids = obj.query.ids;
		that.setData({
			uid: ids
		})
		console.log('——启动小程序的 query 参数:', obj.query);
		that.invitation();
	},

	invitation: function() {
		let that = this;
		var token = wx.getStorageSync('token'),
			uid = that.data.uid;
		console.log(uid);
		wx.showModal({
			title: '温馨提示',
			content: '是否接受成为技术员',
			success(res) {
				if (res.confirm) {
					_cori.default.request('POST', 'Technician/doTechnician', token, {
						uid: uid
					}).then(function(res) {
						// console.log(res.data.code);
						var code = res.data.code;
						if (code == 200 || code == 400) {
							wx.navigateTo({
								url: 'index'
							})
						}
					});
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
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
