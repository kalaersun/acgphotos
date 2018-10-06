import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Login from './componment/Login'
class App extends React.Component{
    render(){
        return(
                <Login/>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
serviceWorker.unregister();
