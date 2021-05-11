let app = getApp();
let url = app.globalData.coriander_requset;

function coriander_request(method, control, authorization, data) {
  return new Promise(function (res) {
    if (method == 'POST') {
      // var contentType = 'application/x-www-form-urlencoded';
      var contentType = 'application/json';
    } else {
      var contentType = 'application/json';
    }
    var header = {
      'content-type': contentType
    }
    if(authorization) {
      var header = {
        'Authorization': authorization,
        'content-type': contentType
      }
    }
    wx.request({
      url: url + control,
      method: method,
      header: header,
      data: data,
      success: function (e) {
        res(e)
      },
      fail: function (e) {
        res(e)
      },
    })
  });
}

exports.default = {
  request: coriander_request,
};