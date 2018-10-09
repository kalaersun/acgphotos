import React from 'react'
import './index.scss'
import axios from 'axios'
import {connect} from 'react-redux'
import Card from './Card';
import {Icon} from 'antd'
import {withRouter} from 'react-router-dom'
import moment from 'moment'
@withRouter
@connect(
    state=>state.user
)
class CardList extends React.Component {
    constructor() {
        super()
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        axios.get('/photolist').then(res => {
            this.setState({
                data: res.data.data
            }, error => {
            })
        })
    }
    viewAlbum=(key)=>{

    }
    addAlbum=()=>{
        this.props.history.push('/newAlbum')
    }
    render() {
        return(
            <div className="card-list">
                <div className="new-card">
                    <div className="plus-sign" onClick={this.addAlbum}>
                    <Icon type="plus-circle" theme="twoTone" />
                    </div>
                    <div className="puls-desc">
                        <p>您好,{this.props.username}</p>
                        <p>今天是{moment().format("YYYY-MM-DD")}</p>
                    </div>
                </div>
            {
                this.state.data.map((el,index)=>{
                    return <Card {...el} onClick={this.viewAlbum.bind(this,1)}/>
                })
            }
            </div>
        )
    }
}
export default  CardList