import React, { Component } from 'react'
import PropTypes from 'prop-types'
import "./index.scss";
import {
  Form,
  Input,
  Icon,
} from 'antd';
export default class UserInfo extends Component {
  static propTypes = {

  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form labelCol={{span: 3}} wrapperCol={{span:21}}>
        <Form.Item  label="邮箱">
          {getFieldDecorator('email', {
            rules: [
              {
                pattern: /^(\w{1,})@(\w{1,})(\.)com$/,
                message: '请输入正确的邮箱',
              },
              {
                required: true,
                message: '请输入邮箱',
              },
            ],
          })(<Input />)}
        </Form.Item>
      </Form>
    )
  }
}
