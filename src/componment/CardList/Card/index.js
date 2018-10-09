import React from 'react'
import './index.scss'
export default class Card extends React.Component {
    render() {
        const {src,title,time} =this.props
        return <div className="card">
            <div className="card-pic">
                <img src={src} alt={title}/>
            </div>
            <div className="card-desc">
                <p className="card-desc-title">{title}</p>
                <p className="card-desc-time">{time}</p>
            </div>
        </div>;
    }
}