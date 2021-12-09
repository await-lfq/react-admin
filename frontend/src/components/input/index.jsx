import React, { Component } from 'react'
import "./index.scss";
import propTypes from "prop-types";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "", // 表单值
      errorMsg: "", // 提示信息
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
    trigger: propTypes.string, // 错误验证的触发事件
    errorColor: propTypes.string, // 信息错误的显示样式
    messageList: propTypes.array, // 信息列表
    placeholder: propTypes.string, // 占位符
    maxLength: propTypes.number, // 输入的最大字符
    icon: propTypes.string, // 图标
    input: propTypes.string, // 输入框类型
  };

  render () {
    let { icon, errorColor, trigger, input, placeholder, maxLength } = this.props;
    let validateEvent = { [trigger]: this.validate };
    let { value, errorMsg } = this.state;
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
        <p style={{ color: errorColor, position: 'absolute', top: '55px' }}>{errorMsg}</p>
        <img className="icon" src={icon} alt="" />
      </div>
    )
  }
  /**
   * @description 表单change事件
   * @method change
   * @param {Event对象} 事件对象
   */
  change = (e) => {
    this.setState({ value: e.target.value.trim() });
  };
  /**
   * @description 验证方法
   * @method validate
   */
  validate = (e) => {
    let _this = this;
    let value = e.target.value.trim();
    let { messageList } = this.props;
    let isError = false;
    for (let i = 0, len = messageList.length; i < len; i++) {
      let { required, regExp, message } = messageList[i];
      if ((required && !value) || (regExp && !regExp.test(value))) {
        isError = true;
      }
      if (isError) {
        return _this.isShowErrorMessage(isError, message);
      }
      _this.isShowErrorMessage(isError, message);

    }
  }
  /**
   * @description 是否显示错误信息
   * @method isShowErrorMessage
   */
  isShowErrorMessage = (isError, message) => {
    let _this = this;
    if (isError) {
      _this.setState({
        errorMsg: message
      })
    } else {
      _this.setState({
        errorMsg: ""
      });
    }
  }

}
