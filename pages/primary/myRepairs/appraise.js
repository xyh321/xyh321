const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pageType: 1,
		pageActive: 2,
		pageTitle: '用户服务评价',
		isShow: true,
		statusBarHeight: app.globalData.statusBarHeight,

		value: 0,
		value2: 0,
		value3: 0,
		textarea: '',
		chooseList: [],
		//选中的数组
		selectedArr: []
		// id: ''

	},
	//获取评价关键词
	getAppraiseWord: function() {
		let that = this;
		var token = wx.getStorageSync('token');
		_cori.default.request('POST', 'Technician/getEvaluateWord', token, {}).then(function(res) {
			// console.log(res.data.data);
			var List = res.data.data;
			List.forEach(function(item) {
				// console.log(item);
				item.checked = false
			});
			that.setData({
				List: List
			})
		});
	},
	choose(e) {
		let that = this;
		var index = e.currentTarget.dataset.index,
			List = that.data.List;
		List[index].checked = !List[index].checked;
		that.setData({
			List: List
		})
	},
	//处理时效
	onChange(event) {
		this.setData({
			value: event.detail
		});
		var value = this.data.value;
		// console.log("处理时效", value);
	},
	//服务态度
	onChange2(event) {
		this.setData({
			value2: event.detail
		});
		var value2 = this.data.value2;
		// console.log("服务态度", value2);
	},
	//技术水平
	onChange3(event) {
		this.setData({
			value3: event.detail
		});
		var value3 = this.data.value3;
		// console.log("技术水平", value3);
	},

	textarea: function(e) {
		this.setData({
			textarea: e.detail.value
		});
	},
	//评价
	appraise: function(e) {
		let that = this;
		var token = wx.getStorageSync('token'),
			textarea = that.data.textarea,
			value = that.data.value,
			value2 = that.data.value2,
			value3 = that.data.value3,
			oid = that.data.id,
			selectedArr = that.data.selectedArr;
		var str = selectedArr.join(",");

		var trueArr = [],
			List = that.data.List;
		console.log(List);
		// for (let index = 0; index < List.length; index++) {
		// 	if (List[index].checked) {
		// 		trueArr.push(List[index].name)
		// 	};
		// };
		List.forEach(function(item, index, array) {
			console.log();
			if (array[index].checked) {
				trueArr.push(List[index].name)
			}

		});
		var trueStr = trueArr.join(",");

		// console.log(trueStr);
		_cori.default.request('POST', 'Technician/evaluate', token, {
			oid: oid,
			time_star: value,
			atti_star: value2,
			effect_star: value3,
			word: trueStr,
			cont: textarea
		}).then(function(res) {
			console.log(res);
			if(res.data.code==200){
				wx.navigateTo({
					url: '../myRepairs/myRepairs',
				})
			}
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
		this.getAppraiseWord();
		var id = options.id;
		that.setData({
			id: id
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
