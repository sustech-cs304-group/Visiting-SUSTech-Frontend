//app.js
const config = require('config.js');
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
        var that = this;
        // console.log(config.login)
        wx.request({
          url: config.login,
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
            that.checkNewUser();
          },
          fail(){
            console.log("code发送失败");
          }
        })
      },
    })

  },
  checkNewUser:function(e){
    var that = this;
    // console.log(config.query);
        wx.request({
          url: that.query,
          method:'GET',
          header: {
            'Authorization': wx.getStorageSync('token'),
            'Content-Type': "application/x-www-form-urlencoded"
          },
          success(res){
            console.log(res);
            if(res.data.data.name==null){
               console.log("新用户");
               that.globalData.userInfo.nickName = that.generateUuid();
               wx.showModal({
                title: '提示',
                content: '您当前为游客账号，请自行更改个人信息。',
                showCancel: false,
                complete: (res) => {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '../more/more',
                    })
                  }
                }
              })
            }else{
              console.log("老用户");
              that.globalData.userInfo.nickName = res.data.data.nickname;
              that.globalData.userInfo.name = res.data.data.name;
              that.globalData.userInfo.avatarUrl = res.data.data.avatarUrl;
              that.globalData.userInfo.phone = res.data.data.phone;
              that.globalData.userInfo.id_card = res.data.data.identityCard;
              that.globalData.userInfo.gender = (res.data.data.gender==0)?'男':'女';
              that.globalData.userInfo.type = res.data.data.type;
              wx.setStorageSync('isNew', false)
              console.log(that.globalData.userInfo.avatarUrl);
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
      gender: '',
      type:''
    },
    hasUserInfo: false,
  },
  update_avatar : config.update_avatar,
  update_person_info : config.update_person_info,
  query : config.query,
  login : config.login,
  submit_news: config.submit_news,
  upload_image: config.upload_image,
  load_news: config.load_news,
  post_group: config.post_group,
  group_query: config.group_query,
  group_like: config.group_like,
  group_comment: config.group_comment
})