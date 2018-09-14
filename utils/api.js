// 配置
export const config = (cd, obj) => {
  wx.showLoading({
    title: '加载中',
  })
  wx.BaaS.invokeFunction('set', obj).then(res => {
    cd(res.data)
    wx.hideLoading()
  })
}


// 商品分类
export const goodsCLass = (cd, obj) => {
  wx.showLoading({
    title: '加载中',
  })
  wx.BaaS.invokeFunction('getClass', obj).then(res => {
    cd(res.data)
    wx.hideLoading()
  })
}

// 首页商品
export const getHome = (cd, obj) =>{
  wx.showLoading({
    title: '加载中',
  })
  wx.BaaS.invokeFunction('getHome', obj).then(res => {
    cd(res.data)
    wx.hideLoading()
  })
}

// 商品详情
export const getGoodsCent = (cd, obj) =>{
  wx.showLoading({
    title: '加载中',
  })
  wx.BaaS.invokeFunction('getGoodsCent', obj).then(res => {
    cd(res.data.data)
    wx.hideLoading()
  }, err => {
    console.log(err)
  })
}

// 获取以点赞用户
export const postActivity = (cd ,obj) => {
  // wx.showLoading({
  //   title: '加载中',
  // })
  wx.BaaS.invokeFunction('postActivity', obj).then(res => {
    cd(res.data.data)
    wx.hideLoading()
  }, err => {
    console.log(err)
    cd(err)
  })
}

//点赞助力
export const postActivityAdd = (cd,obj) =>{
  wx.showLoading({
    title: '点赞',
  })
  wx.BaaS.invokeFunction('postActivityAdd', obj).then(res => {
    cd(res.data)
    wx.hideLoading()
  }, err => {
    console.log(err)
    cd(err)
  })
}

// 新建点赞分享
export const postActivityGet = (cd ,obj)=>{
  wx.BaaS.invokeFunction('postActivityGet', obj).then(res => {
    cd(res)
  }, err => {
    console.log(err)
  })
}

//用户收藏
export const userCollect = (cd, obj) => {
  wx.showLoading({
    title: '收藏',
  })
  wx.BaaS.invokeFunction('userCollect', obj).then(res => {
    cd(res)
    wx.hideLoading()
  }, err => {
    console.log(err)
  })
}

// 获取用户收藏
export const postUserCollect = (cd, obj) => {
  wx.showLoading({
    title: '加载中',
  })
  
  wx.BaaS.invokeFunction('postUserCollect', obj).then(res => {
    cd(res)
    wx.hideLoading()
  }, err => {
    console.log(err)
  })

}

// 移除收藏商品
export const rmUserCollect = (cd,obj) => {
  wx.showLoading({
    title: '删除',
  })
  wx.BaaS.invokeFunction('rmUserCollect', obj).then(res => {
    // console.log('rss' , res)
    cd(res)
    wx.hideLoading()
  }, err => {
    console.log(err)
  })
}

// 生产海报
export const addPoster = (a)  => new Promise((r,j) => {
  wx.showLoading({
    title: '大吉大利',
  })
  let that = this
  wx.request({
    url: 'https://api.hez.fun/cimg', //仅为示例，并非真实的接口地址
    data: a,
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: 'POST',
    success: function (res) {
      r('https://' + res.data.cosImg.Location)
    },
    fail: function (err) {
      console.log('err', err)
      j(err)
    }
  })
})

// 生成二维码 
export const rwm = (a) => new Promise((r,j)=>{
  wx.showLoading({
    title: '生成专属二维码',
  })
  wx.BaaS.getWXACode('wxacode', a, true).then(res => {
    r(res.download_url)
  }).catch(err => {
    console.log(err)
    j(err)
  })
})


// 发送模版消息
export const sendTemp = (cd,obj)=>{
  wx.showLoading({
    title: '加载中',
  })
  wx.BaaS.invokeFunction('sendTemp', obj ).then(res => {
    console.log('发送模版消息' , res)
    // cd(res)
    wx.hideLoading()
  }, err => {
    console.log(err)
  })
} 


// 核销用户点赞
export const destructionGoods = (cd, obj) => {
  wx.showLoading({
    title: '核销中',
  })
  wx.BaaS.invokeFunction('destructionGoods', obj).then(res => {
    // console.log('res', res)
    cd(res)
    wx.hideLoading()
  }, err => {
    console.log(err)
  })
} 

// 查询用户分享海报
export const getActovotyPoster = (cd, obj) => {
  wx.BaaS.invokeFunction('getActovotyPoster', obj).then(res => {
    // console.log('res', res)
    cd(res)
    wx.hideLoading()
  }, err => {
    console.log(err)
  })
}
