import React from 'react'
import { Menu, Dropdown, Icon, Tooltip } from 'antd';
import './index.scss'
class PhotoListTop extends React.Component {
    render() {
        let classIfy = (
            <Menu className="photo-list-top-operate-li-menu">
                <Menu.Item className="photo-list-top-operate-li-item">
                    <div className="photo-list-top-operate-li-link" onClick={this.props.handleClassifyChange.bind(this, 'all')}>
                        全部
                    </div>
                </Menu.Item>
                {this.props.classIfy.map((el, index) => {
                    return (
                        <Menu.Item className="photo-list-top-operate-li-item">
                            <div className="photo-list-top-operate-li-link" onClick={this.props.handleClassifyChange.bind(this, el.id)}>
                                {el.title}
                            </div>
                        </Menu.Item>
                    )
                })
                }
            </Menu>
        );
        let order = (
            <Menu className="photo-list-top-operate-li-menu">
                <Menu.Item className="photo-list-top-operate-li-item">
                    <div className="photo-list-top-operate-li-link" onClick={this.props.handleSortChange.bind(this, 'viewNumber')}>
                        浏览次数
              </div>
                </Menu.Item>
                <Menu.Item className="photo-list-top-operate-li-item">
                    <div className="photo-list-top-operate-li-link" onClick={this.props.handleSortChange.bind(this, 'date')}>
                        时间
              </div>
                </Menu.Item>
            </Menu>
        );
        const desc = <span>{this.props.desc}</span>;
        return (
            <div className="photo-list-top">
                <div className="photo-list-top-pic">
                    <img alt={this.props.activityName} src={"https://" + this.props.bannerPic} />
                </div>
                <div className="photo-list-top-title">
                    <div className="photo-list-top-name">{this.props.activityName}</div>
                    <div className="photo-list-top-pic-total"><Icon type="picture" />{this.props.photoList.length}</div>
                    <div className="photo-list-top-view-total"><Icon type="eye" />{this.props.total}</div>
                    <div className="photo-list-top-view-desc">
                        <Tooltip placement="left" style={{color:'white'}}title={desc}>
                            活动详情<Icon type="picture" />
                        </Tooltip>
                    </div>
                </div>
                <div className="photo-list-top-operate">
                    <div className="photo-list-top-operate-li">
                        <Dropdown overlay={classIfy} placement='bottomCenter'>
                            <div className="photo-list-top-operate-li-link">
                                分类
                                <div className="link-icon"><Icon style={{fontSize:'18px'}} type="bars" theme="outlined" /></div>
                            </div>
                        </Dropdown>
                    </div>
                    <div className="photo-list-top-operate-li">
                        <Dropdown overlay={order} placement='bottomCenter'>
                            <div className="photo-list-top-operate-li-link">
                                排序
                                <div className="link-icon"><Icon style={{fontSize:'18px'}} type="sort-descending" theme="outlined" /></div>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>
        )
    }
}
export default PhotoListTop