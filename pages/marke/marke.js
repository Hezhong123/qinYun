// pages/marke/marke.js
const app = getApp()
import hez from '../../utils/hez.js'
const table = app.globalData.table 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lis:''
  },

  onmymk: (e)=>{
    wx.navigateTo({
      url: '../../pages/mymk/mymk',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    hez.gets(this, (res) => {
      console.log(res) //返回值
      this.setData({
        lis: res.data.objects
      })
    }, table.activity, '表名')
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