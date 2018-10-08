import React from 'react'
import {Button,Input} from 'antd';
import './index.scss'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import { Alert } from 'antd';
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
    onClose=()=>{    
        return false
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
                {this.props.errorMsg!==""&&<Alert message={this.props.errorMsg} type="error"       closable
                onClose={this.onClose}/>}
            </div>
        )
    }
}
export default Register