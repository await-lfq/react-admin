import React, { Component } from 'react'
import "./index.scss";
import { UserAddOutlined, LoginOutlined, SlackOutlined } from '@ant-design/icons';
import { Modal, message } from 'antd';
import {logout,getLoginInfo} from "../../common/author";
import propTypes from "prop-types";
export default class Top extends Component {
  // props的默认值
  static defaultProps = {
    
  }
  // props的类型
  static propTypes = {
    history: propTypes.object.isRequired // history对象
  }
  constructor(props) {
    super(props);
    this.state = {
      // 电话
      phone:getLoginInfo().phone,
    }
  }
  render() {
    let { phone } = this.state;
    return (
      // 头部
      <div className="top">
        <div className="name-box">
          <SlackOutlined />
          <span className="name">安心账后台管理系统</span>
        </div>
        <div className="right-info">
          <div className="user-box">
            <UserAddOutlined />
            <span className="user">
              {phone}
            </span>
          </div>
          <div className="login-out-box">
            <LoginOutlined />
            <span className="login-out" onClick={() => this.logout()}>登出</span>
          </div>
        </div>
      </div>
    )
  }
  /**
   * @description 退出系统
   * @method logout
   */
  logout = () => {
    let that = this;
    Modal.confirm({
      content: "确定要退出吗",
      onOk() {
        logout() // 清掉本地存储
        message.success('退出成功');
        that.props.history.push("/login");
      }
    })

  }

}
