// 配置工具

// 下载图片，保存到本地
export const dowImgs = (urls) => {
  wx.downloadFile({
    url: urls, //仅为示例，并非真实的资源
    success: function (res) {
      let dmw = res.tempFilePath
      // 保存到本地
      wx.saveImageToPhotosAlbum({
        filePath: dmw,
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
      console.log('下载的图片', res)
    }
  })
}

// 随机数生成
export const randomString = (len, charSet)=>{
  // charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  charSet = charSet || '0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}