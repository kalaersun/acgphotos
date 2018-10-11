import React from 'react'
import './index.scss'
import { Input, Upload, Icon, message, Button, Select } from 'antd'
import { getBase64, beforeUpload, getQueryString } from '../../util'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
@withRouter
class EditAlbum extends React.Component {
    constructor() {
        super()
        this.state = {
            albumId: '',
            photoList: [],
            activityName: '',
            activityNameSelected: [],
            classIfy: [],
            author:'',
            date:'',
            bannerPic:'',
            coverPic:'',
            desc:''
        }
    }
    componentDidMount() {
        let albumId = getQueryString('id')
        debugger
        axios.post('/album/info',{albumId}).then(res => {
            if(res.request.status===200&&res.data.code===0){
                message.success(res.data.error_Msg)
                const {activityName,date,classIfy,photoList,bannerPic,coverPic,desc}=res.data.data
                this.setState({
                    activityName,date,classIfy,photoList,bannerPic,coverPic,desc
                })
            }else{
                console.error("error")
            }
        })
    }
    handleSelectChange = () => {

    }

    render() {
        const props = {
            name: 'file',
            multiple: true,
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        const { albumId, photoList, activityName, activityNameSelected, classIfy } = this.state
        const Option = Select.Option
        const Dragger = Upload.Dragger;
        console.log(this.state)
        return <div className="edit-album">
            <div className="edit-album-section">
                <p>相册编辑</p>
            </div>
            <div className="edit-album-section">
                <div className="edit-album-section-title">
                    活动分类
                </div>
                <div className="edit-album-section-select">
                    {classIfy.length !== 0 && <Select value={activityNameSelected} onChange={this.handleSelectChange}>
                        {classIfy.map(el => {
                            return <Option value={el._id}>{el.title}</Option>
                        })
                        }
                    </Select>
                    }
                </div>
                <div className="edit-album-section-upload">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">单机或者拖拽文件上传</p>
                        <p className="ant-upload-hint">支持单文件，多选，目录上传</p>
                    </Dragger>
                </div>
            </div>
            <div className="edit-album-section">
                <div className="edit-album-section-pic-list">

                </div>
            </div>
        </div>
    }
}
export default EditAlbum