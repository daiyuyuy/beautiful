import React from "react";

import "./App.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";

function App() {
  return (
    <div className="app">
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
        <Route path={"/home"} exact component={Layout}></Route>
        <Route path={"/login"} exact component={Login}></Route>
      </Switch>
    </div>
  );
}

export default App;
