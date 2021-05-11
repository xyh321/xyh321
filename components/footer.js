Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    //若驼峰法命名，组件使用页面需要用-；列:innerText => inner-text
    pageType: {
      type: Number,
      value: 1,
    },pageActive: {
      type: Number,
      value: 0,
    }
  },
  data: {
    // 这里是一些组件内部数据
  },
  methods: {
    jump: function (e) {
      var url = e.currentTarget.dataset.url;
      wx.reLaunch({
        url: url,
      })
    }
  }
})