import React from 'react'
import AutoResponsive from 'autoresponsive-react@1.1.31'
import Axios from 'axios';
class PhotoWaterFall extends React.Component{
    constructor(){
        super()
        this.state={
            data:[]
        }
    }
    componentWillMount() {
        this.getData();
      }
      getData=()=>{
        Axios.get('../../data.json', d => {
          let data = JSON.parse(d).data;
          console.log(data)
          this.setState({
            data: data
          });
        });
      }
    render(){
        return(
            <div className="photo-water-fall">
                <AutoResponsive>

                </AutoResponsive>
            </div>
        )
    }
}
export default PhotoWaterFall