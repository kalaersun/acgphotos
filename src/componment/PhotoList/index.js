import React from 'react'
import PhotoListTop from './componment/PhotoListTop'
import PhotoWaterFall from './componment/PhotoWaterFall'
import {getQueryString} from './../../util'
import axios from 'axios'

import './index.scss'
class PhotoList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            albumId: '',
            photoList: [],
            activityName: '',
            classIfy: [],
            author: '',
            date: '',
            bannerPic: '',
            coverPic: '',
            desc: '',
            curPart:{
                label:"全部",
                value:"all"
            },
            total:'**',
            order:'date'//pv
        }
    }
    componentWillMount=()=>{
        this.queryAlbumInfo()
    }
    queryAlbumInfo=(id='',type="")=>{
        let albumId = getQueryString('id')
        axios.post('/album/info', {albumId,id,type}).then(res => {
            if (res.request.status === 200 && res.data.code === 0) {
                const { activityName, date, classIfy, photoList, bannerPic, coverPic, desc } = res.data.data
                this.setState({
                    albumId, activityName, date, classIfy, photoList, bannerPic, coverPic, desc
                })
            } else {
                console.error("error")
            }
        })
    }
    handleClassifyChange=id=>{
        if(id==="all"){
            id=""
        }
        this.queryAlbumInfo(id)
    }
    handleSortChange=type=>{
        let id=""
        this.queryAlbumInfo(id,type)
    }
    setTotalView=total=>{
        this.setState({
            total
        })
    }
    render(){
        return(
            <div className="photo-list">
                <PhotoListTop {...this.state} handleClassifyChange={this.handleClassifyChange} handleSortChange={this.handleSortChange}/>
                <PhotoWaterFall {...this.state} setTotalView={this.setTotalView}/>
            </div>
        )
    }
}
export default PhotoList
//https://github.com/xudafeng/autoresponsive-react