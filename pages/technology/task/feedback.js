const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageTitle: '维修反馈',
    isShow: true,
    statusBarHeight: app.globalData.statusBarHeight,

    cori_root: app.globalData.cori_root,
    coriander_requset: app.globalData.coriander_requset,

    repaireTime: '',
    spendtime: '',
    desc: '',
    result: 0,
    name: '',
    mobile: '',
    address: '',
    path: [],
  },
  spendtime: function (e) {
    let that = this;
    var value = e.detail.value;
    that.setData({
      spendtime: value
    })
  },
  desc: function (e) {
    let that = this;
    var value = e.detail.value;
    that.setData({
      desc: value
    })
  },
  name: function (e) {
    let that = this;
    var value = e.detail.value;
    that.setData({
      name: value
    })
  },
  mobile: function (e) {
    let that = this;
    var value = e.detail.value;
    that.setData({
      mobile: value
    })
  },
  oneImgUpload: function (e) {
    let that = this;
    var coriander_requset = that.data.coriander_requset,
      token = that.data.token,
      path = that.data.path;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
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
            path.push(res.data);
            that.setData({
              path: path
            })
          }
        })
      },
    })
  },
  shanchu: function (e) {
    let that = this;
    var path = that.data.path,
      index = e.currentTarget.dataset.index;
    path.splice(index, 1);
    that.setData({
      path: path
    });
  },
  getAddress: function (e) {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        var lat = res.latitude,
          lng = res.longitude,
          location = lat + ',' + lng;
        var key = app.globalData.key;
        console.log('location', location);

        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + location + '&key=' + key,
          method: 'GET',
          success: function (res) {
            console.log('@位置接口返回res', res);
            console.log('@位置接口返回', res.data.result.location);
            console.log('@位置接口返回1', res.data.result.address);
            console.log('@位置接口返回2', res.data.result.formatted_addresses.recommend);
            that.setData({
              address: res.data.result.address + res.data.result.formatted_addresses.recommend
            })
          }
        })
      }
    })
  },
  changeRepair: function (e) {
    let that = this;
    var value = e.currentTarget.dataset.value;
    that.setData({
      result: value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      repaireTime: e.detail.value
    })
  },
  addFeedback: function (e) {
    let that = this;
    var token = that.data.token,
      oid = that.data.oid,
      repaireTime = that.data.repaireTime,
      spendtime = that.data.spendtime,
      desc = that.data.desc,
      result = that.data.result,
      name = that.data.name,
      mobile = that.data.mobile,
      address = that.data.address,
      path = that.data.path;
    if (!repaireTime) {
      wx.showToast({
        title: '请选择维修日期',
        icon: 'none'
      })
      return false;
    }
    if (!spendtime) {
      wx.showToast({
        title: '请输入维修耗时',
        icon: 'none'
      })
      return false;
    }
    if (!desc) {
      wx.showToast({
        title: '请输入维修描述',
        icon: 'none'
      })
      return false;
    }
    if (!result) {
      wx.showToast({
        title: '请选择维修结果',
        icon: 'none'
      })
      return false;
    }
    if (!name) {
      wx.showToast({
        title: '请输入技术员姓名',
        icon: 'none'
      })
      return false;
    }
    if (mobile.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(mobile)) {
      wx.showToast({
        title: '联系方式有误',
        icon: 'none'
      })
      return false;
    }
    if (!address) {
      wx.showToast({
        title: '请获取签到地址',
        icon: 'none'
      })
      return false;
    }
    if (!path.length) {
      wx.showToast({
        title: '请上传至少一张现场照片',
        icon: 'none'
      })
      return false;
    }
    _cori.default.request('POST', 'Operator/addFeedback', token, {
      oid: oid,
      repaireTime: repaireTime,
      spendtime: spendtime,
      desc: desc,
      result: result,
      name: name,
      mobile: mobile,
      address: address,
      path: path
    }).then(function (res) {
      wx.showToast({
        title: '反馈成功',
        icon: 'success',
        duration: 1000,
        success: function () {
          wx.reLaunch({
            url: '/pages/technology/task/administration',
          })
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
      userinfo = wx.getStorageSync('userinfo'),
      oid = options.oid;
    var statusBarHeight = that.data.statusBarHeight;
    that.setData({
      titleHeight: statusBarHeight + 6,
      titleHeight1: statusBarHeight + 6 + 40,
      token: token,
      oid: oid,
      name: userinfo.nickname,
      mobile: userinfo.mobile
    })
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