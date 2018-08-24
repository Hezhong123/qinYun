# 青语MK- 小程序端

### 设计
 * [ico图标](http://iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=7077) 

 
 

#### 数据表
*	set	   设置	
* 	activity 活动
*  goodsClass 商品类
*  userBuy	 用户购买记录
*  userCollect   用户
*  userCollect 用户收藏
*  userRecord  用户操作记录
*  user 用户信息
 

*** 

### 函数
##### 获取商品信息
	exports.main = function functionName(event, callback) {
	  let query = new BaaS.Query()
	  let Product = new BaaS.TableObject(49223)
	  Product.find().then(res => {
	    callback(null, res.data)
	  }, err => {
	    callback(null, err)
	  })
	}
	
	// 商品分类
	export const goodsCLass = (cd,obj) => {
	  wx.showLoading({
	    title: '加载中',
	  })
	  wx.BaaS.invokeFunction('getClass', obj).then(res => {
	    cd(res.data)
	    wx.hideLoading()
	  })
	}