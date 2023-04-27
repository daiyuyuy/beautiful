import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

//路由管理包
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
