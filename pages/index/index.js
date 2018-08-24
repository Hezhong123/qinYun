// pages/index/index.js
const app = getApp()
import hez from '../../utils/hez.js'
const table = app.globalData.table 

import { goodsCLass, getHome} from '../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oni:1,
    datas:'' , 
    classtab: '' ,
    offset:0,
    classID: ''
  },

  // 切换分类
  onIco:function(e){
    let ins = e.currentTarget.dataset.oni[0];
    let classID = e.currentTarget.dataset.oni[1];
    if(ins === 0){
      wx.showToast({
        title: '推荐算法，开发中...',
        icon: 'none',
        duration: 2000
      })
    }else{
      getHome((res) => {
        console.log('商品', res)
        this.setData({
          oni: ins,
          datas: res.objects,
          classID: classID,
          offset:0
        })
      }, { offset: 0, classID: parseInt(classID) })
    }
    console.log(ins, classID)
    

  },
  
  // 进入详情
  onvct: function(e){
    let ins =e.currentTarget.dataset.cs
    console.log(ins)
    wx.navigateTo({
      url: '../../pages/goods/goods?id=' + ins+'&userid='+222
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.setNavigationBarTitle({
      title: '青语 · MK'
    })

    // 商品分类
    goodsCLass((res)=>{
      console.log('商品分类：', res.objects)
      this.setData({
        classtab: res.objects,
        classID: res.objects[1].classID,
        offset:0
      })

      // console.log( '分类ID', this.data.classID)
      
      // 商品信息
      getHome((res) => {
        console.log('商品', res)
        this.setData({
          datas: res.objects
        })
      }, { offset: 0 , classID: parseInt(this.data.classID)})

    },'')

    
    

    
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
    getHome((res) => {
      let datasobj = this.data.datas
      let datasli = datasobj.concat(res.objects)
      if (res.objects.length == 0) {
        setTimeout(() => {
          wx.showToast({
            title: '没有更多',
            icon: 'none',
            duration: 2000
          })
        }, 100)
      } else {
        this.setData({
          datas: datasli,
          offset: this.data.offset + 2
        })
      }
      console.log('商品', res, this.data.offset, this.data.classID)

    }, { offset: this.data.offset + 2, classID: parseInt(this.data.classID) })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})