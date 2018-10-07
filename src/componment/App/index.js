import React from 'react'
import { connect } from 'react-redux'
import {Button} from 'antd';
import {addGun} from '../../redux/index.redux'
@connect{
    state=>{
        num:state
    },{addGun}
}
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
/* const mapStatetoProps = (state) => {
    return { num: state }
}
const actionCreators = { addGun }
App = connect(mapStatetoProps, actionCreators)(App) */

export default App