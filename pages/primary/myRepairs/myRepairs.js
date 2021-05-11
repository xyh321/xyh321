const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pageType: 1,
		pageActive: 2,
		//触底加载
		page: 1,
		limit: 8,

		length:"",
		pageTitle: '我的报修',
		isShow: true,
		statusBarHeight: app.globalData.statusBarHeight,
		//顶部tabs			2是技术员确认接单 6是用户确认完成
		statusList: [{
				id: 1,
				name: '待分配',
				status: 1
			}, {
				id: 2,
				name: '待确认',
				status: 2
			},{
				id: 7,
				name: '已完成',
				status: 7
			}],
		currentStatus: 1,
		//报修列表
		repairList: [],
		//可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
		hiddenmodalput: true,
		//订单id
		oid: "",
		//撤销原因
		cancelReason: '',
	},
	//更改头部状态栏
	changeStatus: function(e) {
		// console.log(e.currentTarget.dataset.status);
		let that = this;
		var token = wx.getStorageSync('token'),
			status = e.currentTarget.dataset.status,
			limit = that.data.limit;
		that.setData({
			currentStatus: status,
			repairList: [],
			page: 1
		});
		that.getList(token, limit, status, 1);
	},
	//获取报修列表
	getList: function(token, limit, status, page) {
		let that = this;
		_cori.default.request('POST', 'Technician/getRepairsList', token, {
			page: page,
			limit: limit,
			status: status,
		}).then(function(res) {
			// console.log(res.data.data.length);
			that.setData({
				length:res.data.data.length
			});
			var repairList = that.data.repairList,
				repairList_new = res.data.data;
			if (repairList_new.length) {
				that.setData({
					repairList: repairList.concat(repairList_new),
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
	//撤销工单
	cancelOrder: function(e) {
		let that = this;
		var token = wx.getStorageSync('token'),
			oid = that.data.oid,
			status = that.data.currentStatus,
			limit = that.data.limit,
			reason = that.data.cancelReason;
		_cori.default.request('POST', 'Technician/cancelOrder', token, {
			oid: oid,
			reason: reason
		}).then(function(res) {
			console.log(res);
			that.getList(token, limit, status, 1);
		});
	},
	//确认完成
	confirmOrder: function(e) {
		console.log(e);
		let that = this;
		var token = wx.getStorageSync('token'),
			oid = e.currentTarget.dataset.id,
			status = that.data.currentStatus,
			limit = that.data.limit;
		_cori.default.request('POST', 'Technician/confirmOrder', token, {
			oid: oid
		}).then(function(res) {
			console.log(res);
			// that.getList(token, limit, status, page);
		});
	},

	//to报修进度
	toStep: function(e) {
		// console.log(e.target.dataset.id);
		var id = e.target.dataset.id;
		wx.navigateTo({
			url: 'step?id=' + id
		})
	},
	//to评价
	toAppraise: function(e) {
		// console.log(e);
		var id = e.currentTarget.dataset.id;
		// return;
		wx.navigateTo({
			url: 'appraise?id=' + id
		})
	},
	//to意见反馈
	toFeedback: function() {
		wx.navigateTo({
			url: '../my/feedback'
		})
	},
	//hiddenmodalput弹出事件  
	modalinput: function(e) {
		// console.log(e);
		this.setData({
			hiddenmodalput: !this.data.hiddenmodalput,
			oid: e.currentTarget.dataset.id
		})
	},
	//取消
	cancel: function() {
		this.setData({
			hiddenmodalput: true
		});
		console.log("取消");
	},
	//确认
	confirm: function() {
		// console.log(e.currentTarget.dataset.status);
		let that = this;
		that.setData({
			hiddenmodalput: true
		});
		that.cancelOrder();
		
		var token = wx.getStorageSync('token'),
			limit = that.data.limit,
			status = that.data.currentStatus;
		that.setData({
			repairList: [],
		});
		that.getList(token, limit, status, 1);
		// console.log("textarea", this.data.cancelReason);
	},
	//撤销原因
	textareas: function(e) {
		this.setData({
			cancelReason: e.detail.value
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let that = this;
		var statusBarHeight = that.data.statusBarHeight,
			token = wx.getStorageSync('token'),
			page = that.data.page,
			limit = that.data.limit,
			status = that.data.currentStatus;
		that.setData({
			titleHeight: statusBarHeight + 6,
			titleHeight1: statusBarHeight + 6 + 40,
		});
		that.getList(token, limit, status, 1);
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
		let that = this;
		var token = wx.getStorageSync('token'),
			status = that.data.currentStatus,
			page = that.data.page + 1,
			limit = that.data.limit;
		// console.error('page', page);
		wx.showLoading({
			title: '加载中',
		})
		that.getList(token, limit, status, page);
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
