const app = getApp()
import hez from '../../utils/hez.js'
const wxParser = require('../../wxParser/index');
const config = app.globalData 
import { getGoodsCent } from '../../utils/api.js'
// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: false,
    datas: "",
    maps:false,
    int:true,
    ints:true,
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

  // 用户信息
  infos: function(e){
    let infos = app.globalData.userInfo
    let infod = e.detail.userInfo
    let infoli = Object.assign(infos, infos)
    console.log('用户信息', infoli )
    app.globalData.userInfo = infoli
    this.setData({
      info: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 授权登录
    let that = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              // console.log('用户信息授权', res.userInfo)
              let infos = app.globalData.userInfo
              let infod = res.userInfo
              let infoli = Object.assign(infos, infos)
              console.log('授权用户信息', infoli)
              app.globalData.userInfo = infoli
              that.setData({
                info: false
              })
            }

          })
        } else {
          that.setData({
            info: true
          })
        }
      }
    })

    console.log('页面参数', options)

    getGoodsCent(res => {
      this.setData({
        datas: res
      })
      wx.setNavigationBarTitle({
        title: res.title
      })
      wxParser.parse({
        bind: 'richText',
        html: res.content,
        target: this,
        enablePreviewImage: false, // 禁用图片预览功能
        tapLink: (url) => { // 点击超链接时的回调函数
          // url 就是 HTML 富文本中 a 标签的 href 属性值
          // 这里可以自定义点击事件逻辑，比如页面跳转
          wx.navigateTo({
            url
          });
        }
      });
    }, { richTextID: options.id })

    
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