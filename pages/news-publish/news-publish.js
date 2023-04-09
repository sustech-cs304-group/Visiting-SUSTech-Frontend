Page({
    data: {
      value: '',
      fileList: [
        {
          url: 'https://img.yzcdn.cn/vant/leaf.jpg',
          name: '图片1',
        }
      ]
    },
  
    onChange(event) {
      // event.detail 为当前输入的值
      console.log(event.detail);
    },
  });
  