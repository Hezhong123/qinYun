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
  wx.showLoading({
    title: '加载中',
  })
  wx.BaaS.invokeFunction('postActivity', obj).then(res => {
    cd(res.data.data)
    wx.hideLoading()
  }, err => {
    console.log(err)
  })
}

//点赞助力
export const postActivityAdd = (cd,obj) =>{
  wx.showLoading({
    title: '加载中',
  })
  wx.BaaS.invokeFunction('postActivityAdd', obj).then(res => {
    cd(res.data)
    wx.hideLoading()
  }, err => {
    console.log(err)
  })
}

// 新建点赞分享
export const postActivityGet = (cd ,obj)=>{
  wx.showLoading({
    title: '加载中',
  })
  wx.BaaS.invokeFunction('postActivityGet', obj).then(res => {
    cd(res)
    wx.hideLoading()
  }, err => {
    console.log(err)
  })
}

//用户收藏
export const userCollect = (cd, obj) => {
  wx.showLoading({
    title: '加载中',
  })
  wx.BaaS.invokeFunction('userCollect', obj).then(res => {
    cd(res)
    wx.hideLoading()
  }, err => {
    console.log(err)
  })
}