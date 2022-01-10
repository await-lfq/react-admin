import React, { Component } from 'react'
import "./index.scss";
import propTypes from "prop-types";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "", // 表单值
      msg: "", // 提示信息
    }
  }

  static defaultProps = {
    placeholder: "请输入内容", //占位符
    messageList: [], // 信息列表
    errorColor: 'red', // 信息错误的显示样式
    trigger: 'onBlur', // 触发验证信息的事件
    maxLength: Infinity, // 输入的最大字符
    icon: "", // 图标
    input: "type" // 输入框类型
  };
  static propTypes = {
    placeholder: propTypes.string, // 占位符
    messageList: propTypes.array, // 信息列表
    errorColor: propTypes.string, // 信息错误的显示样式
    trigger: propTypes.string, // 触发验证信息的事件
    maxLength: propTypes.number, // 输入的最大字符
    icon: propTypes.string, // 图标
    input: propTypes.string, // 输入框类型
  };

  render () {
    const { icon, errorColor, trigger, input, placeholder, maxLength } = this.props;
    const validateEvent = { [trigger]: this.validate };
    const { value, msg } = this.state;
    return (
      <div className="input-component">
        <input
          {...validateEvent}
          maxLength={maxLength}
          placeholder={placeholder}
          type={input}
          onChange={(e) => this.change(e)}
          value={value}
          autoComplete="off"
          className="input"
        />
        <p style={{ color: errorColor, position: 'absolute', top: '55px' }}>{msg}</p>
        <img className="icon" src={icon} alt="" />
      </div>
    )
  }

  // 表单change事件
  change = (e) => {
    this.setState({ value: e.target.value.trim() });
  };

  // 验证方法
  validate = (e) => {
    const value = this.state;
    const { messageList } = this.props;
    let isError = false;
    for (let i = 0, len = messageList.length; i < len; i++) {
      const { required, regExp, message } = messageList[i];
      if ((required && !value) || (regExp && !regExp.test(value))) {
        isError = true;
      }
      if (isError) { // 有错误信息
        this.showErrorMessage(isError, message);
      } else { // 没有错误信息
        this.showErrorMessage(isError, message);
      }
    }
  }

  // 显示错误信息
  showErrorMessage (isError, message) {
    if (isError) {
      this.setState({
        msg: message
      })
    } else {
      this.setState({
        msg: ""
      });
    }
  }
}
