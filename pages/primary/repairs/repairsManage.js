const app = getApp()
const _cori = require('../../../common/coriander.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pageType: 1,
		// pageActive: 2,
		pageTitle: '设备报修管理',
		isShow: true,
		statusBarHeight: app.globalData.statusBarHeight,
		//query获取
		ids: "",
		type: "",
		facilityId: "",

		//设备信息列表
		messageList: {},
		//报修信息列表
		repairsList: [],

		name: "",
		phoneNumber: '',
		describe: '',
		repairsType: '',
		urgent: '',

		cori_root: app.globalData.cori_root,
		coriander_requset: app.globalData.coriander_requset,
		imgArr: []
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
		that.getEqList();
		var obj = wx.getLaunchOptionsSync(),
			ids = obj.query.ids,
			type = obj.query.type,
			facilityId = obj.query.facilityId;
		console.log(obj.query);
		that.setData({
			ids: ids,
			type: type,
			facilityId: facilityId
		})
	},

	//图片上传
	oneImgUpload: function(e) {
		let that = this;
		var coriander_requset = that.data.coriander_requset,
			token = wx.getStorageSync('token'),
			imgArr = that.data.imgArr;
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: function(res) {
				console.log('选择图片', res);
				var imgs = res.tempFilePaths[0];
				wx.uploadFile({
					url: coriander_requset + 'sundry/uploadImg',
					filePath: imgs,
					name: 'files',
					header: {
						'Authorization': token,
					},
					success(res) {
						var res = JSON.parse(res.data);
						console.error('res', res);
						imgArr.push(res.data);
						that.setData({
							imgArr: imgArr
						})
					}
				})
			},
		})
	},
	//图片上传删除
	shanchu: function(e) {
		let that = this;
		var imgArr = that.data.imgArr,
			index = e.currentTarget.dataset.index;
		imgArr.splice(index, 1);
		that.setData({
			imgArr: imgArr
		});
	},
	//确认提交
	submit: function() {
		let that = this;
		var token = wx.getStorageSync('token'),
			uid = that.data.ids,
			type = that.data.type,
			facilityId = that.data.facilityId,

			// bxType ="facility",
			name = that.data.name,
			mobile = that.data.phoneNumber,
			gzDescription = that.data.describe,
			mode = that.data.repairsType,
			degree = that.data.urgent,
			path = that.data.imgArr;
		_cori.default.request('POST', 'Technician/addGeneral', token, {
			type: type,
			uid: uid,
			name: name,
			mobile: mobile,
			gzDescription: gzDescription,
			mode: mode,
			degree: degree,
			facilityId: facilityId,
			path: path,
		}).then(function(res) {
			console.log(res);
			if (res.data.code == 200) {
				wx.navigateTo({
					url: '../myRepairs/myRepairs',
				})
			}
		});
	},
	//获取设备报修信息
	getEqList: function() {
		let that = this;
		var token = wx.getStorageSync('token'),
			uid = '1';
		_cori.default.request('POST', 'Technician/getFacility', token, {
			uid: uid
		}).then(function(res) {
			// console.log(res.data.data);
			that.setData({
				messageList: res.data.data
			})
		});


	},

	name: function(e) {
		this.setData({
			name: e.detail.value
		})
	},
	phoneNumber: function(e) {
		this.setData({
			phoneNumber: e.detail.value
		})
	},
	describe: function(e) {
		this.setData({
			describe: e.detail.value
		})
	},
	repairsType: function(e) {
		this.setData({
			repairsType: e.detail.value
		})
	},
	urgent: function(e) {
		this.setData({
			urgent: e.detail.value
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
