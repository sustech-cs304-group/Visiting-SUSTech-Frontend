// pages/user-page-detail/modify/modify.js
const app = getApp();
Page({
  data: {
    show:false,
    columns: ['男','女'],
    userInfo:{
      nickName: '',
      name: '',
      avatarUrl: '/images/more/user.png',
      phone: '',
      id_card:'',
      gender: ''
    },
    hasUserInfo: false
  },


  changeNumber:function(e){
    this.setData({'userInfo.phone': e.detail.value})
    wx.setStorageSync('phone', e.detail.value);
  },
  changeId: function(e){
    this.setData({'userInfo.id_card': e.detail.value});
    wx.setStorageSync('id_card', e.detail.value);
  },
  changeName: function(e){
    this.setData({'userInfo.name': e.detail.value})
    wx.setStorageSync('name', e.detail.value);
  },
  bindKeyInput: function (e) {
    this.setData({
      'userInfo.nickName': e.detail.value
    })
    wx.setStorageSync('nickname', e.detail.value);
  },
  onChooseAvatar(e) {
    var that = this;
    console.log(e);
    const {
      avatarUrl
    } = e.detail;
    this.setData({'userInfo.avatalUrl': avatarUrl});
    wx.setStorageSync('avatalUrl', avatarUrl);
    wx.uploadFile({
      url: app.update_avatar,
      header: {
        'Authorization': wx.getStorageSync('token'),
        'Content-Type': "application/x-www-form-urlencoded"
      },
      filePath: (wx.getStorageSync('avatalUrl')=="")? app.globalData.userInfo.avatarUrl: wx.getStorageSync('avatalUrl'),
      name: 'avatar',
      success: function (res) {
        console.log(res)
        let result = JSON.parse(res.data);
        let newUrl = result.data;
        console.log(newUrl);
        that.setData({
          'userInfo.avatalUrl' : newUrl
        })
        wx.setStorageSync('avatalUrl', newUrl);
      }
    })
    
  },
  showPopup(e){      //点击选择性别
    this.setData({show:true})
  },
  onClose() {     //点击空白处开闭弹出层（选择器）及选择器左上角的取消
    this.setData({ show: false });
  },
  onConfirm(e){    //选择器右上角的确定，点击确定获取值
   this.setData({
     show:false,
     'userInfo.gender': e.detail.value
   })
   wx.setStorageSync('gender', (e.detail.value=='男')?0:1);
 },
 update_info: function(e){
   var that = this;
   console.log(wx.getStorageSync('name'));
  //在清除数据缓存后，再次登录，如果有的个人信息不进行修改，则会因为getStorageSync而设置为空
  //修改方法：进行缓存的判断，如果为空则直接赋global值
  wx.request({
    url: app.update_person_info,
    method: 'POST',
    header:{
      'Authorization': wx.getStorageSync('token'),
      'Content-Type': "application/json"
    },
    data:{
      nickname: (wx.getStorageSync('nickname')=="")? app.globalData.userInfo.nickName : wx.getStorageSync('nickname'),
      phone: (wx.getStorageSync('phone')=="")? app.globalData.userInfo.phone : wx.getStorageSync('phone'),
      gender: (wx.getStorageSync('gender')=="") ? ((app.globalData.userInfo.gender=='男')?0:1): wx.getStorageSync('gender'),
      identityCard: (wx.getStorageSync('id_card')=="")? app.globalData.userInfo.id_card: wx.getStorageSync('id_card'),
      name: (wx.getStorageSync('name')=="")? app.globalData.userInfo.name: wx.getStorageSync('name')
    },
    success(res){
      console.log(res);
      if(res.data.code == 200){
        wx.showModal({
        title: '提交',
        content: '您的个人信息已更新，点击确定返回上一层',
        complete: (res) => {
          if (res.cancel) {
            
          }
          if (res.confirm) {
            app.globalData.userInfo={
              nickName: (wx.getStorageSync('nickname')=="")? app.globalData.userInfo.nickName : wx.getStorageSync('nickname'),
              avatarUrl: (wx.getStorageSync('avatalUrl')=="")? app.globalData.userInfo.avatarUrl: wx.getStorageSync('avatalUrl'),
              phone: (wx.getStorageSync('phone')=="")? app.globalData.userInfo.phone : wx.getStorageSync('phone'),
              gender: (wx.getStorageSync('gender')==0)?'男':'女',
              id_card: (wx.getStorageSync('id_card')=="")? app.globalData.userInfo.id_card: wx.getStorageSync('id_card'),
              name: (wx.getStorageSync('name')=="")? app.globalData.userInfo.name: wx.getStorageSync('name')
            }
            wx.navigateBack();
          }
        }
        })
      }else{
        wx.showModal({
          title: '警告',
          content: '您填写的信息有误，请重新核实！',
          showCancel: false,
          complete: (res) => {
            if (res.confirm) {
            }
          }
        })
      }
    }
  })
},
  /**
   * 页面的初始数据
   */
  

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
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo
    })
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