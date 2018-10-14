import React from 'react'
import {Button,Input} from 'antd';
import './index.scss'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect,withRouter} from 'react-router-dom'
import { message} from 'antd';
@withRouter
@connect(
    state=>state.user,{login}
)
class Login extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            password:'',
        }
    }
    login=()=>{
        const {username,password}=this.state
        this.props.login({username,password})
    }
    register=()=>{
        this.props.history.push('/register')
    }
    handleUserNameChange=(e)=>{
        let username=e.target.value
        this.setState({
            username
        }) 
    }
    handlePassWordChange=(e)=>{
        let password=e.target.value
        this.setState({
            password
        }) 
    }
    onClose=()=>{    
        return false
    }
    
    render(){
        console.log(this.props.redirectTo)
        const {username,password}=this.state
        return(
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
                <div className="login-module">
                    <div className="login-module-section">
                        <div className="login-module-section-title">
                            用户名：
                        </div>
                        <div className="login-module-section-input">
                            <Input placeholder="用户名" value={username} onChange={this.handleUserNameChange}/>
                        </div>
                    </div>
                    <div className="login-module-section">
                        <div className="login-module-section-title">
                            密码：
                        </div>
                        <div className="login-module-section-input">
                        <Input placeholder="密码"  value={password} onChange={this.handlePassWordChange}/>
                        </div>
                    </div>
                    <div className="login-module-section">
                    <Button onClick={this.login} type="primary">登录</Button>
                    <Button onClick={this.register} type="primary">注册</Button>
                    </div>
                    {this.props.errorMsg!==""&&message.warn(this.props.errorMsg)}
                </div>
            </div>
        )
    }
}
export default Login 