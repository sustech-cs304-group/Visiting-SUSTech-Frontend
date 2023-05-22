var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
var qqmapsdk;
var map_data = require('../../utils/map-data');
const { map } = require('../../utils/map-data');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',   //搜索框
    longitude: 113.99745890567851,
    latitude: 22.596228072936825,
    markers:[],
    showDialog: false,
    mapId: "map1",  //map的id 根据onchange要改变
    showingContent:{
      image: "../../images/main/sustech_1.JPG",
      longitude: 113.99745890567851,
      latitude: 22.596228072936825,
      name: "Test Name",
      discription: "这里是南科大"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    qqmapsdk = new QQMapWX({
      key: '42CBZ-LNTCT-DJ4XT-VTRI2-J4HUQ-34FCZ'
    });
    this.getNowLocation();
    this.setData({
      markers: this.getMarkers()
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  getNowLocation(){
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res);
        let mmarkers = this.getMarkers();
        console.log(mmarkers);
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: mmarkers
        })
      }
    })
  },
  onChange(event) {
    console.log(event);
    let idx = event.detail.index + 1
    this.setData({
      mapId: "map" + idx,
    })
    console.log(this.data.mapId)
    this.setData({
      markers: this.getMarkers()
    })
    console.log(this.data.markers);
  },
  moveTolocation: function () {
    let Id = this.data.mapId
    var mapCtx = wx.createMapContext(Id);
    mapCtx.moveToLocation();
  },
  getMarkers(){
    let markers = [];
    let Id = this.data.mapId
    let index = 1
    if(Id == "map1"){
      for(let item of map_data){
        if(item.type=='教学楼'){
          let marker = this.createMarker(item,index);
          index++;
          markers.push(marker);
        }
      }
    }else if(Id == "map2"){
      for(let item of map_data){
        if(item.type=="院系"){
          let marker = this.createMarker(item,index);
          index++;
          markers.push(marker);
        }
      }
    }else if(Id == "map3"){
      for(let item of map_data){
        if(item.type=="宿舍"){
          let marker = this.createMarker(item,index);
          index++;
          markers.push(marker);
        }
      }
    }else if(Id == "map4"){
      for(let item of map_data){
        if(item.type == "门口"){
          let marker = this.createMarker(item,index);
          index++;
          markers.push(marker);
        }
      }
    }else if(Id == "map5"){
      for(let item of map_data){
        if(item.type == "图书馆"){
          let marker = this.createMarker(item,index);
          index++;
          markers.push(marker);
        }
      }
    }else if(Id == "map6"){
      for(let item of map_data){
        if(item.type == "餐饮"){
          let marker = this.createMarker(item, index);
          index++;
          markers.push(marker);
        }
      }
    }else if(Id == "map7"){
      for(let item of map_data){
        if(item.type == "运动场所"){
          let marker = this.createMarker(item, index);
          index++;
          markers.push(marker);
        }
      }
    }else if(Id == "map8"){
      for(let item of map_data){
        if(item.type == "其他建筑"){
          let marker = this.createMarker(item, index);
          index++;
          markers.push(marker);
        }
      }
    }
    return markers;
  },
  createMarker(item, index){
    let latitude = item.latitude;
    let longitude = item.longitude;
    let marker = {
      id: index,
      name: item.name,
      latitude: latitude,
      longitude: longitude,
      width: 30,
      height: 30,
      iconPath: "../../images/icons/position.png",
    };
    return marker;
  },
  //点击标记
  markertap(e){
    console.log(e)
    var id = e.markerId
    var name = this.data.markers[id - 1].name
    var image = ""  //要修改成搜集的图片
    var longitude = this.data.markers[id - 1].longitude
    var latitude = this.data.markers[id - 1].latitude
    var discription = "测试" //要修改
    console.log(name)
    var markers = this.data.markers
    markers[id - 1].iconPath = "../../images/icons/select_position.png"
    this.setData({
      showDialog: true,
      markers: markers,
      'showingContent.image' : "../../images/main/sustech_2.JPG",
      'showingContent.longitude': longitude,
      'showingContent.latitude': latitude,
      'showingContent.name': name,
      'showingContent.discription': discription
    })
  },
  toggleDialog: function () {
    var markers = this.data.markers
    for(var item of markers){
      item.iconPath = "../../images/icons/position.png"
    }
    this.setData({
      showDialog: false,
      markers: markers
    })
  },
  navigateTo(){
    let key = '42CBZ-LNTCT-DJ4XT-VTRI2-J4HUQ-34FCZ'
    let referer = '参观南科大';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': this.data.showingContent.name,
      'latitude': this.data.showingContent.latitude,
      'longitude': this.data.showingContent.longitude
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },
  onSearch(){
    
  }
})