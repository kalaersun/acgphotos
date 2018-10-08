import React from 'react'
import ReactDOM from 'react-dom'
import AutoResponsive from 'autoresponsive-react'
import axios from 'axios';
import './index.scss'

class PhotoWaterFall extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            containerWidth: ''
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
            itemMargin: 0,
            containerWidth: this.state.containerWidth || document.body.clientWidth,
            itemClassName: 'item',
            gridWidth: 200,
            transitionDuration: '.5'
        };
    }
    render() {
        return (
            <div className="photo-water-fall">
                <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
                    {
                        this.state.data.map((i, index) => {
                            let style = {
                                width: i.w === 'w1' ? 190 : 390,
                                height: i.w === 'w1' ? 240 : 490
                            };
                            return (
                                    <a key={index} href="/photolist" className={`${i.w} album item`} style={style}>
                                        <img alt="" className="a-cover" src={i.src} />
                                    </a>
                            );
                        })
                    }
                </AutoResponsive>
            </div>
        )
    }
}
export default PhotoWaterFall