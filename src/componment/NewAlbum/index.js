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
            coverImgUrl:'',
            bannerImg:'',
            bannerImgUrl:''
        }
    }
    handleInputChange = (key, e) => {
        this.setState({
            [key]: e.target.value
        })
    }
    handleUploadChange = (key,info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            let coverImgUrl=info.file.response.avatarName
            this.setState({
                coverImgUrl
            })
            getBase64(info.file.originFileObj, img => this.setState({
                [key]:img,
                loading: false,
            }));
        }
    }
    render() {
        console.log(this.state)
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
                    <Input value={activityName} onChange={this.handleInputChange.bind(this, 'activityName')} />
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
                    onChange={this.handleUploadChange.bind(this,'coverImg')}
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
                    <Input value={activityName} onChange={value => { this.handleInputChange.bind(this, 'activityName', value) }} />
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