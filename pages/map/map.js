var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
var qqmapsdk;
var map_data = require('../../utils/map-data');
const { map } = require('../../utils/map-data');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 113.99745890567851,
    latitude: 22.596228072936825,
    markers:[],
    showDialog: false,
    mapId: "map1"  //map的id 根据onchange要改变
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

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
    if(Id == "map1"){
      for(let item of map_data){
        if(item.type=='教学楼'){
          let marker = this.createMarker(item);
          markers.push(marker);
        }
      }
    }else if(Id == "map2"){
      for(let item of map_data){
        if(item.type=="院系"){
          let marker = this.createMarker(item);
          markers.push(marker);
        }
      }
    }else if(Id == "map3"){
      for(let item of map_data){
        if(item.type=="宿舍"){
          let marker = this.createMarker(item);
          markers.push(marker);
        }
      }
    }else if(Id == "map4"){
      for(let item of map_data){
        if(item.type == "门口"){
          let marker = this.createMarker(item);
          markers.push(marker);
        }
      }
    }else if(Id == "map5"){
      for(let item of map_data){
        if(item.type == "图书馆"){
          let marker = this.createMarker(item);
          markers.push(marker);
        }
      }
    }else if(Id == "map6"){
      for(let item of map_data){
        if(item.type == "餐饮"){
          let marker = this.createMarker(item);
          markers.push(marker);
        }
      }
    }else if(Id == "map7"){
      for(let item of map_data){
        if(item.type == "运动场所"){
          let marker = this.createMarker(item);
          markers.push(marker);
        }
      }
    }else if(Id == "map8"){
      for(let item of map_data){
        if(item.type == "其他建筑"){
          let marker = this.createMarker(item);
          markers.push(marker);
        }
      }
    }
    return markers;
  },
  createMarker(item){
    let latitude = item.latitude;
    let longitude = item.longitude;
    let marker = {
      id: item.id,
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
    console.log(name)
    var markers = this.data.markers
    markers[id - 1].iconPath = "../../images/icons/select_position.png"
    this.setData({
      showDialog: true,
      markers: markers
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
})