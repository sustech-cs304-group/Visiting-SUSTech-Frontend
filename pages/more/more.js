// pages/more/more.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName: '',
      name:'',
      avatarUrl: '/images/more/user.png',
      phone: '',
      id_card:'',
      gender: ''
    },
    hasUserInfo: false,
    menuItems:[
      {text: '修改个人信息' , icon: '../../images/more/modify.png', url: '../../pages/user-page-detail/modify/modify'},
      {text: '预约记录', icon:'../../images/more/record.png', url:'../../pages/user-page-detail/record/record'},
      {text: '权限', icon:'../../images/more/authority.png', url:'../../pages/user-page-detail/authority/authority'},
      {text: '设置', icon:'../../images/more/set.png', url:'../../pages/user-page-detail/setting/setting'}
    ]
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