const app = getApp();
Page({
    data: {
      value: '',
      content: '',
      fileList: [
        // {
        //   url: 'https://192.168.0.102:443/images/bc38a799f8c047eb98338329abea9431.JPG',
        //   name: '图片1',
        // }
      ]
    },
  
    onChange(event) {
      // event.detail 为当前输入的值
      console.log(event.detail);
    },

    changeContent(event) {
      this.setData({'content': event.detail});
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
          that.data.fileList.push({'url': newUrl, 'name': 'test'});
          that.setData({'fileList': that.data.fileList});
        },
      });
    },

    submit: function (e) {
      console.log(this.data)
      wx.request({
        url: app.post_group,
        method: 'POST',
        header: {
          'Authorization': wx.getStorageSync('token'),
          'Content-Type': "application/json"
        },
        data: {
          content: this.data.content,
          imgOrRadio: this.data.fileList,
          location: 'testLocation'
        },
        success(res) {
          console.log(res);
          if (res.statusCode == 200) {
            wx.showModal({
              title: '提交',
              content: '发布成功',
              showCancel: false,
              complete: (res) => {
                console.log('jump to group page')
                wx.switchTab({
                  url: '../group',
                })
              }
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
  