const app = getApp()
const _cori = require('../../../common/coriander.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageType: 2,
    // pageActive: 3,
    pageTitle: '巡检任务',
    isShow: false,
    isHome: true,
    statusBarHeight: app.globalData.statusBarHeight,

    statusList: [{
      id: 1,
      name: '待巡检',
      status: 1
    }, {
      id: 2,
      name: '巡检中',
      status: 2
    }, {
      id: 3,
      name: '已完成',
      status: 3
    }],
    currentStatus: 1,

    cori_root: app.globalData.cori_root,
    coriander_requset: app.globalData.coriander_requset,
    imgArr: [],

    page: 1,
    pageNum: 8,
    list: []
  },
  confirmTask: function (e) {
    let that = this;
    var path = that.data.imgArr,
      token = that.data.token,
      status = that.data.currentStatus,
      oid = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确认完成巡检吗？',
      success: function (res) {
        if (res.confirm) {
          if (!path.length) {
            wx.showToast({
              title: '请上传记录表',
              icon: 'none'
            })
            return false;
          }
          _cori.default.request('POST', 'Operator/confirmTask', token, {
            oid: oid,
            path: path
          }).then(function (res) {
            console.log('确认完成巡检任务', res.data);
            that.setData({
              page: 1,
              list: []
            })
            that.getlist(token, 1, status)
          });
        }
      }
    })
  },
  acceptTask: function (e) {
    let that = this;
    var oid = e.currentTarget.dataset.id,
      token = that.data.token,
      status = that.data.currentStatus;
    wx.showModal({
      title: '提示',
      content: '确认巡检吗？',
      success: function (res) {
        if (res.confirm) {
          _cori.default.request('POST', 'Operator/acceptTask', token, {
            oid: oid
          }).then(function (res) {
            console.log('确认接受巡检任务', res.data);
            that.setData({
              page: 1,
              list: []
            })
            that.getlist(token, 1, status)
          });
        }
      }
    })
  },
  oneImgUpload: function (e) {
    let that = this;
    var coriander_requset = that.data.coriander_requset,
      token = that.data.token,
      list = that.data.list,
      index = e.currentTarget.dataset.index,
      cori_root = that.data.cori_root;
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
            list[index].images.push(cori_root + res.data);
            that.setData({
              list: list
            })
          }
        })
      },
    })
  },
  shanchu: function (e) {
    let that = this;
    var list = that.data.list,
      index = e.currentTarget.dataset.index,
      indexs = e.currentTarget.dataset.indexs;
      list[index].images.splice(indexs, 1);
    that.setData({
      list: list
    });
  },
  changeStatus: function (e) {
    let that = this;
    var token = that.data.token,
      status = e.currentTarget.dataset.status;
    that.setData({
      currentStatus: status,
      list: [],
      page: 1
    })
    wx.showLoading({
      title: '加载中',
    })
    that.getlist(token, 1, status);
  },
  getlist: function (token, page, status) {
    let that = this;
    var pageNum = that.data.pageNum;
    _cori.default.request('POST', 'Operator/getTaskList', token, {
      page: page,
      pageNum: pageNum,
      status: status
    }).then(function (res) {
      console.log('巡检列表', res.data);
      var list = that.data.list,
        list_new = res.data.data;
      if (list_new.length) {
        that.setData({
          list: list.concat(list_new),
          page: page
        })
      } else {
        wx.showToast({
          title: '没有更多了~',
          icon: 'none'
        })
      }
      wx.hideLoading();
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var token = wx.getStorageSync('token'),
      status = that.data.currentStatus;
    var statusBarHeight = that.data.statusBarHeight;
    that.setData({
      titleHeight: statusBarHeight + 6,
      titleHeight1: statusBarHeight + 6 + 40,
      token: token
    })
    wx.showLoading({
      title: '加载中',
    })
    that.getlist(token, 1, status);
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
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    var token = that.data.token,
      page = that.data.page + 1,
      status = that.data.currentStatus;
    that.getlist(token, page, status);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})