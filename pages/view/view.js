// pages/view/view.js
const app = getApp()
const wxParser = require('../../wxParser/index');
import { getGoodsCent } from '../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    texts:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getGoodsCent(res => {
      wx.setNavigationBarTitle({
        title: res.title
      })
      wxParser.parse({
        bind: 'richText',
        html: res.content,
        target: this,
        enablePreviewImage: true, // 禁用图片预览功能
        tapLink: (url) => { // 点击超链接时的回调函数
          // url 就是 HTML 富文本中 a 标签的 href 属性值
          // 这里可以自定义点击事件逻辑，比如页面跳转
          wx.navigateTo({
            url
          });
        }
      });
    }, { richTextID: 1536222829394408 })
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