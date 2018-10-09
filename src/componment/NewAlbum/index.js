import React from 'react'
import './index.scss'
import { Input, Upload, Icon, message, Button } from 'antd'
import { getBase64, beforeUpload } from '../../util'
export default class NewAlbum extends React.Component {
    constructor() {
        super()
        this.state = {
            activityName: "",
            classIfy: [],
            className: '',
            author: '',
            loading: false,
            coverImg: '',
            bannerImg:''
        }
    }
    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }
    handleFileChange = (key,info) => {
        console.log(11)
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        console.log(key)
        if (info.file.status === 'done') {
            console.log(info)
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                [key]:imageUrl,
                loading: false,
            }));
        }
    }
    render() {
        const { activityName, classIfy, className, author, imageUrl,coverImg } = this.state
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (<div className="new-album">
            <div className="new-album-section">
                <h1>新建相册</h1>
                <h4>（新建相册必须上传封面以及横幅）</h4>
            </div>
            <div className="new-album-section">
                <div className="new-album-section-title">
                    活动名称
                </div>
                <div className="new-album-name-input">
                    <Input value={activityName} onChange={value => { 
                        console.log(value);this.handleChange.bind(this, 'activityName', value) }} />
                </div>
            </div>

            <div className="new-album-section">
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={true}
                    action="/album/tmpUploadFile"
                    beforeUpload={beforeUpload}
                    onChange={value=>{console.log(value)}}
                >
                {coverImg ? <img src={coverImg} alt="avatar" /> : uploadButton}
                </Upload>
            </div>
            <div className="new-album-banner-upload">

            </div>
            <div className="new-album-section">
                <div className="new-album-section-title">
                    照片分类
                </div>
                <div className="new-album-name-input">
                    <Input value={activityName} onChange={value => { this.handleChange.bind(this, 'activityName', value) }} />
                    <Button type="primary">确认增加</Button>
                </div>

            </div>
            <div className="new-album-section">
                <div className="new-album-section-title">
                    摄影师
                </div>
                <div className="new-album-name-input">
                    <Input value={author} onChange={value => { this.handleChange.bind(this, 'author', value) }} />
                </div>
            </div>
            <Button type="primary">新建相册</Button>
        </div>)
    }
}