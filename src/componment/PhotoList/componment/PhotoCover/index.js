import React from 'react'
import { Menu, Dropdown, Icon, Tooltip } from 'antd';
import './index.scss'
class PhotoCover extends React.Component {
    constructor() {
        super()
        this.state = {
            clock: 5
        }
        this.timer = null
    }
    componentDidMount() {
        clearTimeout(this.timer);
        this.startCountDown()
    }
    startCountDown = () => {
        let time = this.state.clock
        //console.log(time)
        if (time < 0) {
            this.props.showPhotos()
        } else {
            this.timer = setTimeout(() => {
                this.setState({
                    clock: time - 1
                })
                this.startCountDown()
            }, 1000)
        }
    }
    
    render() {
        const coverImg="https://" + this.props.bannerPic
        return (
            <div className="photo-list-cover" alt={this.props.activityName} style={{backgroundImage:`url(${coverImg})`}}>
                <div className="timer">{this.state.clock}s</div>
                {/* <img className="cover" src={"https://"+this.props.bannerPic} /> */}
                <div className="enter" onClick={this.props.showPhotos}>进入相册</div>
            </div>
        )
    }
}
export default PhotoCover