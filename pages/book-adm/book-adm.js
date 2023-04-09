// pages/book-adm/book-adm.js
Page({
  data: {
    list: [
      { serialNum: '12', name: 'yky', date: '2023-4-19', numPeople: 1, phone: '12345678901', idCard: '111111222233449999' },
      { serialNum: '19', name: 'ljl', date: '2023-4-23', numPeople: 4, phone: '12345678901', idCard: '111111222233449999' },
      { serialNum: '20', name: '???', date: '2023-4-27', numPeople: 0, phone: '12345678901', idCard: '111111222233449999' }
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
      url: 'https://10.17.133.136:443/appointment/query',
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
          var obj = res.data.data[i];
          let item = {
            serialNum: obj.id,
            name: obj.name,
            date: obj.appointmentDate,
            numPeople: obj.accompanyingNum,
            phone: obj.phone,
            idCard: obj.idcard,
          };
          newList.push(item);
        }
        th.setData({ list: newList })
        console.log("----------更新我的预约记录，成功-----------")
        th.showModal({ msg: '已更新' })
      },
      fail: function (res) {
        console.log("----------向后端请求预约记录列表请求，失败------------")
        th.showModal({ msg: '获取失败，请重试' })
      }
    })
  },
  approve: function (e) {
    console.log(e)
    let serialNum = e.target.dataset.serialnum
    console.log("尝试批准，serialNum：", serialNum)
    this.change("true", serialNum)
  },
  refuse: function (e) {
    console.log(e);
    let serialNum = e.target.dataset.serialnum
    console.log("尝试拒绝，serialNum：", serialNum)
    this.change("false", serialNum)
  },
  change: function (isApproval, serialNum) {
    console.log(isApproval, serialNum)
    wx.request({
      url: 'https://10.17.133.136:443/appointment/justify',
        method: 'POST',
        header: {
          'Authorization': wx.getStorageSync('token'),
          'Content-Type': "application/x-www-form-urlencoded"
        },
        data: {
          isApproval: isApproval,
          id: serialNum,
        },
        success: (res) => {
          console.log(res)
          console.log('已更新预约状态', 20)
          this.showModal({ msg: '已更新预约状态预约，刷新以获取最新列表' })
          return true
        },
        fail: (res) => {
          console.log(res)
          console.log('未能成功更新预约状态', 40)
          this.showModal({ msg: '失败，请重试' })
          return false
        }
    })
  }
})
