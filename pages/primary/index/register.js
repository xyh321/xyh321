const app = getApp()
const _cori = require('../../../common/coriander.js')
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		pageType: 1,
		// pageActive: 2,
		pageTitle: '账号注册',
		isShow: true,
		statusBarHeight: app.globalData.statusBarHeight,

		code: '获取验证码',
		timer: 60,
		value: 1111,
		checked: false,
		//手机号码
		phoneNum: '',
		//短信验证码
		msgCode: '',
		//设置密码
		setPwd: '',
		//确认密码
		confirPassword: '',
		codeDisabled: false,
		
		companyName:"",
		index:"",
		personName:"",
		region:[]
	},
	//跳转到注册协议
	toRegisterDeal() {
		wx.navigateTo({
			url: 'registerDeal'
		})
	},
	getCodes: function(e) {
		var phoneNum = this.data.phoneNum,
			token = wx.getStorageSync('token');
		if (phoneNum == '') {
			Toast('请输入手机号码!');
			return;
		} else {
			var that = this;
			var times = 60
			var i = setInterval(function() {
				times--
				if (times > 0) {
					that.setData({
						codeDisabled: true,
						code: "重新获取验证码" + times + "s",
					})
				} else {
					clearInterval(i)
					that.setData({
						code: "重新获取验证码",
						codeDisabled: false
					})
				}
			}, 1000);
			_cori.default.request('POST', 'Sms/send', token, {
				event: "register",
				mobile: phoneNum
			}).then(function(res) {
				console.log(res);
			});
		}

	},
	//radio checked切换
	radiochange: function(e) {
		var checked = this.data.checked;
		this.setData({
			checked: !checked
		});
	},
	//手机号码
	phoneNum: function(e) {
		this.setData({
			phoneNum: e.detail.value
		});
	},
	//短信验证码
	msgCode: function(e) {
		this.setData({
			msgCode: e.detail.value
		});
	},
	//设置密码
	setPwd: function(e) {
		this.setData({
			setPwd: e.detail.value
		});
	},
	//确认密码
	confirmPwd: function(e) {
		this.setData({
			confirPassword: e.detail.value
		});
	},
	//立即注册
	register: function(e) {
		let that = this;
		var phoneNum = that.data.phoneNum,
			msgCode = that.data.msgCode,
			setPwd = that.data.setPwd,
			confirPassword = that.data.confirPassword,
			checked = that.data.checked,
			
			company = that.data.companyName,
			nature = that.data.index,
			nickname=that.data.personName,
			site = that.data.region,
			
			token = wx.getStorageSync('token');
		if (phoneNum == '') {
			Toast('请输入手机号码!');
			return;
		} else if (msgCode == '') {
			Toast('请输入短信验证码!');
			return;
		} else if (setPwd == '') {
			Toast('请输入密码!');
			return;
		} else if (confirPassword == '') {
			Toast('请输入确认密码!');
			return;
		} else if (checked == false) {
			Toast('请同意用户协议!');
			return;
		} else {
			console.log("手机", phoneNum);
			console.log("短信", msgCode);
			console.log("设置", setPwd);
			console.log("确认", confirPassword);
			console.log("协议", checked);
			_cori.default.request('POST', 'User/register', token, {
				password: setPwd,
				repeat: confirPassword,
				mobile: phoneNum,
				code: msgCode,
				company:company,
				nature:nature,
				nickname:nickname,
				site:site,
			}).then(function(res) {
				console.log(res.data);
			});
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
		console.log(options);
		var companyName = options.companyName,
			index = options.index,
			personName = options.personName,
			region = options.region;
			region.split(",");
			that.setData({
				companyName:companyName,
				index:index,
				personName:personName,
				region:region
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
