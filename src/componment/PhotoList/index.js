import React from 'react'
import PhotoListTop from './componment/PhotoListTop'
import PhotoWaterFall from './componment/PhotoWaterFall'
class PhotoList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            picList:[],
            topBackPic:'',
            title:'',
            curPart:{
                label:"全部",
                value:"all"
            },
            order:'time'//pv

        }
    }
    render(){
        return(
            <div className="photo-list">
                <PhotoListTop/>
                <PhotoWaterFall/>
            </div>
        )
    }
}
export default PhotoList