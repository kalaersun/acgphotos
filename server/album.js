const express = require('express')
const Router = express.Router()
const model = require('./models')
const fs = require('fs');
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');
const  formidable = require('formidable')
const gm = require('gm');
const album= model.getModel('album')
const ClassIfy= model.getModel('classIfy')
const PhotoList= model.getModel('photoList')
const User= model.getModel('user')
const _filter = {'password':0,'__v':0}
const SecretId = 'AKIDmPu5HU8IPMBpNvNtMk3DczEKEze734gP'; // 替换为用户的 SecretId
const SecretKey = 'vwpT3SgihS7c5SflHh9RgyErLxhWLpcF';    // 替换为用户的 SecretKey
const Bucket = 'acgphotos-1253197050';                        // 替换为用户操作的 Bucket
const Region = 'ap-shanghai';                           // 替换为用户操作的 Region
let cos = new COS({SecretId: SecretId, SecretKey: SecretKey});

Router.post('/newAlbum',function(req,res){
    const AlbumModel = new album()
    const ClassIfyModel = new ClassIfy()
    const PhotoListModel = new PhotoList()
    const {userId}=req.cookies
	if(!userId){
		return res.json({errorMsg:'用户未登陆'})
	}
	User.findOne({_id:userId},_filter,(err,doc)=>{
		if(err)
		{
			return res.json({errorMsg:'服务器出错了'})
		}
	})
})
Router.post('/tmpUploadFile',function(req,res){
    let form = new formidable.IncomingForm();
    const {userId}=req.cookies
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + "/../page/upload");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req, function (err, fields, files){
        let filename = files.avatar.name
        let nameArray = filename.split('.');
        let type = nameArray[nameArray.length - 1];
        let name = '';
        for (let i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        let date = new Date();
        let time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        let avatarName = name + time + userId+'.' + type;
        let newPath = form.uploadDir + "/";
        let newName=form.uploadDir + "/" + avatarName;
        fs.renameSync(files.avatar.path, newName);  //重命名
        cosUpload(newPath,avatarName).then(result=>{
            return res.json({avatarName,errorMsg:'成功上传至暂存文件夹',code:0})
        },rej=>{
            return res.json({file:{
                uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
                name: avatarName,  // 文件名
                status: 'done', // 状态有：uploading done error removed
                response: '{"status": "error"}', // 服务端响应内容
                linkProps: '{"download": "image"}', // 下载链接额外的 HTML 属性
                cosUpload:rej,
             },errorMsg:'成功上传至暂存文件夹',code:1})
        }).catch(error=>{
            console.log(error)
        })

    })
})
module.exports = Router
function transferUpload(req,res){
    const {userId}=req.cookies
    return new Promise((resolve,reject)=>{
        let form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = path.join(__dirname + "/../page/upload");
        form.keepExtensions = true;//保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;
        form.parse(req, function (err, fields, files){
            let filename = files.avatar.name
            let nameArray = filename.split('.');
            let type = nameArray[nameArray.length - 1];
            let name = '';
            for (let i = 0; i < nameArray.length - 1; i++) {
                name = name + nameArray[i];
            }
            let date = new Date();
            let time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
            let avatarName = name + time + '.' + type;
            let newPath = form.uploadDir + "/" + avatarName;
            fs.renameSync(files.avatar.path, newPath);
            resolve({data:1,name:avatarName})
        })
    })
}
function cosUpload(__dirname,name){
    return new Promise((resolve,reject)=>{
        cos.putObject({
            Bucket: Bucket,
            Region: Region,
            Key: name,
            Body: fs.readFileSync(path.resolve(__dirname, name))
        }, function (err, data) {
            if(err){
                reject({code:1,error:err})
            }else{
                resolve({coed:0,data:data})
            }
        });
    })
}