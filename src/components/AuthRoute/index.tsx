import { ComponentType } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { hasToken } from "src/utils/token";

//props里面所有属性都拿到
//component:Component 重命名，组件都是大写
const AuthRoute = ({ component, children, ...rest }: RouteProps) => {
  //要转型才能用
  const Component = component as ComponentType;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (hasToken()) {
          //   return <Component />;

          // if(typeof children==="function"){
          //     return children(props)
          // }else{
          //     return children
          // }
          if (Component) {
            return <Component />;
          }
          //如果children是一个函数的形式
          else if (typeof children === "function") {
            return children(props);
          }
          //如果children是一个JSX形式
          else {
            return children;
          }
        }

        console.log(props.location.pathname);
        
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                url: props.location.pathname,
              },
            }}
          />
        );
      }}
    ></Route>
  );
};
export default AuthRoute;
