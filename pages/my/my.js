// pages/my/my.js
const app = getApp()
import hez from '../../utils/hez.js'
const config = app.globalData 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ontabs: 1,
    intList:false
  },

  ontab:function(e){
    let ins = e.currentTarget.dataset.obj
    this.setData({
      ontabs: ins
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('配置', config )
    this.setData({
      intList: config.sets.intList
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