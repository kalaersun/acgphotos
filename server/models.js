const mongoose = require('mongoose')
// 链接mongo 
const DB_URL = 'mongodb://localhost:27017/acgphotos'
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, {useNewUrlParser:true}, function(err){
　　if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!') }
})
const models={
	user:{
		'username':{type:String,require:true},
		'password':{type:String,require:true},
		'avator':{type:String},
		'desc':{type:String}
	},
	album:{
		'userId':{type:String,require:true},
		'activityName':{type:String,require:true},
		'author':{type:String,require:true},
		'coverPic':{type:String,require:true},
		'bannerPic':{type:String,require:true},
		'desc':{type:String},
		'date':{type:String,require:true},
	},
	classIfy:{
		'albumId':{type:String,require:true},
		'title':{type:String,require:true},
		'date':{type:String,require:true}
	},
	photoList:{
		'classIfyId':{type:String,require:true},
		'src':{type:String,require:true},
		'height':{type:String,require:true},
		'width':{type:String,require:true},
		'viewNumber':{type:Number},
		'date':{type:String,require:true}
	},
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