import React from 'react'
import './index.scss'
import { Input, Upload, Icon, message, Button ,Select} from 'antd'
import { getBase64, beforeUpload,getQueryString } from '../../util'
import {Redirect,withRouter} from 'react-router-dom'
import axios from 'axios'
@withRouter
class EditAlbum extends React.Component {
    constructor(){
        super()
        this.state={
            albumId:''
        }
    }
    componentDidMount(){
        let albumId=getQueryString('id')
        this.setState({
            albumId
        })
        console.log(albumId)
    }
    render(){
        return null
    }
}
export default EditAlbum