const express = require('express')
const Router = express.Router()
const model = require('./models')
const User= model.getModel('user')
Router.get('/info',function(req,res){
	return res.json({code:0})
})
Router.get('/list',function (req,res){
	User.find({},function(error,doc){
		return res.json(doc)
	})
})
Router.post('/register',function(req,res){
	const {username,password}=req.body
	User.findOne({username:username},function(err,doc){
		if(doc){
			return res.json({code:1,errorMsg:'用户名已存在'})
		}
		User.create({username,password},function(err,doc){
				if(err){
					return res.json({code:1,errorMsg:'服务器出现错误'})
				}else{
					return res.json({code:0,errorMsg:'注册成功'})
				}
			})
	})
})
module.exports = Router