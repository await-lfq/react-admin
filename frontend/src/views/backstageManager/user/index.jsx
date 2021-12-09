import React, { Component } from 'react'
import { Breadcrumb, Table, Spin, Button } from 'antd';
import "./user.scss";
import store from "../../../store";
import action from "./createAction";
import AddUserModal from "../../../components/backstageManager/user/addUserModal";
export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 用户数据
      userListData: [],
      // 表格列
      columns: [
        {
          title: '编号',
          dataIndex: 'number',

          align: "center"
        },
        {
          title: '姓名',
          dataIndex: 'name',

          align: "center"
        },
        {
          title: '电话',
          dataIndex: 'phone',

          align: "center"
        },
      ],
      // 总数据
      total: 0,
      // 是否显示添加用户信息弹出层
      isAddUserModal: false,
    }
    // 监听数据的变化
    this.watchDataChange()
  }
  render () {
    const { userListData, columns, total, isAddUserModal } = this.state;
    return (
      <div className="user">
        {/* 面包屑 */}
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>后台管理</Breadcrumb.Item>
          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
        </Breadcrumb>
        {/* 边框 */}
        <div className="border"></div>
        {/* 按钮 */}
        <div style={{ 'marginBottom': "20px" }}>
          <Button onClick={() => { this.setState({ isAddUserModal: true }) }} style={{ 'marginRight': "10px" }} type="primary">添加</Button>
          <Button style={{ 'marginRight': "10px" }} type="danger">删除</Button>
          <Button type="primary">修改</Button>
        </div>
        {/* 表格内容 */}
        <div className="table-container">
          <Spin className="loading-icon" spinning={userListData.length > 0 ? false : true} />
          <Table
            bordered
            rowClassName="row-class"
            columns={columns}
            dataSource={userListData}
            pagination={
              {
                total,
                pageSize: 5,
                onChange: this.changePage
              }
            }
          />
        </div>
        {/* 添加用户信息 */}
        <AddUserModal close={this.close} isAddUserModal={isAddUserModal}></AddUserModal>
      </div>
    )
  }
  /**
   * @description 控制Modal组件的显示与隐藏
   * @method close
   */
  close = () => {
    this.setState({ isAddUserModal: false })
  }
  componentDidMount () {
    // 获取列表数据
    store.dispatch(action.getUserListData())
  }
  componentWillUnmount () {

    this.setState = function (state, callback) { return };
  }
  /**
   * @description 监听store仓库数据的变化
   * @method watchDataChange
   */
  watchDataChange () {
    store.subscribe(() => {
      this.setState({
        // 刷新列表数据
        userListData: store.getState().user.userListData.userInfoList,
        // 刷新总页数
        total: store.getState().user.userListData.total
      })
    })
  }
  /**
   * @description 改变页码数
   * @method changePage
   * @param {number} 页码数
   */
  changePage = (page) => {
    store.dispatch(action.getUserListData(page))
  }
}
