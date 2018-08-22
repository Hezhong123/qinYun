// pages/index/index.js
const app = getApp()
import hez from '../../utils/hez.js'
const table = app.globalData.table 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oni:1,
    classtab: [ 1,1,1,1,1,1,1,1,1,1,1,1, ]
  },

  // 切换分类
  onIco:function(e){
    let ins = e.currentTarget.dataset.oni;
    this.setData({
      oni:ins
    });
    console.log(e.currentTarget.dataset.oni)
  },
  
  // 进入详情
  onvct: function(e){
    let ins =e.currentTarget.dataset.cs
    console.log(ins)
    wx.navigateTo({
      url: '../../pages/goods/goods?id=' + ins
    })
  },

  onmy:() => {
    wx.navigateTo({
      url: '../../pages/my/my'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.setNavigationBarTitle({
      title: '青语 · MK'
    })

    hez.gets(this, (res) => {
      console.log(res) //返回值
      this.setData({
        ico: res.data.objects
      })
    }, table.activity , '表名')
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