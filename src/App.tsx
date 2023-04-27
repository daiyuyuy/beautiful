import React, { Suspense } from "react";

import "./App.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./pages/Layout";
// import Login from "./pages/Login";


//路由懒加载
const Login = React.lazy(() => import("./pages/Login/index"));



function App() {
  return (
    <div className="app">
      <Suspense fallback={<span>正在加载中</span>}>
        <Switch>
          {/* <Redirect path={"/"} exact to={"/home"}></Redirect> */}
          {/* <Route
          path={"/"}
          exact
          render={() => {
            return <Redirect to={"/home"}></Redirect>;
          }}
        ></Route> */}
          <Route path={"/"} exact>
            <Redirect to={"/home"}></Redirect>
          </Route>
          <Route path={"/home"}  component={Layout}></Route>
          <Route path={"/login"} exact component={Login}></Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
