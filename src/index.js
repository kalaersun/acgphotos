import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Login from './componment/Login'
import Register from './componment/Register'
import AuthRouter from './componment/AuthRouter'
import PhotoList from './componment/PhotoList'
import CardList from './componment/CardList'
import NewAlbum from './componment/NewAlbum'
import EditAlbum from './componment/EditAlbum'
import { Provider } from 'react-redux'
import {BrowserRouter,Route} from 'react-router-dom'
import reducers from './redux/reducer'
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRouter></AuthRouter>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/photolist' component={PhotoList}></Route>
                <Route path='/cardlist' component={CardList}></Route>
                <Route path='/newalbum' component={NewAlbum}></Route>
                <Route path='/editalbum' component={EditAlbum}></Route>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

