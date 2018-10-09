import React from 'react'
import { Menu, Dropdown, Icon } from 'antd';
import './index.scss'
class PhotoListTop extends React.Component {
    render() {
        const menu = (
            <Menu className="photo-list-top-operate-li-menu">
              <Menu.Item className="photo-list-top-operate-li-item">
              <div className="photo-list-top-operate-li-link">  
                                分类
                                <div className="link-icon"><Icon type="bars" theme="outlined"/></div>
                            </div>
              </Menu.Item>
              <Menu.Item className="photo-list-top-operate-li-item">
              <div className="photo-list-top-operate-li-link">  
                                分类
                                <div className="link-icon"><Icon type="bars" theme="outlined"/></div>
                            </div>
              </Menu.Item>
              <Menu.Item className="photo-list-top-operate-li-item">
              <div className="photo-list-top-operate-li-link">  
                                分类
                    <div className="link-icon"><Icon type="bars" theme="outlined"/></div>
                </div>
              </Menu.Item>
            </Menu>
          );
        return (
            <div className="photo-list-top">
                <div className="photo-list-top-pic"/>
                <div className="photo-list-top-title">
                    <div className="photo-list-top-name">{'全新LEXUS雷克萨斯LS350深圳区域探享试驾品鉴会 云摄影现场直播'}</div>
                    <div className="photo-list-top-pic-total"><Icon type="picture" />{112}</div>
                    <div className="photo-list-top-view-total"><Icon type="eye" />{112}</div>
                </div>
                <div className="photo-list-top-operate">
                    <div className="photo-list-top-operate-li">
                        <Dropdown overlay={menu} placement='bottomCenter'>
                            <div className="photo-list-top-operate-li-link">  
                                分类
                                <div className="link-icon"><Icon type="bars" theme="outlined"/></div>
                            </div>
                        </Dropdown>
                    </div>
                    <div className="photo-list-top-operate-li">
                        <Dropdown overlay={menu} placement='bottomCenter'>
                            <div className="photo-list-top-operate-li-link">  
                                分类
                                <div className="link-icon"><Icon type="bars" theme="outlined"/></div>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>
        )
    }
}
export default PhotoListTop