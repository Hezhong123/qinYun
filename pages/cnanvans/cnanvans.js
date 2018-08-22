// pages/cnanvans/cnanvans.js
import api from '../../utils/api.js'

// 绘制文本换行
let drawText = function (ctx, str, initHeight, titleHeight, canvasWidth) {
  var lineWidth = 0;
  var lastSubStrIndex = 0; //每次开始截取的字符串的索引  
  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width;
    if (lineWidth > canvasWidth) {
      ctx.fillText(str.substring(lastSubStrIndex, i), 35, initHeight);//绘制截取部分  
      initHeight += 20;//20为字体的高度  
      lineWidth = 0;
      lastSubStrIndex = i;
      titleHeight += 30;
    }
    if (i == str.length - 1) {//绘制剩余部分  
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), 15, initHeight);
    }
  }
  // 标题border-bottom 线距顶部距离  
  titleHeight = titleHeight + 10;
  return titleHeight
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img1:'',
    img2:'' 
  },
  // 显示图片
  postimg: function () {
    let img1 = this.data.img1
    let img2 = this.data.img2
    let texts = `数据测试多不易`
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.drawImage(img1, 0, 0,360,585)
    ctx.drawImage(img2, 140, 400, 80, 80)
    
    ctx.setFillStyle('#fff')
    ctx.setFontSize(20)
    ctx.fillText(texts,30, 40)

    // 字体二
    ctx.setFillStyle('#eeeeee')
    ctx.setFontSize(12)
    var str = "事件分为冒泡事件和非冒泡事件： 冒泡事件：当一个组件上的事件被触发后，该事件会向父节点传递";
    var titleHeight = 16; // 标题的高度  
    var canvasWidth = 200;//计算canvas的宽度  
    var initHeight = 260;//绘制字体距离canvas顶部初始的高度  

    // 标题border-bottom 线距顶部距离  
    titleHeight = drawText(ctx, str, initHeight, titleHeight, canvasWidth);// 调用行文本换行函数  
    ctx.draw()

  },

  // 生成图片
  getimg: function () {
    let that = this
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath)
        that.setData({
          img2: res.tempFilePath
        })
        let apy = {
          filePath: res.tempFilePath
        }
        wx.previewImage({
          current: res.tempFilePath, // 当前显示图片的http链接
          urls: [res.tempFilePath] // 需要预览的图片http链接列表
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    api.post('https://cloud-minapp-15402.cloud.ifanrusercontent.com/1fM8raqcaBqycZam.png')         .then((res,rej)=>{
      console.log(res)
      this.setData({
        img1: res.tempFilePath
      })
      
    })
    
    // 生成二维码
    const params = {
      path: '../../pages/cnanvans/cnanvans',
      width: 250,
      
    }
    wx.BaaS.getWXACode('wxacode', params, true).then(res => {
      console.log('www', res)
      api.post(res.download_url).then((r, j) => {
        console.log('sss', r)
        this.setData({
          img2: r.tempFilePath
        })
        this.postimg()
      })
    }).catch(err => {
      console.log(err)
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