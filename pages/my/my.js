// pages/my/my.js
const app = getApp()
import hez from '../../utils/hez.js'
const config = app.globalData 
import { postUserCollect, rmUserCollect } from '../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ontabs: 1,
    intList:false,
    goodsLive: '',
    offset: 0  //商品页码
    
  },

  ontab:function(e){
    let ins = e.currentTarget.dataset.obj
    this.setData({
      ontabs: ins
    })
  },


  // 进入商品页面
  goGoods: function(e){
    console.log('删除商品', e.target.dataset.id)
    let ids = e.target.dataset.id
    wx.navigateTo({
      url: '../../pages/goods/goods?id=' + ids + '&userid=' + 0
    })
  },

  // 删除商品
  rmLive: function(e){
    let ids = e.target.dataset.id
    let obj = {
      userId: String(app.globalData.userInfo.id),
      goodsID: String(ids)
    }

    rmUserCollect( res => {
      // console.log('移除商品', res)
      postUserCollect(res => {
        console.log('喜欢商品', res.data.data.objects)
        this.setData({
          goodsLive: res.data.data.objects
        })
      }, { userId: String(app.globalData.userInfo.id) })
    }, obj)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的收藏'
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('222323', app.globalData.userInfo.id)
    postUserCollect(res =>{
      console.log('喜欢商品', res.data.data.objects)
      this.setData({
        goodsLive: res.data.data.objects
      })
    }, { offset: this.data.offset, userId: String(app.globalData.userInfo.id)})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    postUserCollect(res => {
      console.log('喜欢商品', res.data.data.objects)
      this.setData({
        goodsLive: res.data.data.objects
      })
    }, { offset: this.data.offset, userId: String(app.globalData.userInfo.id) })
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
    postUserCollect(res =>{
      let datasobj = this.data.goodsLive
      let datasli = datasobj.concat(res.data.data.objects)
      if (res.data.data.objects.length == 0) {
        setTimeout(() => {
          wx.showToast({
            title: '没有更多',
            icon: 'none',
            duration: 2000
          })
        }, 100)
      } else {
        this.setData({
          goodsLive: datasli,
          offset: this.data.offset + 10
        })
      }
      console.log('收藏商品', res.data.data.objects)
    }, { offset: this.data.offset, userId: String(app.globalData.userInfo.id)})
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})