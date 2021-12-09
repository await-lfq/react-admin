import React, { Component, Fragment } from 'react';
import { Layout } from 'antd';
import Top from "../../components/top";
import AsideNav from "../../components/asideNav";
import { Switch, Redirect, Route } from "react-router-dom";
import reactLoadable from "react-loadable";
let HomeIndex = reactLoadable({
  loader: () => import("../homeIndex"),
  loading: () => <div></div>
})
let User = reactLoadable({
  loader: () => import("../backstageManager/user"),
  loading: () => <div></div>
})
let Role = reactLoadable({
  loader: () => import("../backstageManager/role"),
  loading: () => <div></div>
})
let Permission = reactLoadable({
  loader: () => import("../backstageManager/permission"),
  loading: () => <div></div>
});
let Goods=reactLoadable({
  loader:()=>import("../storeManager/goods"),
  loading:()=><div></div>
})
let Order=reactLoadable({
  loader:()=>import("../storeManager/order"),
  loading:()=><div></div>
});
let NotFound=reactLoadable({
  loader:()=>import("../notFound"),
  loading:()=><div></div>
})
let { Header, Sider, Content } = Layout;
export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Fragment>
          <Layout style={{ height: '100vh' }}>
            {/* 头部 */}
            <Header style={{ color: '#fff', padding: 0 }}>
              <Top history={this.props.history}  />
            </Header>
            <Layout>
              <Sider style={{ backgroundColor: '#fff' }}>
                <AsideNav history={this.props.history} location={this.props.location}></AsideNav>
              </Sider>
              <Content>
                <Switch>
                  <Route path="/home/index" component={HomeIndex} exact />
                  <Route path="/home/user" component={User} exact />
                  <Route path="/home/role" component={Role} exact />
                  <Route path="/home/permission" component={Permission} exact />
                  <Route path="/home/order" component={Order} exact />
                  <Route path="/home/goods" component={Goods} exact />
                  <Redirect from="/home" to={{pathname:"/home/index"}} exact></Redirect>
                  <Route path="*" component={NotFound}  /> 
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Fragment>
      </div>
    )
  }
}
