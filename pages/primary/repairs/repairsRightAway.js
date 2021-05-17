const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		pageType: 1,
		// pageActive: 2,
		pageTitle: '立刻报修',
		isShow: true,
		statusBarHeight: app.globalData.statusBarHeight,

		index: 0,
		//报修分类
		ids: '',
		bxType: '',

		unit: "",
		apartment: "",

		type: '',
		name: '',
		phoneNumber: '',
		address: '',
		describe: '',
		repairsType: '',
		urgent: '',
		queryArr: [],

		unitIndex: null,
		unitArray: [],

		apartIndex: 0,
		apartArray: [],

		gzIndex: null,
		gzArray: [],
		gzType: "",

		listArr: [],

		cori_root: app.globalData.cori_root,
		coriander_requset: app.globalData.coriander_requset,
		imgArr: []

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

		var ids = options.ids,
			type = options.type;
		if (ids) {
			wx.setStorageSync('ids', ids);
			wx.setStorageSync('type', type);
		}
		var token = wx.getStorageSync('token');
		if (!token) {
			wx.showModal({
				content: '请您先登录！',
				icon: 'none',
				success(res) {
					if (res.confirm) {
						that.getUserInfo();
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			});
		} else if (token) {
			// console.log(options);
			that.setData({
				ids: options.ids,
				bxType: options.type,
				isShowLogin: false
			});
			var type = options.type;
			that.getUnits(token, wx.getStorageSync('ids'));
			that.getGzType(token, wx.getStorageSync('ids'));
		}
	},

	//获取报修单位,部门
	getUnits: function(token, uid) {
		let that = this;
		_cori.default.request('POST', 'Technician/getUnit', token, {
			uid: uid
		}).then(function(res) {
			console.log('getUnits', res.data.data);
			var unitArr = [],
				listArr = res.data.data;

			listArr.forEach(function(item, index) {
				unitArr.push(item.name);
				// apartArr.push(item.section);
			});

			// for (let index = 0; index < apartArr.length; index++) {
			// 	console.log(apartArr[index]);
			// };
			that.setData({
				unitArray: unitArr,
				listArr: listArr
				// apartArray: apartArr
			});
		});
	},

	//获取故障类型
	getGzType: function(token, uid) {
		let that = this;
		_cori.default.request('POST', 'Technician/getGzType', token, {
			uid: uid
		}).then(function(res) {
			console.log('getGzType', res.data.data);
			var gzArray = [],
				newsArray = res.data.data;
			newsArray.forEach(function(item, index) {
				gzArray.push(item);
				// apartArr.push(item.section);
			});

			console.log('gzArray', gzArray);
			that.setData({
				gzArray: gzArray
			});
		});
	},

	inputs: function(e) {
		console.log(e);
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
							imgArr: imgArr,
						});
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

	//报修单位点击事件
	bindUnit: function(e) {
		console.log(e);
		let that = this;
		var listArr = that.data.listArr,
			unitIndex = e.detail.value,
			apartIndex = that.data.apartIndex;
		// console.log(listArr);
		var apartArray = listArr[unitIndex].section
		that.setData({
			unitIndex: unitIndex,
			apartArray: apartArray,
			//id
			unit: listArr[unitIndex].id,
			apartment: listArr[unitIndex].section[apartIndex].id
		});
	},
	//报修部门点击事件
	apartments: function(e) {
		// console.log(e);
		let that = this;
		var apartIndex = e.detail.value,
			unitIndex = that.data.unitIndex,
			listArr = that.data.listArr;
		// console.log(listArr);
		that.setData({
			apartIndex: apartIndex,
			apartment: listArr[unitIndex].section[apartIndex].id
		})
		var a = listArr[unitIndex].section[apartIndex].id;
		console.log(a);
	},
	//故障类型点击事件
	gzTypes: function(e) {
		console.log(e);
		let that = this;
		var gzArray = that.data.gzArray,
			gzIndex = e.detail.value;
		// var gzArrays = gzArray[gzIndex].name;
		console.error('gzArray', gzArray);
		that.setData({
			gzIndex: gzIndex,
			gzType: gzArray[gzIndex].id,
		});
	},
	//确认提交
	confirmUpload: function() {
		let that = this;
		var token = wx.getStorageSync('token'),

			type = wx.getStorageSync('type'),
			uid = wx.getStorageSync('ids'),
			bxType = that.data.bxType,

			unit = that.data.unit,
			section = that.data.apartment,

			gzType = that.data.gzType,
			name = that.data.name,
			mobile = that.data.phoneNumber,
			site = that.data.address,
			gzDescription = that.data.describe,
			mode = that.data.repairsType,
			degree = that.data.urgent,

			path = that.data.imgArr;
		if (!unit) {
			wx.showToast({
				title: '报修单位为空',
				icon: 'none',
			})
			return false;
		};
		if (!section) {
			wx.showToast({
				title: '报修部门为空',
				icon: 'none',
			})
			return false;
		}
		if (!gzType) {
			wx.showToast({
				title: '故障类型为空',
				icon: 'none',
			})
			return false;
		}
		if (!name) {
			wx.showToast({
				title: '姓名不可为空',
				icon: 'none',
			})
			return false;
		}
		if (mobile.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(mobile)) {
			wx.showToast({
				title: '手机号格式有误',
				icon: 'none',
			})
			return false;
		};
		if (!site) {
			wx.showToast({
				title: '地点不可为空',
				icon: 'none',
			})
			return false;
		}
		if (!gzDescription) {
			wx.showToast({
				title: '故障描述不可为空',
				icon: 'none',
			})
			return false;
		}
		if (!mode) {
			wx.showToast({
				title: '报修方式未选择',
				icon: 'none',
			})
			return false;
		}
		if (!degree) {
			wx.showToast({
				title: '紧急程度未选择',
				icon: 'none',
			})
			return false;
		}
		if (!path) {
			wx.showToast({
				title: '上传故障图片不可为空',
				icon: 'none',
			})
			return false;
		}

		_cori.default.request('POST', 'Technician/addGeneral', token, {
			type: type,
			uid: uid,
			bxType: bxType,

			unit: unit,
			section: section,

			gzType: gzType,
			name: name,
			mobile: mobile,
			site: site,
			gzDescription: gzDescription,
			mode: mode,
			degree: degree,
			path: path
		}).then(function(res) {
			console.log(res);
			if (res.data.code == 200) {
				wx.showToast({
					title: '提交成功！',
					icon: 'none',
				});
				setTimeout(function() {
					wx.navigateTo({
						url: '../myRepairs/myRepairs',
					})
				}, 1500);
			}
		});
	},


	unit: function(e) {
		this.setData({
			unit: e.detail.value
		})
	},
	type: function(e) {
		this.setData({
			type: e.detail.value
		})
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
	address: function(e) {
		this.setData({
			address: e.detail.value
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
