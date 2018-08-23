const app = getApp()
import hez from '../../utils/hez.js'
const config = app.globalData 
// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maps:false,
    int:true,
    ints:false,
    latitude:"",
    longitude:""
  },

  // 显示位置
  onMap: function(){
    wx.showLoading({
      title: '地图加载中',
    })
    this.setData({
      int: false
    })
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(res)
        wx.hideLoading()
        that.setData({
          maps:true,
          int: false,
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      fail: function(res){
        console.log(res)
      }
    })
  },

  // 关闭地图
  offMap: function(){
    this.setData({
      maps: false
    })
  },

  // 打开积分
  onInt: function(){
    this.setData({
      int: true,
      maps: false
    })
  },

  // 关闭积分
  offInt: function(){
    this.setData({
      int:false
    })
  },

//  客服
  onKf: function(e){
    console.log(e)
  },

  //购买
  onShop: function(){
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ints: config.sets.int
    })
  },  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})