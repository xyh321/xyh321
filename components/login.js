Component({
	properties: {
		// 这里定义了innerText属性，属性值可以在组件使用时指定
		//若驼峰法命名，组件使用页面需要用-；列:innerText => inner-text
		isShowLogin: {
			type: Boolean,
			value: false,
		}
	},
	data: {
		// 这里是一些组件内部数据
		step: 1,
		avatarUrl: null,
		nickName: null,
		gender: null,
		country: null,
		province: null,
		city: null,
		session_key: null,
		openid: null
	},
	methods: {
		cancel: function(e) {
			var isShowLogin = this.data.isShowLogin
			this.setData({
				isShowLogin: !isShowLogin,
				step: 1,
				avatarUrl: null,
				nickName: null,
				gender: null,
				country: null,
				province: null,
				city: null,
				session_key: null,
				openid: null,
			})
		},
		getUserProfile(e) {
			let that = this;
			const _cori = require('../common/coriander.js');
			wx.login({
				success(res) {
					console.log('res', res);
					that.setData({
						code: res.code
					})
				},
				fail: function(res) {
					console.log('获取临时code失败！' + res.errMsg)
				}
			})
			wx.getUserProfile({
				lang: 'zh_CN',
				desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success: (res0) => {
					var userInfo = res0.userInfo,
						code = that.data.code;
					console.error('getUserProfile', userInfo)
					var avatarUrl = userInfo.avatarUrl,
						nickName = userInfo.nickName,
						gender = userInfo.gender,
						country = userInfo.country,
						province = userInfo.province,
						city = userInfo.city;
					_cori.default.request('GET', 'User/wxLogin', null, {
						js_code: code,
					}).then(function(res) {
						console.log('getUserInfoStep1--res', res);
						var session_key = res.data.data.session_key;
						var openid = res.data.data.openid;
						wx.setStorageSync('openid', openid);
						that.setData({
							step: 2,
							avatarUrl: avatarUrl,
							nickName: nickName,
							gender: gender,
							country: country,
							province: province,
							city: city,
							session_key: session_key,
							openid: openid
						})
					});
				}
			})
		},
		getUserInfoStep2: function(e) {
			let that = this;
			const _cori = require('../common/coriander.js');
			var avatarUrl = that.data.avatarUrl,
				nickName = that.data.nickName,
				gender = that.data.gender,
				openid = that.data.openid,
				session_key = that.data.session_key,
				iv = e.detail.iv,
				en_data = e.detail.encryptedData;
			console.error('getUserInfoStep2---e', e)
			_cori.default.request('POST', 'User/wxUserInfo', null, {
				iv: iv,
				session_key: session_key,
				encryptedData: en_data,
				avatar: avatarUrl,
				nickname: nickName,
				openid: openid,
				gender: gender,
			}).then(function(res) {
				console.log('getUserInfoStep2--res', res);
				var token = res.data.data.token;
				console.log('token', token);
				if (token) {
					_cori.default.request('POST', 'User/getUserinfo', token).then(function(res) {
						console.log('用户信息返回', res);
						wx.setStorageSync('token', token);
						wx.setStorageSync('userinfo', res.data.data);
						that.triggerEvent('changeNaviIndex');
						wx.hideLoading()
					});
				}
			});
		}
	}
})
