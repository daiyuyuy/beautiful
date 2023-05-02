import { Toast } from "antd-mobile";
import axios, { AxiosError } from "axios";
import { getToken, setToken } from "./token";
import store from "src/store";
import { LoginAction } from "src/types/store";
import { Token } from "src/types/data";
import history from "src/router";

const baseURL = "http://geek.itheima.net/v1_0";
const http = axios.create({
  // baseURL:baseUrl,
  baseURL,
  timeout: 5000,
});

//请求响应拦截器
http.interceptors.request.use(
  (config) => {
    const token = getToken();

    //统一设置请求头
    if (token && token.token) {
      config.headers!.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  (response) => {
    return response;
  },
  //统一错误处理
  //可以用ResponceResult代替{ message: string }，
  //因为在data总定义了ResponceResult中的message：string
  //(error: AxiosError<ResponceResult>) => {
  async (error: AxiosError<{ message: string }>) => {
    if (!error.response) {
      Toast.show({
        content: "服务器错误",
      });
      return Promise.reject(error);
    } else if (error.response.status === 401) {
      const token = getToken();

      if (token.token && token.refresh_token) {
        try {
          //第一个参数请求头，第二个参数发送的数据，第三个参数对请求体的一些设置
          const result = await axios.put(`${baseURL}/authorizations`, null, {
            headers: {
              Authorization: `Bearer ${token.refresh_token}`,
            },
          });

          console.log(result);

          const newToken = result.data.data.token;
          const newTokenObj: Token = {
            token: newToken,
            refresh_token: token.refresh_token,
          };

          //将新换取的token更新到store中
          store.dispatch({
            type: "login/set_token",
            payload: newTokenObj,
          } as LoginAction);

          //更新到本地存储
          setToken(newTokenObj);

          //重新进行之前发起的请求
          // http({
          //   method:"",
          //   url:"//..."
          // })

          return http(error.response.config);
        } catch (e) {
          //换取token失败，跳转登陆页面
          history.replace("/login");
          setToken({
            token: "",
            refresh_token: "",
          });
        }
      } else {
        //直接跳转到登陆页面

        history.replace("/login");
      }
    }
    Toast.show({
      content: error.response.data.message,
    });
    return Promise.reject(error);
  }
);

export default http;
