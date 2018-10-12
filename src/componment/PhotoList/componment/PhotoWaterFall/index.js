import React from 'react'
import ReactDOM from 'react-dom'
import AutoResponsive from 'autoresponsive-react'
import axios from 'axios';
import './index.scss'
import Zmage from 'react-zmage'
class PhotoWaterFall extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            containerWidth: ''
        }
    }
    componentDidMount() {
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
    render() {
        let picWidth  = this.getPicWidth()
        let picHeight = (picWidth/16)*9
        return (
            <div className="photo-water-fall">
                <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
                    {
                        this.state.data.map((el, index) => {
                                let image = new Image();
                                image.src=el.src
                                let height=picHeight
                   {/*              image.onload= await function(){
                                    height=image.height
                                    console.log(image.height)
                                } */}
                                let style = {
                                        width: picWidth,
                                        height: height,
                                }
                                return (
                                    <div key={index}  className={`${el.w} album item`} style={style}>
                                        <Zmage alt=""  backdrop="gray" style={{'width':picWidth,height:'100%',marginTop:'3px'}} src={el.src} />
                                    </div>
                                    );

                        })
                    }
                </AutoResponsive>
            </div>
        )
    }
}
export default PhotoWaterFall