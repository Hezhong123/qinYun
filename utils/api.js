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