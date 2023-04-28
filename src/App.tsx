import React, { Suspense } from "react";

import "./App.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./pages/Layout";
import ProfileEdit from "./pages/Profile/Edit";
// import { hasToken } from "./utils/token";
import AuthRoute from "./components/AuthRoute";
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
          <Route path={"/home"} component={Layout}></Route>
          <Route path={"/login"} exact component={Login}></Route>
          {/* 动态渲染render中要渲染页面或内容 */}
          {/* <Route
            path={"/profile/edit"}
            exact
            render={(props) => {
              console.log(props);

              //判断有没有token
              if (hasToken()) {
                return <ProfileEdit />;
              }
              //如果没有，跳转到登录页
             else{
              // props.history.replace('/login')
              return <Redirect to={"/login"}/>
             }
            }}
          ></Route> */}

          {/* <AuthRoute
            path={"profile/edit"}
            exact
            component={ProfileEdit}
          ></AuthRoute> */}

          <AuthRoute path={"/profile/edit"} exact>
          {()=>{
             return <ProfileEdit />
          }}
          </AuthRoute>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
