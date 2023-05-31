// pages/map/map.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sustech_imgs: [
      app.group_images + "sustech_1.JPG",
      app.group_images + "sustech_2.JPG",
      app.group_images + "sustech_3.JPG"
    ],
    news: [
      {
        "news_id": 1,
        "news_source_id": 23,
        "news_source_name": "南方科技大学",
        "news_source_img": "../../images/icons/sustech.png",
        "news_title": "南方科技大学预约系统上线啦！",
        "news_time": "2019-05-01",
        "news_cover": "../../images/main/sustech_1.JPG",
        "content" : "test"
      },
    ]
  },

  jump_to_book_page: function() {
    wx.navigateTo({
      url: '../book-req/book-req',
    })
  },

  jump_to_news: function(e) {
    let jump_to_news = ''
    this.data.news.forEach(item => {
        if (item.news_id == e.currentTarget.dataset.id) {
          jump_to_news = item;
        }
    });
    wx.navigateTo({
      url: '../news/news?news=' + JSON.stringify(jump_to_news),
    })
  },
  switch_to_info_page: function(){
    if(wx.getStorageSync('isNew')){
      console.log("跳转到个人信息界面");
    }
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
    let that = this;
    wx.request({
      url: app.load_news,
      method:'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success(res){
        console.log(res);
        let receive_news = [];
        let array = res.data.data;
        array.forEach(element => {
          let format_time = element.createTime.split('T')[0]
          receive_news.push(
            {
              "news_id": element.id,
              "news_source_id": 23,
              "news_source_name": "南方科技大学",
              "news_source_img": "../../images/icons/sustech.png",
              "news_title": element.title,
              "news_time": format_time,
              "news_cover": element.pictureUrl,
              "content": element.content
            },
          )
        });
        console.log(receive_news)
        that.setData({'news': receive_news});
      },
      fail(res){
        console.log(res);
      }
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