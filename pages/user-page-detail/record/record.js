// pages/book-list/book-list.js
const config = require('../../../config')

Page({
  data: {
    list: [
      { date: '2023-4-19', numPeople: 1, state: "通过" },
      { date: '2023-4-23', numPeople: 4, state: "通过" },
      { date: '2023-4-27', numPeople: 0, state: "待审核" }
    ]
  },
  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  click: function (e) {
    console.log("按了：", e.currentTarget.id)
  },
  onLoad: function (e) {
    this.load();
  },
  load: function (options) {
    var th = this;
    wx.request({
      url: config.appointment_query,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
        'content-type': "application/json"
      },
      success: function (res) {
        console.log(res);
        th.setData({ list: null })  // reset to null
        let newList = [];
        for (let i in res.data.data) {
          // i = i.data.data;
          var obj = res.data.data[i];
          // console.log("i", res.data.data[i]);
          var status;
          if (obj.status == 1) status = '审批通过';
          else if (obj.status == 0) status = '审批中';
          else if (obj.status == 2) status = '审批不通过，原因：' + obj.comment;
          let item = { date: obj.appointmentDate, numPeople: obj.accompanyingNum, state: status };
          // console.log(item);
          newList.push(item);
        }
        th.setData({ list: newList })
        console.log("----------更新我的预约记录，成功-----------")
        // th.showModal({ msg: '已更新' })
      },
      fail: function (res) {
        console.log("----------向后端请求预约记录列表请求，失败------------")
        th.showModal({ msg: '获取失败，请重试' })
      }
    })
  },
})
