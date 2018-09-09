const app = getApp()
import hez from '../../utils/hez.js'
const wxParser = require('../../wxParser/index');
const config = app.globalData 
import { getGoodsCent, postActivity, postActivityAdd, postActivityGet, userCollect, getHome, addPoster, rwm, postImg} from '../../utils/api.js'
// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: "",  //富文本
    markers: '',   //地图
    stort: 0,   //页面状态 0普通 1积赞 2拼团
    userId: '',   //点赞用户id
    goodsId: '',  //商品id
    intli: '',   //点赞用户
    userImg: '', //用户头像
    poster: 0,   //商品生成的海报 0未生成， str海报地址
    imageBase64: '',  //小程序码
    dataText: '商品海报',
    maps:false,
    int:true,
    ints:true,
   
    tDatas: '',   //推荐商品
    latitude:"",
    longitude:"",
   
  },

  // 显示位置
  onMap: function(){
    this.setData({
      int: false,
      maps: true,
      stort: 0
    })
  },

  // 关闭地图
  offMap: function(){
    this.setData({
      maps: false
    })
  },


  // 客服
  onKf: function(e){
    console.log(e)
  },

  //新建分享海报
  onShop: function(){
    console.log(this.data.poster)
    // 1用户打印自己的海报 2点赞的用户打印自己的海报   
    if (this.data.userId == String(app.globalData.userInfo.id) && this.data.poster != 0 ){ 
      console.log('用户自己的海报', this.data.poster, '二维码', this.data.imageBase64)
      this.dowImg(this.data.poster)
    }else{  //生成游客海报
      
      // 二维码生成参数
      let params = {
        path: 'pages/goodsA/goodsA?id=' + this.data.goodsId + '&userid=' + app.globalData.userInfo.id + '&stort=1',
        width: 250
      }
      rwm(params).then((r, j) => {
        console.log('二维码参数', r)
        // 海报生成参数
        let obj = {
          bj: 'https://cloud-minapp-15402.cloud.ifanrusercontent.com/1fyD19IWYXrnynRE.jpg',
          infos: app.globalData.userInfo.avatarUrl,
          name: app.globalData.userInfo.nickName,
          text: this.data.datas.title,
          rwm: r,
          goodsImg: this.data.datas.cover.path
        }
        // 生成海报
        addPoster(obj).then((r,j)=>{
          this.setData({
            poster: r
          })
          let objs = {
            userId: String(app.globalData.userInfo.id), // 用户id
            goodsId: this.data.goodsId,    //商品id
            item: app.globalData.userInfo.avatarUrl,   //用户头像
            poster: this.data.poster    //海报
          }
          // 写入点赞用户
          postActivityGet(res => {
            // 查询是否有
            console.log('新建分享数据', res)
            if (typeof (res.data) == 'string') {
              let objs = {
                recordID: res.data,
                item: app.globalData.userInfo.avatarUrl
                // poster: this.data.poster
              }
              postActivityAdd((res) => {
                console.log('写入成功', res.data)
                this.setData({
                  poster: res.data.poster
                })

              }, objs)
            } else {
              this.setData({
                // intli: res.data.data.userImg,
                poster: res.data.data.poster
              })
            }
          }, objs)
          this.dowImg(r)    //下载
        })
      })
      
    }
      
  },

  // 下载图片
  dowImg: function(e){
    wx.downloadFile({
      url: e, //仅为示例，并非真实的资源
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
    let obj = {
      userId: this.data.userId, // 用户id
      goodsId: this.data.goodsId,    //商品id
      item: app.globalData.userInfo.avatarUrl,   //用户头像
      poster: this.data.poster    //海报
    }
    // 写入点赞用户
    postActivityGet(res=>{
      // 查询是否有
      console.log('点赞查询', res)
      if (typeof (res.data) == 'string'){
        let objs = {
          recordID: res.data,
          item: app.globalData.userInfo.avatarUrl
          // poster: this.data.poster
        }
        postActivityAdd((res) => {
          console.log('写入成功', res)
          this.setData({
            intli: res.data.userImg
          })
        },objs)
      }else{
        this.setData({
          intli: res.data.data.userImg
        })
      }
    },obj)
  },

  // 收藏商品
  onCollect: function(){
    let obj = {
      userId:String(app.globalData.userInfo.id),
      goodsId: this.data.goodsId,
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
      url: '../../pages/goodsA/goodsA?id=' + ins + '&userid=' + 0 + '&stort=' + 0
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
    console.log('商品详情页cs', options)

    // 页面初始化 夹在坐标， 设置详情页 
    getGoodsCent(res => { 
      console.log('商品信息:', res)

      // 地图设置
      let markers = [{
        iconPath: "../../img/ico/maps.png",
        id: 0,
        latitude: res.map.x,
        longitude: res.map.y,
        width: 30,
        height: 30
      }] //地图
      

      // 默认值 图文，坐标， 用户id ， 商品id， zt
      this.setData({
        datas: res, 
        markers: markers,
        userId: options.userid ,
        goodsId: options.id,
        stort: options.stort
      })

      // 设置标题
      wx.setNavigationBarTitle({
        title: res.title
      })

      // 渲染富文本
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

    // 查询点过赞的用户
    postActivity(res => {
      console.log('点赞查询初始化', res)
      if (res.objects.length != 0 ){ 
        this.setData({
          intli: res.objects[0].userImg,  //点赞用户集合
          poster: res.objects[0].poster  //生成海报
        })
        console.log('点赞用户：', res.objects[0].userImg, '海报', res.objects[0].poster )
      }
    }, { userId: String(options.userid), goodsId: options.id })


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
              // console.log('头像',app.globalData.userInfo.avatarUrl)
              // wx.downloadFile({
              //   url: app.globalData.userInfo.avatarUrl, //仅为示例，并非真实的资源
              //   success: function (res) {
              //     console.log('下载用户头像', res)
              //     hez.upload(that,res=>{
              //       // console.log('上传头像', res.data.path) 
              //       that.setData({
              //         userImg: res.data.path
              //       })
              //     }, res.tempFilePath, '头像')
              //   },
              //   fail: function(err){
              //     console.log('下载',err)
              //   }
                
              // })
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