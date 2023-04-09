//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    console.log(wx.getAppBaseInfo());
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: (res) => {
        console.log(res);
        //分配游客id
        this.globalData.userInfo.nickName =  this.generateUuid()
        wx.request({
          url: 'https://10.25.205.153:443/user/index/login',
          method: 'POST',
          header: {
            'Content-Type': "application/x-www-form-urlencoded",
          },
          data:{
            code: res.code
          },
          success(res){
            console.log(res);
            wx.setStorageSync('token', res.data.data.token);
          },
          fail(){
            console.log("code发送失败");
          }
        })
      },
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      console.log("测试");
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  //生成唯一不重复ID作为游客id
  generateUuid: function (length=5){
    return '游客' + Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
  },
  globalData:{
    userInfo:{
      nickName: '',
      name:'',
      avatarUrl: '/images/more/user.png',
      phone: '',
      id_card:'',
      gender: ''
    },
    hasUserInfo: false
  }
})