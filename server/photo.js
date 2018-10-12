const express = require('express')
const Router = express.Router()
const model = require('./models')
const photoList= model.getModel('photoList')
Router.get('/info',function(req,res){
	const {userId}=req.cookies
	if(!userId){
		return res.json({code:1})
	}
})