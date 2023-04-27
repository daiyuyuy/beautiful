import { Toast } from "antd-mobile";
import axios, { AxiosError } from "axios";

const http = axios.create({
  baseURL: "http://geek.itheima.net/v1_0/",
  timeout: 5000,
});

//请求响应拦截器
http.interceptors.request.use(
  (config) => {
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
  (error: AxiosError<{ message: string }>) => {
    if (!error.response) {
      Toast.show({
        content: "服务器错误",
      });
      return Promise.reject(error);
    }
    Toast.show(error.response.data.message);
    return Promise.reject(error);
  }
);

export default http;
