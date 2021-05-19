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

		companyIndex: null,
		companyArray: [],
		companyId: '',

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
		let that = this;
		this.setData({
			companyIndex: e.detail.value,
		});
		var list = that.data.companyArray,
			companyIndex = that.data.companyIndex;
		if (companyIndex !== null) {
			that.setData({
				companyId: list[companyIndex].id
			})
		}
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
			index = that.data.companyId,
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
	getCompnyNature: function() {
		let that = this;
		var token = wx.getStorageSync('token');
		_cori.default.request('POST', 'User/getCompnyNature', token, {}).then(function(res) {
			var List = res.data.data;
			console.log("企业性质", List);
			that.setData({
				companyArray: List,
			})

		});
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
		that.getCompnyNature();
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
