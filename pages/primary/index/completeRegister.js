const app = getApp()
const _cori = require('../../../common/coriander.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pageType: 1,
		// pageActive: 1,
		pageTitle: '完善企业信息',
		isShow: true,
		statusBarHeight: app.globalData.statusBarHeight,

		index: 0,
		array: ['请选择企业性质', '企业/公司', '教育机构', '售后物业', '其他机构', '酒店餐饮'],

		region: ['省', '市', '区'],
		// customItem: '全部',
		changes: '',

		companyName: '',
		personName: '',

	},
	//获取企业名称
	companyName: function(e) {
		this.setData({
			companyName: e.detail.value
		})
	},
	//企业性质点击事件
	bindPickerChange: function(e) {
		// console.log(e);
		this.setData({
			index: e.detail.value,
		});
	},
	//获取负责人
	personName: function(e) {
		this.setData({
			personName: e.detail.value
		})
	},
	//地区选择
	bindRegionChange: function(e) {
		console.log(e);
		this.setData({
			region: e.detail.value,
			changes: e.type
		})
	},
	//下一步
	nextStep: function() {
		let that = this;
		var companyName = that.data.companyName,
			index = that.data.index,
			personName = that.data.personName,
			region = that.data.region,
			changes = that.data.changes;
		// console.log(typeof(region));
		if (companyName == '') {
			wx.showToast({
				title: '请填写企业名称！',
				icon: 'none'
			})
		} else if (index == 0) {
			wx.showToast({
				title: '请选择企业性质！',
				icon: 'none'
			})
		} else if (personName == '') {
			wx.showToast({
				title: '请填写负责人姓名！',
				icon: 'none'
			})
		} else if (changes == '') {
			wx.showToast({
				title: '请选择所在地区！',
				icon: 'none'
			})
		} else {
			wx.navigateTo({
				url: 'register?companyName=' + companyName + '&index=' + index + '&personName=' +
					personName + '&region=' + region,
			})
		}
	},

	//获取企业性质
	// getUnits: function() {
	// 	let that = this;
	// 	_cori.default.request('POST', 'Technician/getUnit', token, {
			
	// 	}).then(function(res) {
			
	// 	});
	// },

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
