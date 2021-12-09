import React, { Component } from 'react';
import { Modal,Form } from 'antd';
import propTypes from 'prop-types'
import UserInfo from '../userInfo';
const AddUserinfoForm = Form.create({ name: 'addUserinfo' })(UserInfo);
export default class AddUserModal extends Component {
  static propTypes = {
    // 控制Modal组件的显示隐藏
    isAddUserModal:propTypes.bool.isRequired,
    // 控制Modal的一个显示隐藏函数
    close:propTypes.func.isRequired,
  }
  render () {
    return (
      <Modal footer={null} onCancel={()=>{this.props.close()}} visible={this.props.isAddUserModal}  title="添加用户信息">
        <AddUserinfoForm></AddUserinfoForm>
      </Modal>
    )
  }
}
