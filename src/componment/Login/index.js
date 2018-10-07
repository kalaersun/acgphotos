import React from 'react'
import {Button,Input} from 'antd';
import './index.scss'
export default class Login extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            password:'',
            confirmPassword:''
        }
    }
    register=()=>{
        this.props.history.push('/register')
    }
    render(){
        const {username,password,confirmPassword}=this.state
        return(
            <div className="login-module">
                <div className="login-module-section">
                    <div className="login-module-section-title">
                        用户名：
                    </div>
                    <div className="login-module-section-input">
                        <Input placeholder="用户名" value={username}/>
                    </div>
                </div>
                <div className="login-module-section">
                    <div className="login-module-section-title">
                        密码：
                    </div>
                    <div className="login-module-section-input">
                    <Input placeholder="密码"  value={password}/>
                    </div>
                </div>
                <div className="login-module-section">
                    <div className="login-module-section-title">
                        确认密码：
                    </div>
                    <div className="login-module-section-input">
                    <Input placeholder="确认密码"  value={confirmPassword}/>
                    </div>
                </div>
                <div className="login-module-section">
                <Button>登录</Button>
                <Button onClick={this.register}>注册</Button>
                </div>
            </div>
        )
    }
}