const express = require('express')
const Router = express.Router()
const model = require('./models')
const fs = require('fs');
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');
const formidable = require('formidable')
const gm = require('gm');
const Album= model.getModel('album')
const ClassIfyModel= model.getModel('classIfy')
const PhotoListModel= model.getModel('photoList')
const User= model.getModel('user')
const _filter = {'password':0,'__v':0}
const SecretId = 'AKIDmPu5HU8IPMBpNvNtMk3DczEKEze734gP'; // 替换为用户的 SecretId
const SecretKey = 'vwpT3SgihS7c5SflHh9RgyErLxhWLpcF';    // 替换为用户的 SecretKey
const Bucket = 'acgphotos-1253197050';                        // 替换为用户操作的 Bucket
const Region = 'ap-shanghai';                           // 替换为用户操作的 Region
let cos = new COS({SecretId: SecretId, SecretKey: SecretKey});
let curPath=path.join(__dirname + '/../page/upload/');
Router.post('/newAlbum',function(req,res){
    const {userId}=req.cookies
    let {title,coverPic,bannerPic,desc,activityName,author}=req.body
    let albumId=''
    cosUpload(coverPic).then(coverPicRes=>{
        coverPic=coverPicRes.data.Location
        return cosUpload(bannerPic)
    }).then(bannerPicRes=>{
        bannerPic=bannerPicRes.data.Location
        return addAlbum({userId,title,coverPic,bannerPic,desc,activityName,author})
    }).then(result => {
        albumId=result.albumId
        return addClassify(req, albumId) }).then(classIfy => {
        return res.json({errorMsg:'新建成功',code:0,albumId})
    }).catch(error=>{
        return res.json({error,code:1})
    })
})
Router.post('/tmpUploadFile',function(req,res){
    const {userId}=req.cookies
    transferUpload(req,res,userId).then(result=>{
        let avatarName=result.avatarName
        return res.json({avatarName,errorMsg:'成功上传到暂存文件夹，保存后生效',code:0})
    },rej=>{
        return res.json({errorMsg:'上传到暂存文件夹失败，请稍后再试',code:1})
    }).catch(error=>{
        return res.json({error,code:1})
    })
})
Router.post('/batchUploadFile',function(req,res){
    const { classIfyId } = req.body
    let cosrUrl=''
    transferUpload(req, res, classIfyId).then(result => {
        return cosUpload(result.avatarName)
    }).then(cosResult => {
        cosrUrl=cosResult.data.Location
        return getImageWH(cosrUrl)
    }).then(result=>{
        return addPhotoList(classIfyId, result.width, result.height, result.avatarName)
    }).then(result => {
        return res.json({ code: 0, errorMsg: '成功上传' })
    }).catch(error => {
        return res.json({ code: 1, error:error.err })
    })
})
Router.post('/info',function(req,res){
    const {albumId}=req.body
    Album.findOne({_id:albumId},function(err,doc){
        if(err){
            return res.json({code:1,errorMsg:'服务器错误',error:err})
        }else{
            //const {activityName,author,coverPic,bannerPic,desc,date}=doc
            ClassIfyModel.find({albumId},function(err,doc){
                if(err){
                    return res.json({code:1,errorMsg:'服务器错误',error:err})
                }else{
                    let classIfy=doc.map(el=>{
                        return {id:el._id,title:el.title,date:el.date}
                    })
                    let photoList=[]
                    return res.json({code:0,errorMsg:'查询成功',/* data:{activityName,author,coverPic,bannerPic,desc,date,classIfy,photoList} */})
                }
            })
        }
    })
})
module.exports = Router
function transferUpload(req,res,Id){
    return new Promise((resolve,reject)=>{
        let form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = curPath;
        form.keepExtensions = true;//保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;
        form.parse(req, function (err, fields, files){
            let filename = files.avatar.name
            let nameArray = filename.split('.');
            let type = nameArray[nameArray.length - 1];
            let name = '';
            let date = new Date();
            let time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes()+ "_" + date.getSeconds();
            for (let i = 0; i < nameArray.length - 1; i++) {
                name = name + nameArray[i];
            }
            let avatarName = name + time + Id+'.' + type;
            let withPathName=form.uploadDir +  avatarName;
            fs.renameSync(files.avatar.path, withPathName);  //重命名
            resolve({avatarName})
        })
    })
}
function cosUpload(name){
    return new Promise((resolve,reject)=>{
        cos.putObject({
            Bucket: Bucket,
            Region: Region,
            Key: name,
            Body: fs.readFileSync(path.resolve(curPath, name))
        }, function (err, data) {
            if(err){
                reject({code:1,error:err})
            }else{
                resolve({err})
            }
        });
    })
}
function addAlbum(data){
    const {userId,coverPic,bannerPic,desc,activityName,author}=data
    return new Promise((resolve,reject)=>{
		const AlbumModel = new Album({userId:userId,activityName,author,coverPic,bannerPic,desc,date:new Date().getTime()})
		AlbumModel.save((err,doc)=>{
			if(err){
                reject({err})
			}else{
                const {_id}=doc
				resolve({albumId:_id})
			}
		})
    })
}
function addClassify(req,albumId){
    const {classIfy}=req.body
    return new Promise((resolve,reject)=>{
        let result=[]
        classIfy.forEach(el=>{
            new ClassIfyModel({albumId:albumId,title:el.title,date:new Date().getTime()}).save((err,doc)=>{
                if(err){
                    reject({err})
                }else{
                    result.push(doc)
                }
            })
        })
        resolve({result})
    })
}
function addPhotoList(classIfyId,src,height,width){
    return new Promise((resolve,reject)=>{
        console.log(classIfyId,src,height,width)
        new PhotoListModel({classIfyId,src,width,height,viewNumber:0,date:new Date().getTime()}).save((err,doc)=>{
            if(err){
                reject({err})
            }else{
                resolve({result:doc})
            }
        })
    })
}
function getImageWH(avatarName){
    return new Promise((resolve,reject)=>{
        console.log(avatarName)
        gm(avatarName).size((err,result)=>{
            if(!err){
                resolve({result,avatarName})
            }else{
                reject({err})
            }
        })
    })
}