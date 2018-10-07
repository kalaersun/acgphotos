import React from 'react'
import {Button,Input} from 'antd';
import './index.scss'
export default class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            password:''
        }
    }
    render(){
        const {username,password}=this.state
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
                <Button>登录</Button>
                <Button>注册</Button>
                </div>
            </div>
        )
    }
}