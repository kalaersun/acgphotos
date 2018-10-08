import axios from "axios"
import {getRedirectPath} from '../util'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const initState={
    isAuth:'',
    errorMsg:'',
    user:'',
    pwd:'',
    type:'',
    userId:''
}
export function user(state=initState, action) {
    switch(action.type){
        case REGISTER_SUCCESS:
            return {...state,errorMsg:'',redirectTo:this.getRedirectPath(action.data),isAuth:true,...action.data}
        case ERROR_MSG:
            return {...state,errorMsg:action.errorMsg,isAuth:false,}
        default:
            return state
    }
}
function registerSuccess(data){
    return {type:REGISTER_SUCCESS,data:data}
}
function errorMsg(msg) {
    return {type: ERROR_MSG,errorMsg:msg}
}
export function register({ username, password, confirmPassword }) {
    console.log(username, password, confirmPassword)
    if (!username||!password) {
        return errorMsg('用户名密码必须输入')
    }
    if (password !== confirmPassword) {
        return errorMsg('两次密码输入不一致')
    }
    return dispatch => {
        axios.post('/user/register', { username, password})
        .then(res => {
            if (res.data.status == 200 && res.data.code === 0) {
                dispatch(registerSuccess({ username, password }))
            } else {
                console.log(res)
                dispatch(errorMsg(res.data.errorMsg))
            }
        })
    }

}