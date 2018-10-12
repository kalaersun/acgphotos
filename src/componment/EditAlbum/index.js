import React from 'react'
import './index.scss'
import { Input, Upload, Icon, message, Button, Select } from 'antd'
import { getBase64, beforeUpload, getQueryString, formatDate } from '../../util'
import { Redirect, withRouter } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
@withRouter
class EditAlbum extends React.Component {
    constructor() {
        super()
        this.state = {
            albumId: '',
            photoList: [],
            activityName: '',
            activityClassIfySelected: '',
            classIfy: [],
            author: '',
            date: '',
            bannerPic: '',
            coverPic: '',
            desc: ''
        }
    }
    componentDidMount() {
        let albumId = getQueryString('id')
        axios.post('/album/info', { albumId }).then(res => {
            if (res.request.status === 200 && res.data.code === 0) {
                message.success(res.data.error_Msg)
                const { activityName, date, classIfy, photoList, bannerPic, coverPic, desc } = res.data.data
                this.setState({
                    albumId, activityName, date, classIfy, photoList, bannerPic, coverPic, desc, activityClassIfySelected: classIfy[0].id
                })
            } else {
                console.error("error")
            }
        })
    }
    handleSelectChange = activityClassIfySelected => {
        this.setState({
            activityClassIfySelected
        })
    }
    handleUploadChange = (info) => {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} 上传成功.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 上传失败.`);
        }
    }
    toPhotoList = () => {
        const { albumId } = this.state
        this.props.history.push('/photoList?id='+albumId)
    }
    render() {
        const { albumId, photoList, activityName, activityClassIfySelected, classIfy } = this.state
        const Dragger = Upload.Dragger;
        const Option = Select.Option;
        console.log(this.state)
        return <div className="edit-album">
            <div className="edit-album-section">
                <p>相册编辑</p>
            </div>
            <div className="edit-album-section">
                <div className="edit-album-section-title">
                    活动分类 <Icon type="export" theme="outlined" onClick={this.toPhotoList} />
                </div>
                <div className="edit-album-section-select">
                    {classIfy.length !== 0 && <Select style={{ width: '100%', marginBottom: '10px' }} value={activityClassIfySelected} onChange={this.handleSelectChange}>
                        {classIfy.map((el, index) => {

                            return <Option key={el.id} value={el.id}>{el.title}<span style={{ float: 'right', marginRight: '10px' }}></span></Option>
                        })}
                    </Select>}
                </div>
                <div className="edit-album-section-upload">
                    <Dragger
                        name="avatar"
                        multiple={true}
                        data={{ classIfyId: activityClassIfySelected }}
                        action='/album/batchUploadFile'
                        onChange={this.handleUploadChange}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">单击或者拖拽文件上传</p>
                        <p className="ant-upload-hint">支持单文件，多选，目录上传</p>
                    </Dragger>
                </div>
            </div>
            <div className="edit-album-section">
                <div className="edit-album-section-title">
                    此分类照片
                </div>
                <div className="edit-album-section-pic-list">

                </div>
            </div>
        </div>
    }
}
export default EditAlbum