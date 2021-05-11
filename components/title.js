Component({
	properties: {
		// 这里定义了innerText属性，属性值可以在组件使用时指定
		//若驼峰法命名，组件使用页面需要用-；列:innerText => inner-text
		pageTitle: {
			type: String,
			value: '',
		},
		titleHeight: {
			type: Number,
			value: 0,
		},
		isShow: {
			type: Boolean,
			value: false
		},
		isHome: {
			type: Boolean,
			value: false
		}
	},
	data: {
		// 这里是一些组件内部数据
	},
	methods: {
		toHome: function(e) {
			wx.reLaunch({
				url: '/pages/primary/index/index',
			})
		}
	}
})
