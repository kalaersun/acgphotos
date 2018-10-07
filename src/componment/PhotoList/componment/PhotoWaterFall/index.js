import React from 'react'
import AutoResponsive from 'autoresponsive-react'
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
        Axios.get('/photolist', d => {
          let data = JSON.parse(d).data;
          this.setState({
            data: data
          });
        });
      }
    render(){
        return(
            <div className="photo-water-fall">
                <AutoResponsive>
                {
                this.state.data.map((i, index) => {
                let style = {
                    width: i.w === 'w1' ? 190 : 390,
                    height: i.w === 'w1' ? 240 : 490
                };
                return (
                    <a key={index} href="#" className={`${i.w} album item`} style={style}>
                    <img className="a-cont j_ACont" src="images/a.jpg"/>
                    <img className="a-cover" src={i.src}/>
                    <p className="a-mask">{index}<i></i></p>
                    <p className="a-layer">
                        <span className="al-brand">{i.brand}</span>
                        <span className="al-title">{i.title}</span>
                        <span className="al-count">{i.count}件商品</span>
                    </p>
                    <p className="a-more j_ALMore"></p>
                    </a>
                );
                })
            }
                </AutoResponsive>
            </div>
        )
    }
}
export default PhotoWaterFall