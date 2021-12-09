import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  PieChartOutlined,
  UserAddOutlined,
  CrownOutlined,
  BugOutlined,
  BarsOutlined,
  DollarOutlined,
  GoogleOutlined
} from '@ant-design/icons';
export default class index extends Component {
  // props的默认值
  static defaultProps = {

  }
  // props的类型
  static propTypes = {
    history: propTypes.object.isRequired, // history对象
    location: propTypes.object.isRequired, // location对象 

  }
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    let { SubMenu } = Menu;
    let {pathname}=this.props.location;
    return (
      <>
        <Menu  mode="inline" onClick={this.changePath} defaultSelectedKeys={[pathname=='/home' ? '/home/index' :pathname]}  >
          <Menu.Item key="/home/index" icon={<GoogleOutlined />}>
            首页
          </Menu.Item>
          <SubMenu key="manager" icon={<PieChartOutlined />} title="后台管理">
            <Menu.Item icon={<UserAddOutlined />} key="/home/user">用户信息</Menu.Item>
            <Menu.Item icon={<CrownOutlined />} key="/home/role">角色管理</Menu.Item>
            <Menu.Item icon={<BugOutlined />} key="/home/permission">权限管理</Menu.Item>
          </SubMenu>
          <SubMenu key="store" icon={<AppstoreOutlined />} title="商铺管理">
            <Menu.Item icon={<BarsOutlined />} key="/home/goods">商品管理</Menu.Item>
            <Menu.Item icon={<DollarOutlined></DollarOutlined>} key="/home/order">订单管理</Menu.Item>
          </SubMenu>
        </Menu>
      </>
    )
  }
  /**
   * @description 改变路由路径，进行路由跳转。
   * @method changePath
   */
  changePath = (obj) => {
    this.props.history.push(obj.key);
  }
  
}
