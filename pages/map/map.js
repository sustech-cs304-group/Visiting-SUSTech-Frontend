// pages/map/map.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  //点击事件处理
  skipToDetails: function (e) {
    console.log("click" + e.markerId)
    //跳转
    wx.navigateTo({
      url: '../record_details/record_details?id=' + e.markerId　//详情
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
  }
})

wx.getLocation({
  type: 'gcj02',
  altitude: true,
  //定位成功，更新定位结果      
  success: function (res) {
    var latitude = res.latitude
    var longitude = res.longitude
    var speed = res.speed
    var accuracy = res.accuracy
    that.setData({//赋值
      longitude: longitude,
      latitude: latitude,
      speed: speed,
      accuracy: accuracy
    })
  }, //定位失败回调      
  fail: function () {
    wx.hideLoading();
    console.log("getLocationFail")
  },
  complete: function () {
    //隐藏定位中信息进度       
    wx.hideLoading()
  }
})

wx.showLoading({
  title: '加载中',
  mask: true
})

//请求所有点
wx.request({
  url: 'http://192.168.14.62:8080/map.json',
  data: {

  },
  method: "GET",
  header: {
    "content-type": "application/json"
  },
  success: function (res) {
    console.log(res.data.location)
    var location = res.data.location;
    var mks = [];
    if ("" != res.data.location || res.data.location != null) {
      for (var i = 0; i < location.length; i++) {
        mks.push({ //赋值数组
          id: location[i].id,
          latitude: location[i].latitude,
          longitude: location[i].longitude,
          iconPath: '../../images/anchor.png', //图标路径
          width: 30,
          height: 30
        })
      }
      that.setData({
        markers: mks
      }), wx.hideLoading();
    }

  }
})