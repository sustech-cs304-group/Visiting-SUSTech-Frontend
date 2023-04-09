//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    console.log(wx.getAppBaseInfo());
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('isNew', true)
    wx.login({
      success: (res) => {
        console.log(res);
        //分配游客id
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
    }),
    this.checkNewUser();
  },
  checkNewUser:function(e){
    var that = this;
        wx.request({
          url: 'https://10.25.205.153:443/user/person-info/query',
          method:'GET',
          header: {
            'Authorization': wx.getStorageSync('token'),
            'Content-Type': "application/x-www-form-urlencoded"
          },
          success(res){
            console.log(res);
            if(res.data.data.name==""){
               console.log("新用户");
               that.globalData.userInfo.nickName = generateUuid();
            }else{
              console.log("老用户");
              that.globalData.userInfo.nickName = res.data.data.nickname;
              that.globalData.userInfo.name = res.data.data.name;
              that.globalData.userInfo.avatarUrl = res.data.data.avatarUrl;
              that.globalData.userInfo.phone = res.data.data.phone;
              that.globalData.userInfo.id_card = res.data.data.identityCard;
              that.globalData.userInfo.gender = (res.data.data.gender==0)?'男':'女';
              wx.setStorageSync('isNew', false)
            }
          },
          fail(){
            console.log("检测用户失败");
          }
        });
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