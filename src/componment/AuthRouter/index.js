import React from 'react'
import Axios from 'axios';
import {withRouter} from 'react-router-dom'
class AuthRoute extends React.Component{
    componentDidMount(){
        const checkLogin=['/login','register']
        const pathName = this.props.location.pathname
        if(checkLogin.indexOf(pathName)>-1){
            return null
        }
        Axios.get('/user/info')
            .then(res=>{
                if(res.status===200){
                   if(res.data.code===0){

                   }else{
                    this.props.history.push('/login')
                   }
                }
            },
            error=>{

            })
    }
    render(){
        return(
            <div>判断跳转逻辑</div>
        )
    }
}
export default withRouter(AuthRoute)