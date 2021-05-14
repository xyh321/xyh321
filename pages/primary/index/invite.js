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
		var statusBarHeight = that.data.statusBarHeight;
		that.setData({
			titleHeight: statusBarHeight + 6,
			titleHeight1: statusBarHeight + 6 + 40,
		});

		var token = wx.getStorageSync('token');
		var userinfo = wx.getStorageSync('userinfo');
		if (!token) {
			wx.showModal({
				content: '请您先登录！',
				icon: 'none',
				success(res) {
					if (res.confirm) {
						that.getUserInfo();
						that.setData({
							isShowLogin: true,
							token: token
						});
						var ids = options.ids;
						wx.setStorageSync('ids', ids);
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		} else if (token) {
			that.setData({
				isShowLogin: false
			});
			var ids = options.id;
			// var ids = wx.setStorageSync('ids', ids);
			that.invitation(token, ids);
		}
	},

	invitation: function(token, ids) {
		let that = this;
		var token = wx.getStorageSync('token'),
			uid = wx.getStorageSync('ids');
		wx.showModal({
			content: '是否接受成为技术员',
			success(res) {
				if (res.confirm) {
					_cori.default.request('POST', 'Technician/doTechnician', token, {
						uid: uid
					}).then(function(res) {
						// console.log(res.data.code);
						var code = res.data.code;
						if (code == 200) {
							wx.showToast({
								title: '绑定成功!',
								icon: 'none'
							});
							setTimeout(function() {
								wx.navigateTo({
									url: 'index'
								})
							}, 1000);
						} else if (code == 400) {
							wx.showToast({
								title: '该账号已绑定技术员!',
								icon: 'none'
							});
							setTimeout(function() {
								wx.navigateTo({
									url: 'index'
								})
							}, 1000);
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
