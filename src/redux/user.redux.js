import axios from "axios"
import { getRedirectPath } from '../util'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const initState = {
    isAuth: false,
    errorMsg: '',
    username: '',
    type: '',
    userId: '',
    redirectTo: '',
    _id:''
}
export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return { ...state, redirectTo: getRedirectPath(action.data), isAuth: true,...action.data}
        case ERROR_MSG:
            return { ...action, isAuth: false, }
        case LOGIN_SUCCESS:
            return { ...state, redirectTo: getRedirectPath(action.data), isAuth: true }
        case LOAD_DATA: {
            return { ...state, ...action.data }
        }
        default:
            return state
    }
}
function registerSuccess(data) {
    return { type: REGISTER_SUCCESS, data }
}
function loginSuccess(data) {
    return { type: LOGIN_SUCCESS, data }
}

function errorMsg(errorMsg) {
    return { type: ERROR_MSG, errorMsg }
}
export function register({ username, password, confirmPassword }) {
    if (!username || !password) {
        return errorMsg('用户名密码必须输入')
    }
    if (password !== confirmPassword) {
        return errorMsg('两次密码输入不一致')
    }
    return dispatch => {
        axios.post('/user/register', { username, password })
            .then(res => {
                if (res.request.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.errorMsg))
                }
            })
    }
}
export function login({ username, password }) {
    if (!username || !password) {
        return errorMsg('用户名密码必须输入')
    }
    return dispatch => {
        axios.post('/user/login', { username, password })
            .then(res => {
                if (res.request.status === 200 && res.data.code === 0) {
                    dispatch(loginSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.errorMsg))
                }
            })
    }
}
//userinfo传入
export function lodaData(data) {
    return dispatch=>{
        return dispatch({ type: LOAD_DATA, data })
    }
}