import React, { Component } from 'react'
import PropTypes from 'prop-types';
import "./index.scss";
import Input from "../../components/input"
import user from "../../assets/user.png";
import lock from "../../assets/lock.png";
import { showToastError } from "../../utils/tool";
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
            <Input
              placeholder='请输入手机号码'
              icon={user}
              maxLength={11}
              input="tel"
              messageList={
                [
                  {
                    required: true,
                    message: "请输入电话号码"
                  },
                  {
                    regExp: /^1[3-9]\d{9}$/,
                    message: "请输入正确的电话号码"
                  }
                ]

              }
              ref="phone"
            >
            </Input>
          </div>
          <div className="password-box">
            <label htmlFor="">密码</label>
            <Input
              placeholder='请输入6位数密码'
              icon={lock}
              maxLength={6}
              input="password"
              messageList={
                [
                  {
                    required: true,
                    message: "请输入6位数密码"
                  },
                  {
                    regExp: /^\d{6}$/,
                    message: "请输入正确的6位数密码"
                  }
                ]
              }
              ref="password"
            >
            </Input>
          </div>
          <div className="submit" onClick={this.handlerRegister}>注册</div>
        </div>
      </div>
    )
  }
  handlerRegister = () => {
    // 表达验证结果构成的数组
    const ValidateResList = [this.refs.password.getValidateRes(), this.refs.phone.getValidateRes()];
    // 验证结果
    const flag = ValidateResList.every(item => item === true);
    // 验证失败
    if (!flag) {
      showToastError("请检查表单信息");
      return
    };
    // 验证成功
    console.log("验证成功");

  }
}
