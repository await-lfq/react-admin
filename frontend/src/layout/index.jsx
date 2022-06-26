import React, { Component, Fragment, Suspense } from 'react';
import { Layout } from 'antd';
import Top from "../components/top";
import AsideNav from "../components/asideNav";
import { Switch, Redirect, Route } from "react-router-dom";
let { Header, Sider, Content } = Layout;
export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Fragment>
          <Layout style={{ height: '100vh' }}>
            {/* 头部 */}
            <Header style={{ color: '#fff', padding: 0 }}>
              <Top history={this.props.history} />
            </Header>
            <Layout>
              <Sider style={{ backgroundColor: '#fff' }}>
                <AsideNav history={this.props.history} location={this.props.location}></AsideNav>
              </Sider>
              <Content>
                <Suspense fallback={<div>加载中</div>}>
                  <Switch>
                    <Redirect from="/" to="/home" exact={true}></Redirect>
                    {
                      this.props.sonRouter.map(item => <Route  path={item.path} component={item.component} key={item.path} exact={item.exact} />)
                    }
                  </Switch>
                </Suspense>
              </Content>
            </Layout>
          </Layout>
        </Fragment>
      </div>
    )
  }
  componentDidMount(){
    console.log(this.props.sonRouter);
  }
}
