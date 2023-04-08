// pages/book-list/book-list.js
Page({
  data: {
    list: [
      { date: '2023-4-19', numPeople: 1, state: "通过" },
      { date: '2023-4-23', numPeople: 4, state: "通过" },
      { date: '2023-4-27', numPeople: 0, state: "待审核" }
    ]
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
      url: 'http://localhost:6789/the/url/of/backend/method',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {
        token: this.data.token,
      },
      success: function (res) {
        th.setData({ list: null })  // reset to null
        let newList = [];
        for (let i in res.data) {
          let item = { date: i.date, numPeople: i.numPeople, state: i.state };
          newList.push(item);
        }
        th.setData({ list: newList })
      },
      fail: function (res) {
        console.log("----------向后端请求预约记录列表请求失败------------")
      }
    })
  },
})
