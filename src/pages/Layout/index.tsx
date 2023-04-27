import { TabBar } from "antd-mobile";
import styles from "./index.module.scss";
import Icon from "src/components/Icon";
import { Route, useHistory, useLocation } from "react-router-dom";
import Question from "../Question";
import Profile from "../Profile/index";
import Video from "../Video";
import Home from "../Home";

const Layout = () => {
  const tabs = [
    { path: "/home", icon: "icon-shouye1",icon_del:"icon-shouye", text: "首页" },
    { path: "/home/question", icon: "icon-duanxin",icon_del:"icon-duihuaxinxi", text: "对话" },
    { path: "/home/video", icon: "icon-zuanshi",icon_del:"icon-yinle", text: "视频" },
    { path: "/home/shopping", icon: "icon-gouwuche", icon_del:"icon-jinbiduihuan",text: "购物车" },
    { path: "/home/profile", icon: "icon-yonghu1",icon_del:"icon-yonghu", text: "我的" },
  ];

  const history = useHistory();
  const location = useLocation();
  const onTabChange = (key: string) => {
    console.log(key);

    history.push(key);
  };
  return (
    <div className={styles.root}>

      <Route path={"/home"} exact component={Home} />
      <Route path={"/home/question"} component={Question} />
      <Route path={"/home/video"} component={Video}/>
      <Route path={"/home/profile"} component={Profile} />
      <TabBar
        className="tab-bar"
        activeKey={location.pathname}
        onChange={onTabChange}
      >
        {tabs.map((tab) => {
          return (
            <TabBar.Item
              key={tab.path}
              title={tab.text}
              icon={(active)=>{
                return(
                <Icon
                  name={active ? tab.icon_del : tab.icon}
                  className="tab-bar-item-icon"
                />
                )
              }}
            />
          );
        })}
      </TabBar>
    </div>
  );
};
export default Layout;

// export default function Layout(){
//     return <div>组件</div>
// }
