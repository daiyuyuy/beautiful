import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

//路由管理包
// import { HashRouter as Router } from "react-router-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import history  from "./router";

import dayjs from "dayjs";

import relactiveTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

//启用fromNow插件，可以让日期显示成相对日期 （xxx天前）
dayjs.extend(relactiveTime);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
