读取
.find()   // 查找全部数据

.findById()   // 查找id为条件的数据

.findOne()   // 查找一条数据


更新
.update()  // 已弃用

.updateOne()  // 更新一条

.updateMany()  // 批量更新


删除
.deleteOne()  // 删除一条

.deleteMany()  // 批量删除


条件控制
运算符：
  '>'   :  '$gt'    // 大于
  '<'   :  '$lt'    // 小于
  '>='  :  '$gte'   // 大于等于
  '<='  :  '$lte'   // 小于等于
  '!==' :  '$ne'    // 不等于
db.modal.find({price:{$gt:10}})  // 查询价格大于10的数据

逻辑控制
  '$or'   // 或  
  '$and'  // 且
db.modal.find({$or:[{name:'zty'},{name:'lxy'}]})  // 查询名字为zty或者名字为lxy的数据
db.modal.find({$and:[{price:{$gt:30}},{price:{$lt:70}}]})  // 查询价格大于30且小于70的数据

正则匹配 => 可用于模糊查询
db.modal.find({name:/imissyou/})  // 查询名字带imissyou的数据
db.modal.find({name:new RegExp(v)})  // 利用 RegExp 查询存在变量值的数据


个性化读取
.find().select()  // 返回：1  不反回：0
db.modal.find().select({name:1,author:1})  // 结果只包含 name 和 author

.find.sort() // 升序：1  降序：-1
db.modal.find().sort({price:1})  // 结果按价格升序排列

.find.limit()
db.modal.find().limit(3)  // 结果取出前三条

.find().skip()
db.modal.find().skip(3).limit(3)  // 结果取出第4-6条