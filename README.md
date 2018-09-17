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
	* id 用户表内id  scr	
	* info 用户基本信息（头像／ 昵称／性别／地址／） obj
	* loveGoods 喜欢的商品 （商品id）	arr	
	* buyGoods 购买过的商品 （商品id） arr	
	* shareGoods 分享过的商品（商品id） 	arr
	* joinGoods  参与活动的商品 （商品id） 	arr

* 商品信息
	* id 商品id  scr
	* richText 描述详情页id  scr
	* price 价格 scr
	* brand 品牌 src
	* map 位置 geojson
	* store 店铺名称	scr
	* activity 参与活动的用户（头像，用户id） obj

* 分类信息
	* className 分类名称
	* classId 分类id
	 

* 记录树 datas
	* 用户行为记录
		* userID 用户id
		* goodsID 商品id
		* times 停留时间
		
	* 用户喜欢
		* userID 用户id	
		* goodsID 商品id

	* 用户关系网
		*  activity 活动发起人（用户id） obj
		*  activityRom 活动参与人 arr		



* 设置 config （分类是否显示食品类）
	* 测试模式
	* 开发者模式	
	





*** 

### 云函数

##### config 测试状态函数
	
	
	exports.main = function functionName(event, callback) {
	  let query = new BaaS.Query()
	  let Product = new BaaS.TableObject(49225)
	  Product.find().then(res => {
	    callback(null, res.data)
	  }, err => {
	    callback(null, err)
	  })
	}
	
	
	

##### getClass 获取首页分类信息   【分类表单id／测试／线上】
	// {
	//   tableID: 49223
	// }
	
	exports.main = function functionName(event, callback) {
	  let query = new BaaS.Query()
	  let Product = new BaaS.TableObject(event.data.tableID)
	  Product.find().then(res => {
	    callback(null, res.data)
	  }, err => {
	    callback(null, err)
	  })
	}
	
##### getHome 获取首页商品信息 【内容库id ／ 10列一页】
	exports.main = function functionName(event, callback) {
	  let MyContentGroup = new BaaS.ContentGroup(1535077985530912)
	  let query = new BaaS.Query()
	  query.arrayContains('categories', [event.data.classID])
	
	  MyContentGroup.setQuery(query).limit(10).offset( event.data.offset).orderBy(['-created_at']).find().then( res => {
	     callback(null, res.data)
	  })
	   
	}


### 设计稿子
##### 封面图
960*660(px) 要压缩

##### 详情页
960*1200（每张／压缩）


