import React, { Component, Suspense } from "react";
import './App.scss';
import { Switch, Route} from "react-router-dom";
import  routerList  from "./routers/index";
class App extends Component {
  render () {
    return (
      <div className="app">
        <Suspense fallback={<div>加载中...</div>}>
          <Switch>
            {
              routerList.filter(item=>!item.children && !item.redirect).map(item => <Route key={item.path} path={item.path} component={item.component} exact={item.exact} />)
            }
            {
              routerList.filter(item=>item.children && !item.redirect).map(item => <Route path={item.path} key={item.path} render={(props) => <item.component sonRouter={item.children} {...props} />} />)
            }
            {
              routerList.filter(item=>item.children && item.redirect).map(item=> <Route path={item.path} key={item.path} render={(props) => <item.component  sonRouter={item.children} {...props} />} />)
            }
          </Switch>
        </Suspense>
      </div>
    )
  }
}
export default App;
