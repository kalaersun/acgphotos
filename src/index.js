import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Login from './componment/Login'
import Register from './componment/register'
import { counter, addGun } from './redux/index.redux'
import { Provider, connect } from 'react-redux'
import { Button } from 'antd-mobile';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import reducers from './redux/reducer'
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))
class App extends React.Component {
    render() {
        return (
            <div className="App">
                {console.log(this.props.addGun)}
                <Button onClick={this.props.addGun}>增加机枪</Button>
            </div>
        )
    }
}
const mapStatetoProps = (state) => {
    return { num: state }
}
const actionCreators = { addGun }
App = connect(mapStatetoProps, actionCreators)(App)


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/Login' exact component={Login}></Route>
                <Route path='/Register' component={Register}></Route>
            </Switch>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

