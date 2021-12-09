import React, { Component } from 'react'
import PropTypes from 'prop-types';
import "./index.scss";
import Input from "../../components/input"
export default class Register extends Component {
  static propTypes = {

  }

  render () {
    return (
      <div className="register">
        {/* 注册容器 */}
        <div className="container">
          <h3 className="title">欢迎注册</h3>
          <div className="phone-box">
            <label htmlFor="">手机号</label>
            <Input></Input>
           </div>
           <div className="password-box">
            <label htmlFor="">密码</label>
            <Input></Input>
           </div>
           <div className="submit">注册</div>
        </div>
      </div>
    )
  }
}
