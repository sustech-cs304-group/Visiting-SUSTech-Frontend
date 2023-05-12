const app = getApp();
Page({
  data: {
    title: '',
    content: '',
    fileList: []
  },

  onChange(event) {
    console.log(event.detail);
  },

  afterRead(event) {
    var that = this;
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: app.upload_image, 
      filePath: file.url,
      header: {
        'Authorization': wx.getStorageSync('token'),
        'Content-Type': "application/json"
      },
      name: 'image',
      success(res) {
        console.log(res)
        let result = JSON.parse(res.data);
        let newUrl = result.data;
        that.setData({ 'fileList': [{ url: newUrl}] });
      },
    });
  },

  changeTitle(event) {
    this.setData({'title': event.detail});
  },

  changeContent(event) {
    this.setData({'content': event.detail});
  },

  submit: function (e) {
    console.log(this.data)
    wx.request({
      url: app.submit_news,
      method: 'POST',
      header: {
        'Authorization': wx.getStorageSync('token'),
        'Content-Type': "application/json"
      },
      data: {
        title: this.data.title,
        content: this.data.content,
        pictureUrl: this.data.fileList[0].url
      },
      success(res) {
        console.log(res);
        if (res.data.code == 200) {
          wx.showModal({
            title: '提交',
            content: '发布成功',
            showCancel: false,
            complete: (res) => {}
          })
        } else {
          wx.showModal({
            title: '警告',
            content: '您填写的信息有误，请重新核实！',
            showCancel: false,
            complete: (res) => {
              if (res.confirm) {}
            }
          })
        }
      }
    })
  }
});
