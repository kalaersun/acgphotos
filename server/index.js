const express = require('express')

const userRouter=require('./user')
const app = express()

let fs=require('fs');



app.use('/user',userRouter)
app.get('/',function(req,res){
	res.send('<h1>Hello world</h1>')
})
app.get('/photolist',(req,res)=>{
	let file="./data.json";
	let result=JSON.parse(fs.readFileSync(file));
	return res.send(result)
})
app.listen(9093,function(){
	console.log('Node app start at port 9093')
})
