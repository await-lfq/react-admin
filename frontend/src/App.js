import React, { Component } from "react";
import './App.scss';
import { Switch, Route, Redirect } from "react-router-dom";
import reactLoadable from "react-loadable";
let Home = reactLoadable({
  loader () { return import("./views/home") },
  loading () { return <div></div> }
})
let Login = reactLoadable({
  loader () { return import("./views/login") },
  loading () { return <div></div> }
})
let NotFound = reactLoadable({
  loader () {
    return import("./views/notFound")
  },
  loading () {
    return <div></div>
  }
})
const Register = reactLoadable({
  loader: () => import("@/views/register"),
  loading: () => <div></div>
})
class App extends Component {
  render () {
    return (
      <div className="app">
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/home" render={(props) => <Home {...props} />} />
          <Redirect from="/" to="/register" exact />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}
export default App;
