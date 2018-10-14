import React from 'react'
import ReactDOM from 'react-dom'
import AutoResponsive from 'autoresponsive-react'
import axios from 'axios';
import './index.scss'
import Zmage from 'react-zmage'
import {BackTop,Icon,Modal} from 'antd'
import QRCode from 'qrcode.react'
class PhotoWaterFall extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            containerWidth: '',
            showModal:false
        }
    }
    componentWillMount() {
        window.addEventListener('resize', () => {
            this.setState({
                containerWidth: ReactDOM.findDOMNode(this.refs.container).clientWidth
            });
        }, false);
        this.getData();
    }
    getData = () => {
        axios.get('/photolist').then(res => {
            this.setState({
                data: res.data.data
            }, error => {

            })
        })
    }
    getAutoResponsiveProps=()=>{
        return {
            itemMargin: 1,
            containerWidth: this.state.containerWidth || document.body.clientWidth,
            itemClassName: 'item',
            gridWidth:5,
            verticalDirection:'top',
            transitionDuration: '.5'
        };
    }
    getPicWidth=()=>{
        const containerWidth=(this.state.containerWidth || document.body.clientWidth)
        let margin=5
        if(containerWidth>2000){
            return containerWidth/6 - margin
        }else if(containerWidth>1500){
            return containerWidth/5 - margin
        }else if(containerWidth>1000){
            return containerWidth/4 - margin
        }else{
            return containerWidth/3 - margin
        }
    }
    showShareModal=(toatl)=>{
        this.props.setTotalView(toatl)
        this.setState({
            showModal:true
        })
    }
    hideShareModal=()=>{
        this.setState({
            showModal:false
        })
    }
    view=_id=>{
        axios.post('/album/addview',{_id}).then(res => {})
    }
    render() {
        let picWidth  = this.getPicWidth()
        let total=0
        return (
            <div className="photo-water-fall">
                    <Modal
                        visible={this.state.showModal}
                        centered
                        maskClosable
                        footer={null}
                        width={176}
                        closable={false}
                        onCancel={this.hideShareModal}
                    >
                    <QRCode value={window.location.href}/>
                    </Modal>
                <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
                    {
                        this.props.photoList.map((el, index) => {
                            let style = {
                                width: picWidth,
                                height: (picWidth*el.height)/el.width,
                            };
                            total+=el.viewNumber
                            return (
                                    <div key={index}  className='album-item' style={style}>
                                        <Zmage alt=""  backdrop="gray" style={{'width':picWidth,height:'100%'}} src={"https://"+el.src} onMouseEnter={this.view.bind(this,el._id)}/>
                                        {el.viewNumber!==0&&<div className="view-time">
                                            <Icon type="eye" style={{fontSize:'20px;'}}theme="outlined" />
                                            {el.viewNumber}
                                        </div>}
                                    </div>
                            );
                        })
                    }
                </AutoResponsive>
                <BackTop/>
                <BackTop id="share" visibilityHeight={-1} onClick={this.showShareModal.bind(this,total)}>
                    <div className="share-button">
                    <Icon type="share-alt" theme="outlined" />
                    </div>
                </BackTop>
            </div>
        )
    }
}
export default PhotoWaterFall