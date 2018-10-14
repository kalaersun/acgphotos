import React from 'react'
import './index.scss'
import  moment from 'moment'
import {Icon} from 'antd'
export default class Card extends React.Component {
    render() {
        const {bannerPic,activityName,date} =this.props
        return <div className="card">
            <div className="card-pic">
                <img src={"https://"+bannerPic} alt={activityName}/>
            </div>
            <div className="card-desc">
                <p className="card-desc-title">{activityName}</p>
                <p className="card-desc-time">{moment(new Date(date*1)).format('YYYY-MM-DD, h:mm:ss')}</p>
                <p className="card-decc-edit" onClick={this.props.editAlbum}><Icon type="edit" theme="outlined"/>编辑</p>
                <p className="card-decc-edit" onClick={this.props.viewAlbum}><Icon type="eye" theme="outlined"/>查看</p>
            </div>
        </div>;
    }
}