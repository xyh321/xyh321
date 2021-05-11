const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageTitle: '选择配件',
    isShow: true,
    statusBarHeight: app.globalData.statusBarHeight,

    partsArray: [],
    parts: [{
      idx: null,
      name: '',
      nums: null
    }]
  },
  claimant: function (e) {
    let that = this;
    var value = e.detail.value;
    that.setData({
      claimant: value
    })
  },
  section: function (e) {
    let that = this;
    var value = e.detail.value;
    that.setData({
      section: value
    })
  },
  getConsumeList: function (token) {
    let that = this;
    _cori.default.request('POST', 'Operator/getConsumeList', token).then(function (res) {
      console.log('res', res)
      that.setData({
        partsArray: res.data.data
      })
    });
  },
  changeNums: function (e) {
    let that = this;
    var index = e.currentTarget.dataset.index,
      nums = e.detail.value,
      parts = that.data.parts;
    parts[index].nums = nums * 1
    that.setData({
      parts: parts
    })
  },
  addParts: function (e) {
    let that = this;
    var parts = that.data.parts;
    parts = parts.concat({
      idx: null,
      name: '',
      nums: null
    })
    that.setData({
      parts: parts
    })
  },
  delParts: function (e) {
    let that = this;
    var parts = that.data.parts,
      index = e.currentTarget.dataset.index;
    parts.splice(index, 1)
    that.setData({
      parts: parts
    })
  },
  partsChange: function (e) {
    let that = this;
    var parts = that.data.parts,
      partsArray = that.data.partsArray,
      index = e.currentTarget.dataset.index,
      vid = e.detail.value;
    for (const p of parts) {
      if (p.idx == vid) {
        wx.showToast({
          title: '您已选择' + partsArray[vid].name + ',请不要重复选择',
          icon: 'none'
        })
        return false;
      }
    }
    parts[index].idx = vid * 1
    parts[index].name = partsArray[vid].name
    that.setData({
      parts: parts
    })
  },
  addConsumeApply: function (e) {
    let that = this;
    var parts = that.data.parts,
      partsArray = that.data.partsArray,
      length = parts.length,
      partsNew = [];
    console.log('parts', parts);
    for (let index = 0; index < length; index++) {
      if (parts[index].idx != null) {
        partsNew.push(parts[index])
      }
    }
    console.log('xxx', partsNew)
    for (let i = 0; i < partsNew.length; i++) {
      console.log('~~~', partsNew[i]);
      partsNew[i].id = partsArray[partsNew[i].idx].id
    }
    console.error('partsNew', partsNew)

    var token = that.data.token,
      oid = that.data.oid,
      code = that.data.code,
      claimant = that.data.claimant,
      section = that.data.section;

    if (!claimant) {
      wx.showToast({
        title: '请输入提交人姓名',
        icon: 'none'
      })
      return false;
    }

    if (!section) {
      wx.showToast({
        title: '请输入提交部门',
        icon: 'none'
      })
      return false;
    }

    for (let i = 0; i < partsNew.length; i++) {
      if (!partsNew[i].nums) {
        wx.showToast({
          title: '请输入' + partsNew[i].name + '配件的数量',
          icon: 'none'
        })
        return false;
      }
    }

    _cori.default.request('POST', 'Operator/addConsumeApply', token, {
      oid: oid,
      code: code,
      claimant: claimant,
      section: section,
      parts: JSON.stringify(partsNew)
    }).then(function (res) {
      console.log('保存配件申请', res)
      if (res.data.code == 200) {
        var msg = '提交成功';
      } else {
        var msg = '提交失败';
      }
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 1000,
        success: function () {
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/technology/task/administration',
            })
          }, 1000)
        }
      })
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var token = wx.getStorageSync('token'),
      code = options.code,
      oid = options.oid;
    var statusBarHeight = that.data.statusBarHeight;
    that.setData({
      titleHeight: statusBarHeight + 6,
      titleHeight1: statusBarHeight + 6 + 40,
      token: token,
      oid: oid,
      code: code
    })
    that.getConsumeList(token)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})