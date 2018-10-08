import React from 'react'
import {Button,Input} from 'antd';
import './index.scss'
export default class Login extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            password:'',
        }
    }
    register=()=>{
        this.props.history.push('/register')
    }
    handleChange=(key,e)=>{
        let value=e.target.value
        this.setState({
            [key]:value
        }) 
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
                <Button>登录</Button>
                <Button onClick={this.register}>注册</Button>
                </div>
            </div>
        )
    }
}