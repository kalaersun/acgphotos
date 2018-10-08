const mongoose = require('mongoose')
// 链接mongo 
const DB_URL = 'mongodb://localhost:27017/acgphotos'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
	console.log('mongo connect success')
})
const models={
	user:{
		'username':{type:String,require:true},
		'password':{type:String,require:true},
		'avator':{type:String},
		'desc':{type:String}
	},
	photoList:{
		'src':{type:String,require:true},
		'height':{type:String,require:true}
	}
}
for(let key in models){
	mongoose.model(key,new mongoose.Schema(models[key]))
}
module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}
// 类似于mysql的表 mongo里有文档、字段的概念，
/* const User = mongoose.model('user', new mongoose.Schema({
	user:{type:String,require:true},
	age:{type:Number,require:true}
})) */
// 新增数据
// User.create({
// 	user:'xiaohua',
// 	age:12
// },function(err, doc){
// 	if (!err) {
// 		console.log(doc)
// 	}else{
// 		console.log(err)
// 	}
// })
// 新建app
// User.remove({age:18},function(err,doc){
// 	console.log(doc)
// })
// User.update({'user':'xiaoming'},{'$set':{age:26}},function(err,doc){
// 	console.log(doc)
// })
/* app.get('/data',function(req,res){
	User.findOne({user:'xiaoming'},function(err,doc){
		res.json(doc)
	})
}) */
// app.get('/delete',function(){

// })