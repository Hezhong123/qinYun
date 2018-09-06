const app = getApp()
import hez from '../../utils/hez.js'
const wxParser = require('../../wxParser/index');
const config = app.globalData 
import { getGoodsCent, postActivity, postActivityAdd, postActivityGet, userCollect, getHome } from '../../utils/api.js'
// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: false,
    datas: "",
    dataText: '商品海报',
    maps:false,
    int:true,
    ints:true,
    intli:'',   //点赞用户
    userid:'',   //点赞用户id
    goodsId:'',  //商品id
    poster: 0 ,   //商品海报
    tDatas: '',   //推荐商品
    latitude:"",
    longitude:"",
    markers: ''
  },

  // 显示位置
  onMap: function(){
    // wx.showLoading({
    //   title: '地图加载中',
    // })
    this.setData({
      int: false,
      maps: true,
    })
    // let that = this
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     var speed = res.speed
    //     var accuracy = res.accuracy
    //     console.log('位置', res)
    //     wx.hideLoading()
    //     that.setData({
    //       maps:true,
    //       int: false,
    //       latitude: res.latitude,
    //       longitude: res.longitude
    //     })
    //   },
    //   fail: function(res){
    //     console.log(res)
    //   }
    // })
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

  //新建分享海报
  onShop: function(){
    console.log('是否生成过', this.data.poster)
    if (this.data.poster == 0 ){
      wx.showLoading({
        title: '生成中',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 6000)
      let that = this
      wx.request({
        url: 'https://api.hez.fun/cimg', //仅为示例，并非真实的接口地址
        data: {
          bj: 'https://cloud-minapp-15402.cloud.ifanrusercontent.com/1fxSwWdsXOuAnfCx.jpg',
          infos: app.globalData.userInfo.avatarUrl,
          name: app.globalData.userInfo.nickName,
          text: that.data.datas.title,
          rwm: that.data.imageBase64,
          goodsImg: that.data.datas.cover.path
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        success: function (res) {
          wx.hideLoading()
          that.setData({
            poster: 'https://' + res.data.cosImg.Location
          })
          // 下载图片
          that.dowImg()
          // 新建分享
          that.onIntsAdd()
        },
        fail: function (err) {
          console.log('err', err)
          wx.showToast({
            title: '失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }else{
      console.log('有海报的了', this.data.poster)
      this.dowImg()
    }
  },

  // 下载图片
  dowImg: function(){
    wx.downloadFile({
      url: this.data.poster, //仅为示例，并非真实的资源
      success: function (res) {
        let dmw = res.tempFilePath
        // 保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: dmw ,
          success(res) {
            // 预览图片
            wx.previewImage({
              current: '', // 当前显示图片的http链接
              urls: [dmw] // 需要预览的图片http链接列表
            })
            wx.showToast({
              title: '保存到相册了',
              icon: 'success',
              duration: 2000
            })
          }
        })
        console.log('下载的图片',res)
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

  // 分享点赞
  onIntsAdd: function(){
    // console.log(app.globalData.userInfo)
    let obj ={
      userId: String(this.data.userid), // 用户id
      goodsId:this.data.goodsid,
      userImg: app.globalData.userInfo.avatarUrl,
      poster: this.data.poster
    }
    console.log('分享点赞', obj )
    postActivityGet(res=>{
      console.log('查询点赞', res.data)
      if (typeof (res.data) === 'string' ){
        console.log('111122', res.data)
        postActivityAdd((res)=>{
          console.log('sss', res.data.userImg)
          this.setData({
            intli: res.data.userImg
          })
        },obj)

      }else{
        wx.showToast({
          title: '谢谢🙏',
          icon: 'success',
          duration: 2000
        })
        postActivity(res => {
          console.log('点过赞', res)
          if (res.objects.length == 0) {
            this.setData({
              userid: res.objects[0].userId,
              goodsid: res.objects[0].goodsId,
            })
          } else {
            this.setData({
              userid: res.objects[0].userId,
              goodsid: res.objects[0].goodsId,
              intli: res.objects[0].userImg
            })
          }
        }, obj )
      }

    },obj)

    // console.log('点赞信息:', obj )

  },

  // 新建分享
  onIntGet: function(){
    
    console.log('分享商品参数', this.data.userid, this.data.goodsid)

    //id 商品id   userid 用户id
    const params = {
      path: 'pages/goods/goods?id=' + this.data.goodsid + '&userid=' + this.data.userid,
      width: 250
    }

    wx.BaaS.getWXACode('wxacode', params, true ).then(res => {
      console.log('生成的二维码', res)
      this.setData({ imageBase64: res.download_url })
      // console.log('生成二维码', res.image)
      // wx.previewImage({
      //   current: '', // 当前显示图片的http链接
      //   urls: [res.image] // 需要预览的图片http链接列表
      // })
    }).catch(err => {
      console.log(err)
    })

  },

  // 收藏商品
  onCollect: function(){
    let obj = {
      userID:String(app.globalData.userInfo.id),
      goodsID: String(this.data.goodsid),
    }
    console.log('收藏商品', obj )
    userCollect(res=>{  
      console.log('收藏商品', res)
      if(res.code == 0){
        wx.showToast({
          title: '成功👌',
          icon: 'success',
          duration: 2000
        })
      }
    },obj)
  },

  // 进入商品详情页
  onGoods: function(e){
    let ins = e.currentTarget.dataset.cs
    // console.log(ins)
    wx.navigateTo({
      url: '../../pages/goods/goods?id=' + ins + '&userid=' + 0
    })
  },

  // 使用MK
  useMk: function(){
    console.log('使用mk', this.data.texts)
    app.globalData.texts = this.data.texts
    wx.navigateTo({
      url: '../../pages/view/view'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('页面参数', options)
    getGoodsCent(res => {
        
      // 地图设置
      let markers = [{
        iconPath: "../../img/ico/maps.png",
        id: 0,
        latitude: res.map.x,
        longitude: res.map.y,
        width: 30,
        height: 30
      }] //地图
      console.log('商品信息:', res)


      this.setData({
        datas: res,
        markers: markers,
        texts: res.texts
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

    // 获取推荐商品
    getHome(res =>{
        console.log('推荐商品', res )
        this.setData({
          tDatas: res.objects
        })
    }, { offset: 0, classID: parseInt(1536221748898156) })

    // 入口判断
    console.log(' 入口判断: ', options)     //0 商品详情页进来，  1 扫码来
    if (options.userid == '0' ){
      // 显示点赞过商品的人
      this.setData({
        int: false,
        userid: app.globalData.userInfo.id,
        goodsid: options.id
      })
      console.log('详情页')
    } else{
      // 查询点过赞的用户
      console.log('扫码', String(app.globalData.userInfo.id), String(options.id))
      postActivity(res=>{
        console.log('初始化', res)
        if(res.objects.length == 0){
          this.setData({
            userid: options.userid,
            goodsid: options.id,
            poster: 0 
          })
        }else{
          this.setData({
            userid: options.userid,
            goodsid: options.id,
            intli: res.objects[0].userImg,
            poster: res.objects[0].poster 
          })
        }
        
      }, { userId: String(options.userid), goodsId: options.id })
    }

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
  },  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onIntGet()
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
   ReachBottom: function (){
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})