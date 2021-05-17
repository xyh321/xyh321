const app = getApp();
const _cori = require('../../../common/coriander.js')

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		pageType: 1,
		pageActive: 3,
		pageTitle: '意见反馈',
		isShow: false,
		statusBarHeight: app.globalData.statusBarHeight,

		textarea: '',
		name: '',
		phone: '',

	},
	onLoad: function(options) {
		let that = this;
		var statusBarHeight = that.data.statusBarHeight;
		that.setData({
			titleHeight: statusBarHeight + 6,
			titleHeight1: statusBarHeight + 6 + 40,
		})

	},
	//提交反馈
	submit: function() {
		var textarea = this.data.textarea,
			name = this.data.name,
			phone = this.data.phone;
		// console.log(textarea, name, phone);
		// return;
		if (!textarea) {
			wx.showToast({
				title: '反馈内容不可为空！',
				icon: 'none',
			})
			return false;
		}
		if (!name) {
			wx.showToast({
				title: '姓名不可为空！',
				icon: 'none',
			})
			return false;
		}
		if (!phone) {
			wx.showToast({
				title: '电话不可为空！',
				icon: 'none',
			})
			return false;
		}
		_cori.default.request('POST', 'sundry/feedBack', null, {
			text: textarea,
			name: name,
			mobile: phone,
		}).then(function(res) {
			console.log(res);
			if (res.data.code == 200) {
				wx.showToast({
					title: '提交成功!',
					icon: 'none'
				})
			}
		});
	},

	//获取 反馈内容，姓名，电话
	textarea: function(e) {
		this.setData({
			textarea: e.detail.value
		});
	},
	name: function(e) {
		this.setData({
			name: e.detail.value
		});
	},
	phone: function(e) {
		this.setData({
			phone: e.detail.value
		});
	},
	//清空
	clear: function() {
		let that = this;
		that.setData({
			textarea: '',
			name: '',
			phone: '',
		});
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
