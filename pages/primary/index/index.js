const app = getApp()
const _cori = require('../../../common/coriander.js')
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({
	data: {
		pageType: 1,
		pageActive: 1,
		pageTitle: '博学思资产报修',
		isShow: false,
		statusBarHeight: app.globalData.statusBarHeight,
		
		//轮播图列表
		bannerList: [],
		//企业展示列表
		companyList: [{
				image: '../../../icons/test.png',
				title: '山东界民科技'
			}, {
				image: '../../../icons/test.png',
				title: '山东界民科技'
			}, {
				image: '../../../icons/test.png',
				title: '山东界民科技'
			}, {
				image: '../../../icons/test.png',
				title: '山东界民科技'
			},{
				image: '../../../icons/test.png',
				title: '山东界民科技'
			},{
				image: '../../../icons/test.png',
				title: '山东界民科技'
			}
		],
		//分组id
		group_id: "",
	},

	onLoad: function(options) {
		let that = this;
		var statusBarHeight = that.data.statusBarHeight;
		that.setData({
			titleHeight: statusBarHeight + 6,
			titleHeight1: statusBarHeight + 6 + 40,
		});
		that.getBannerList();
		that.getCompanyList();
		that.getUserMsg();
	},

	//企业注册
	toRegister: function() {
		wx.navigateTo({
			url: 'completeRegister'
		})
	},
	//管理员弹框事件
	alert: function() {
		let that = this;
		var groupId = that.data.group_id;
		// console.log(groupId);
		if (groupId == 3) {
			wx.navigateTo({
				url: '../../technology/task/administration'
			})
		} else {
			wx.showModal({
				title: '温馨提示',
				content: '请让管理员邀请您成为技术员',
				success(res) {
					if (res.confirm) {
						// console.log('用户点击确定')
					} else if (res.cancel) {
						// console.log('用户点击取消')
					}
				}
			})
		}
	},

	//获取轮播图列表
	getBannerList: function() {
		let that = this;
		var token = wx.getStorageSync('token');
		_cori.default.request('POST', 'User/banner', null, {}).then(function(res) {
			// console.log(res.data.msg);
			that.setData({
				bannerList: res.data.msg
			})
		});
	},

	//获取企业展示列表
	getCompanyList: function() {
		let that = this;
		var token = wx.getStorageSync('token');
		_cori.default.request('POST', 'User/companyIntro', null, {}).then(function(res) {
			// console.log(res.data.msg);
			that.setData({
				companyList: res.data.msg
			})
		});
	},

	//获取用户信息
	getUserMsg: function() {
		let that = this;
		var token = wx.getStorageSync('token');
		_cori.default.request('POST', 'User/getUserinfo', token, {}).then(function(res) {
			// console.log(res.data.data);
			that.setData({
				group_id: res.data.data.group_id
			})
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

})
