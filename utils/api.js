let post = (url) => new Promise((r,e)=>{
  wx.downloadFile({
    url: url, //仅为示例，并非真实的资源
    success: function (res) {
      r(res)
      e('请求出错 0.0')
    }
  })
})

module.exports= {
  post
}