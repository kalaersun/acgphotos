import React from 'react'
import {Button,Input} from 'antd';
import './index.scss'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import { message } from 'antd';
@connect(
    state=>state.user,{register}
)
class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            password:'',
            confirmPassword:''
        }
    }
    login=()=>{
        this.props.history.push('/login')
    }
    register=()=>{
        const {username,password,confirmPassword}=this.state
        this.props.register({username,password,confirmPassword})
    }
    handleChange=(key,e)=>{
        let value=e.target.value
        this.setState({
            [key]:value
        }) 
    }
    render(){
        const {username,password,confirmPassword}=this.state
        return(
            <div className="login-module">
            {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <div className="login-module-section">
                    <div className="login-module-section-title">
                        用户名：
                    </div>
                    <div className="login-module-section-input">
                        <Input placeholder="用户名" value={username} onChange={this.handleChange.bind(this,'username')}/>
                    </div>
                </div>
                <div className="login-module-section">
                    <div className="login-module-section-title">
                        密码：
                    </div>
                    <div className="login-module-section-input">
                    <Input placeholder="密码"  value={password} onChange={this.handleChange.bind(this,'password')}/>
                    </div>
                </div>
                <div className="login-module-section">
                    <div className="login-module-section-title">
                        确认密码：
                    </div>
                    <div className="login-module-section-input">
                    <Input placeholder="确认密码"  value={confirmPassword} onChange={this.handleChange.bind(this,'confirmPassword')}/>
                    </div>
                </div>
                <div className="login-module-section">
                <Button onClick={this.login}>登录</Button>
                <Button onClick={this.register}>注册</Button>
                </div>
                {this.props.errorMsg!==""&&message.warn(this.props.errorMsg)}
            </div>
        )
    }
}
export default Register