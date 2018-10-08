import {combineReducers} from 'redux'
import {counter} from './index.redux'
import {auth} from  './auth.redux'
import {user} from './user.redux'
export default combineReducers({user}) 
