import React from 'react'
import './index.scss'
import { Input, Upload, Icon, message, Button ,Select} from 'antd'
import { getBase64, beforeUpload } from '../../util'
import { connect } from 'react-redux'
@connect(
    state => state.user
)
class NewAlbum extends React.Component {
    constructor() {
        super()
        this.state = {
            activityName: "",
            classIfy: [],
            classIfyName: '',
            classIfyOption:0,
            author: '',
            loading: false,
            coverImg: '',
            coverImgUrl: '',
            bannerImg: '',
            bannerImgUrl: ''
        }
    }
    handleInputChange = (key, e) => {
            this.setState({
                [key]: e.target.value
            })
    }
    addClassify=()=>{
        let {classIfy,classIfyName}=this.state
        let id = classIfy.length+1
        classIfy.push({
            id,
            title:classIfyName
        })
        this.setState({
            classIfy,
            classIfyOption:id
        })
    }
    removeclassIfy=(key)=>{
        let {classIfy}=this.state
        let newClassIfy=classIfy.filter(el=>{
            if(el.id!==key){return true}
        })
        console.log(newClassIfy)
        if(newClassIfy.length!==0)
        {
            this.setState({
                classIfy:newClassIfy,
                classIfyOption:newClassIfy[0].id,
                classIfyName: ''
            })
        }else{
            this.setState({
                classIfy:'',
                classIfyOption:0,
                classIfyName: '',
            })
        }

    }
    handleUploadChange = (key, info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            let imageName=key+'Url'
            let name = info.file.response.avatarName
            this.setState({
                [imageName]:name
            })
            getBase64(info.file.originFileObj, img => this.setState({
                [key]: img,
                loading: false,
            }));
        }
    }
    handleClassifyChange=(classIfyOption)=>{
        this.setState({
            classIfyOption
        })
    }
    submitNewAlbum=()=>{

    }
    render() {
        console.log(this.state)
        const Option = Select.Option;
        const { classIfy, className, author, coverImg ,bannerImg,classIfyName,classIfyOption} = this.state
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (<div className="new-album">
            <div className="new-album-section">
                <p><Icon type="hdd" theme="outlined" />新建相册</p>
                <p>（新建相册必须上传封面以及横幅）</p>
            </div>
            <div className="new-album-section">
                <div className="new-album-section-title">
                    活动名称
                </div>
                <div className="new-album-name-input">
                    <Input value={className} onChange={this.handleInputChange.bind(this, 'className')} />
                </div>
            </div>
            <div className="new-album-section">
                <div className="new-album-section-title">
                    封面照片
                </div>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={true}
                    action="/album/tmpUploadFile"
                    beforeUpload={beforeUpload}
                    onChange={this.handleUploadChange.bind(this, 'bannerImg')}
                >
                    {coverImg ? <img className="banner-img" src={bannerImg} alt="avatar" /> : uploadButton}
                </Upload>
            </div>
            <div className="new-album-section">
                <div className="new-album-section-title">
                    横幅照片
                </div>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={true}
                    action="/album/tmpUploadFile"
                    beforeUpload={beforeUpload}
                    onChange={this.handleUploadChange.bind(this, 'coverImg')}
                >
                    {coverImg ? <img className="cover-img" src={coverImg} alt="avatar" /> : uploadButton}
                </Upload>
            </div>
            <div className="new-album-section">
                <div className="new-album-section-title">
                    照片分类
                </div>
                <div className="new-album-name-input">
                    <Input value={classIfyName} style={{width:'230px'}} onChange={this.handleInputChange.bind(this, 'classIfyName')} />
                    <Button type="primary" onClick={this.addClassify}>新增</Button>
                </div>
                <div className="new-album-section-select" >
                    {classIfy.length!==0&&<Select style={{width:'230px',marginTop:'10px'}} value={classIfyOption}  onChange={this.handleClassifyChange}>
                                    {
                                        classIfy.map((el,index)=>{
                                            return (<Option key={index} value={el.id}>{el.title}<Icon type="close" theme="outlined" onClick={this.removeclassIfy.bind(this,el.id)}/></Option>)
                                        })  
                                    }
                        </Select>}
                </div>
            </div>
            <div className="new-album-section">
                <div className="new-album-section-title">
                    摄影师
                </div>
                <div className="new-album-name-input">
                    <Input value={author} style={{width:'230px'}} onChange={this.handleInputChange.bind(this, 'author')} />
                </div>
            </div>
            <Button className="new-album-button" type="primary">新建相册</Button>
        </div>)
    }
}
export default NewAlbum