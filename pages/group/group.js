// pages/CircleFriends/CircleFriends.js
var app = getApp()
var that

Page({
  /**
   * 页面的初始数据
   */
  data: {
    DataSource: [{
    icon: 'https://pic1.zhimg.com/v2-ac3f0eeee5d83d5007da10e07b545092_250x0.jpg?source=172ae18b',
    username: 'CS304',
    content: '南方科技大学校园风景如画，教学设施完善，老师同学友好，是周末打卡胜地。',
    resource: [
      '../../images/main/sustech_1.JPG',
      '../../images/main/sustech_2.JPG',
      '../../images/main/sustech_3.JPG',
    ],
    location: '南方科技大学',
    time: '2019-05-01 12:00',
    zanSource: ['张三', '李四', '王五', '找钱', '孙俪', '王宝'],
    contnet: [{
        'firstname': '张三',
        'content': 'Soooo Beautiful！！'
      },
      {
        'firstname': '李四',
        'content': '好玩，强烈推荐！！'
      }
    ]},
    {
      icon: 'https://pic1.zhimg.com/v2-ac3f0eeee5d83d5007da10e07b545092_250x0.jpg?source=172ae18b',
      username: 'CS304',
      content: '南方科技大学校园风景如画，教学设施完善，老师同学友好，是周末打卡胜地。',
      resource: [
        '../../images/main/sustech_1.JPG',
        '../../images/main/sustech_2.JPG',
        '../../images/main/sustech_3.JPG',
      ],
      location: '南方科技大学',
      time: '2019-05-01 12:00',
      zanSource: ['张三', '李四', '王五', '找钱', '孙俪', '王宝'],
      contnet: [{
          'firstname': '张三',
          'content': 'Soooo Beautiful！！'
        },
        {
          'firstname': '李四',
          'content': '好玩，强烈推荐！！'
        }
      ]},
      {
        icon: 'https://pic1.zhimg.com/v2-ac3f0eeee5d83d5007da10e07b545092_250x0.jpg?source=172ae18b',
        username: 'CS304',
        content: '南方科技大学校园风景如画，教学设施完善，老师同学友好，是周末打卡胜地。',
        resource: [
          '../../images/main/sustech_1.JPG',
          '../../images/main/sustech_2.JPG',
          '../../images/main/sustech_3.JPG',
        ],
        location: '南方科技大学',
        time: '2019-05-01 12:00',
        zanSource: ['张三', '李四', '王五', '找钱', '孙俪', '王宝'],
        contnet: [{
            'firstname': '张三',
            'content': 'Soooo Beautiful！！'
          },
          {
            'firstname': '李四',
            'content': '好玩，强烈推荐！！'
          }
        ]}
    ],
    photoWidth: wx.getSystemInfoSync().windowWidth / 5,

    popTop: 0, //弹出点赞评论框的位置
    popWidth: 0, //弹出框宽度
    isShow: true, //判断是否显示弹出框
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
  },
  // 点击图片进行大图查看
  LookPhoto: function(e) {
    console.log(e);
    wx.previewImage({
      current: e.currentTarget.dataset.photurl,
      urls: e.currentTarget.dataset.list
    })
  },

  // 点击点赞的人
  TouchZanUser: function(e) {
    wx.showModal({
      title: e.currentTarget.dataset.name,
      showCancel: false
    })
  },

  // 删除朋友圈
  delete: function() {
    wx.showToast({
      title: '删除成功',
    })
  },

  // 点击了点赞评论
  TouchDiscuss: function(e) {
    // this.data.isShow = !this.data.isShow
    // 动画
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
      delay: 0,
    })

    if (that.data.isShow == false) {
      that.setData({
        popTop: e.target.offsetTop - (e.detail.y - e.target.offsetTop) / 2,
        popWidth: 0,
        isShow: true
      })

      // 0.3秒后滑动
      setTimeout(function() {
        animation.width(0).opacity(1).step()
        that.setData({
          animation: animation.export(),
        })
      }, 100)
    } else {
      // 0.3秒后滑动
      setTimeout(function() {
        animation.width(120).opacity(1).step()
        that.setData({
          animation: animation.export(),
        })
      }, 100)

      that.setData({
        popTop: e.target.offsetTop - (e.detail.y - e.target.offsetTop) / 2,
        popWidth: 0,
        isShow: false
      })
    }
  },
  
  jump_to_post: function name(params) {
    console.log('jump to post page')
    wx.navigateTo({
      url: './post/post',
    })
  }
})