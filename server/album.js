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
    //console.log("0",userId)
    cosUpload({avatarName:coverPic}).then(result=>{
        coverPic=result.data.Location
        //console.log("1",coverPic)
        return cosUpload({avatarName:bannerPic})
    }).then(result=>{
        bannerPic=result.data.Location
        //console.log("2",bannerPic)
        return addAlbum({userId,title,coverPic,bannerPic,desc,activityName,author})
    }).then(result => {
        albumId=result.albumId
        //console.log("3",albumId)
        return addClassify(req, albumId) }).then(classIfy => {
        return res.json({errorMsg:'新建成功',code:0,albumId})
    }).catch(error=>{
        //console.log("4",error)
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
    transferUpload(req, res).then(result => {
        //console.log("1",result)
        const {avatarName,classIfyId}=result
        return cosUpload({avatarName,classIfyId})
    }).then(result => {
        let cosUrl=result.data.Location
        const {avatarName,classIfyId}=result
        //console.log("2",result)
        return getImageWH({avatarName,cosUrl,classIfyId})
    }).then(result=>{
        //console.log("3",result)
        let size=result.result
        let classIfyId=result.classIfyId
        return addPhotoList({classIfyId,width:size.width,height:size.height,cosUrl:result.cosUrl})
    }).then(result => {
        //console.log("4",result)
        return res.json({ code: 0, errorMsg: '成功上传' })
    }).catch(error => {
        //console.log("5",error)
        return res.json({ code: 1, error })
    })
})
Router.post('/info',function(req,res){
    const {albumId,id,type}=req.body
    Album.findOne({_id:albumId},function(err,doc){
        if(err){
            return res.json({code:1,errorMsg:'服务器错误',error:err})
        }else{
            const {activityName,author,coverPic,bannerPic,desc,date}=doc
            ClassIfyModel.find({albumId},function(err,doc){
                if(err){
                    return res.json({code:1,errorMsg:'服务器错误',error:err})
                }else{
                    let classIfyId=[]
                    let classIfy=doc.map(el=>{
                        classIfyId.push(el._id)
                        return {id:el._id,title:el.title,date:el.date}
                    })
                    //根据传递的参数选择classIfy
                    if(type){
                        PhotoListModel.find({classIfyId:id||classIfyId}).sort({type:-1}).exec((error,photoList)=>{
                            if(!error){
                                return res.json({code:0,errorMsg:'查询成功',data:{activityName,author,coverPic,bannerPic,desc,date,classIfy,photoList} })
                            }
                            return res.json({error})
                        }) 
                    }else{
                        PhotoListModel.find({classIfyId:id||classIfyId}).exec((error,photoList)=>{
                            return res.json({code:0,errorMsg:'查询成功',data:{activityName,author,coverPic,bannerPic,desc,date,classIfy,photoList} })
                        })
                    }
                }
            })
        }
    })
})
Router.post('/addview',(req,res)=>{
    const {_id}=req.body
    PhotoListModel.updateOne({_id},{$inc:{viewNumber:1}},function(err,doc){
        return res.json({code:1})
    })
})
module.exports = Router
//中转存储
function transferUpload(req){
    return new Promise((resolve,reject)=>{
        let form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = curPath;
        form.keepExtensions = true;//保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;
        form.parse(req, function (error, fields, files){
            let classIfyId = fields.classIfyId||req.cookies.userId
            let filename = files.avatar.name
            let nameArray = filename.split('.');
            let type = nameArray[nameArray.length - 1];
            let name = '';
            let date = new Date();
            let time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes()+ "_" + date.getSeconds();
            for (let i = 0; i < nameArray.length - 1; i++) {
                name = name + nameArray[i];
            }
            let avatarName = name + time +'_'+classIfyId+'.' + type;
            let withPathName=form.uploadDir +  avatarName;
            fs.renameSync(files.avatar.path, withPathName);  //重命名
            //console.log("1.5",classIfyId)
            if(error)
            {
                reject({error})
            }
            resolve({avatarName,classIfyId})
        })
    })
}
//cos上传
function cosUpload({avatarName,classIfyId=""}){
    return new Promise((resolve,reject)=>{
        cos.putObject({
            Bucket: Bucket,
            Region: Region,
            Key: avatarName,
            Body: fs.readFileSync(path.resolve(curPath, avatarName))
        }, function (error, data) {
            if(error){
                reject({error})
            }else{
                resolve({data,avatarName,classIfyId})
            }
        });
    })
}
//新增相册
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
//新增活动种类
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
//新增图片
function addPhotoList({classIfyId,width,height,cosUrl}){
    return new Promise((resolve,reject)=>{
        new PhotoListModel({classIfyId,src:cosUrl,width,height,viewNumber:0,date:new Date().getTime()}).save((error,doc)=>{
            if(error){
                reject({error})
            }else{
                resolve({result:doc})
            }
        })
    })
}
//gm获取图片规格
function getImageWH({avatarName,cosUrl,classIfyId}){
    return new Promise((resolve,reject)=>{
        gm(curPath+avatarName).size((err,result)=>{
            if(!err){
                resolve({result,avatarName,cosUrl,classIfyId})
            }else{
                reject({err})
            }
        })
    })
}