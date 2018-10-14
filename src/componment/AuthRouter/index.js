import React from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import {lodaData} from '../../redux/user.redux'
import {connect} from 'react-redux'
@connect(
    state=>state.user,{lodaData}
)
class AuthRoute extends React.Component {
    componentDidMount() {
        const checkLogin = ['/login', '/register','/photoList']
        const pathName = this.props.location.pathname
        //console.log(pathName)
        if (checkLogin.indexOf(pathName) > -1) {
            return true
        }else{
            axios.get('/user/info')
            .then(res => {
                if (res.request.status === 200) {
                    if (res.data.code == 0) {
                        this.props.lodaData(res.data.data)
                    } else {
                        this.props.history.push('/login')
                    }
                }
            })
        }
    }
    render() {
        return null
    }
}
export default withRouter(AuthRoute)