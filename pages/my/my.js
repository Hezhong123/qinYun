// pages/my/my.js
const app = getApp()
import hez from '../../utils/hez.js'
const config = app.globalData 
import { postUserCollect, rmUserCollect, sendTemp } from '../../utils/api.js'

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
      url: '../../pages/goodsA/goodsA?id=' + ids + '&userid=' + 0 + '&stort=' + 0
    })
  },

  // 删除商品
  rmLive: function(e){
    let ids = e.target.dataset.id
    let obj = {
      userId: String(app.globalData.userInfo.id),
      goodsId: String(ids)
    }

    rmUserCollect( res => {
      console.log('移除商品', res, obj)
      postUserCollect(res => {
        console.log('喜欢商品', res.data.data.objects)
        this.setData({
          goodsLive: res.data.data.objects
        })
      }, { offset: this.data.offset, userId: String(app.globalData.userInfo.id) })
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

  // 微信支付
  onpaly: function(){
    console.log(11)
    let params = {
      totalCost: 0.01,
      merchandiseDescription: '深蓝色秋裤'
    }

    wx.BaaS.pay(params).then(res => {
      // success. 支付请求成功响应，可以在 res 中拿到 transaction_no 和支付结果信息
      /* 1.1.4 以下版本：
        如果支付失败, 则可以获取失败原因
        注: 只要是服务器有返回的情况都会进入 success, 即便是 4xx，5xx 都会进入
            所以非系统级别错误导致的支付失败也会进入这里, 例如用户取消，参数错误等
            这是微信的处理方式与 BaaS 服务(器)无关
      */
      console.log('支付成功', res) 
    }, err => {
      // 未完成用户授权或发生网络异常等
      console.log('111', err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('222323', app.globalData.userInfo.id)
    // postUserCollect(res =>{
    //   console.log('喜欢商品', res)
    //   this.setData({
    //     goodsLive: res.data.data.objects
    //   })
    // }, { offset: this.data.offset, userId: String(app.globalData.userInfo.id)})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    postUserCollect(res => {
      console.log('喜欢商品', res)
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
    postUserCollect(res => {
      console.log('喜欢商品', res)
      wx.stopPullDownRefresh()
      this.setData({
        goodsLive: res.data.data.objects
      })
    }, { offset: this.data.offset, userId: String(app.globalData.userInfo.id) })
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
    }, { offset: this.data.offset + 10, userId: String(app.globalData.userInfo.id)})
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})