const express = require('express')
const Router = express.Router()
const model = require('./models')
const utils =require('utility')
const User= model.getModel('user')
const _filter = {'password':0,'__v':0}
Router.get('/info',function(req,res){
	const {userId}=req.cookies
	if(!userId){
		return res.json({code:1})
	}
	User.findOne({_id:userId},_filter,(err,doc)=>{
		if(err)
		{
			return res.json({code:1,errorMsg:'后端出错了'})
		}
		return res.json({code:0,data:doc})
	})
})
Router.get('/list',function (req,res){
	User.find({},function(error,doc){
		return res.json(doc)
	})
})
Router.post('/register',function(req,res){
	const {username,password}=req.body
	User.findOne({username:username},function(err,hasdoc){
		if(hasdoc){
			return res.json({code:1,errorMsg:'用户名已存在'})
		}
		const UserModel = new User({username,password:md5Password(password)})
		UserModel.save(_filter,(err,doc)=>{
			if(err){
				return res.json({code:1,errorMsg:'服务器出现错误'})
			}else{
				const {username,_id}=doc
				res.cookie('userId',_id)
				return res.json({code:0,errorMsg:'注册成功',data:{username,_id}})
			}
		})
	})
})
Router.post('/login',function(req,res){
	const {username,password}=req.body
	User.findOne({username:username,password:md5Password(password)},_filter,(err,doc)=>{
		if(!doc){
			return res.json({code:1,errorMsg:'不存在的用户'})
		}else{
			res.cookie('userId', doc._id)
			return res.json({code:0,errorMsg:'登陆成功',data:doc})
		}
	})
})

module.exports = Router
//可以采用两层MD5  不过暂时不予考虑
function md5Password(password){
	const salt= "acgphotos@1220432426@qq.com"
	return utils.md5(password+salt)
}