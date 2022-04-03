import React, { Component, Suspense } from "react";
import './App.scss';
import { Switch, Route, Redirect } from "react-router-dom";
import { parentRouter, homeRouter, notFoundRouter } from "./routers/index";
console.log(parentRouter, homeRouter, notFoundRouter);
class App extends Component {
  render () {
    return (
      <div className="app">
        <Suspense fallback={<div>加载中...</div>}>
          <Switch>
            {
              parentRouter.map(item => <Route key={item.path} path={item.path} component={item.component} exact={item.exact} />)
            }
            {
              homeRouter.map(item => <Route path={item.path} key={item.path} render={(props) => <item.component {...props} />} />)
            }
            <Redirect from="/" to="/register" exact />
            {
              notFoundRouter.map(item => <Route component={item.NotFound} key={item.path} />)
            }
          </Switch>
        </Suspense>
      </div>
    )
  }
}
export default App;
