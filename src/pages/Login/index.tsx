import {
  Button,
  Form,
  Input,
  InputRef,
  List,
  NavBar,
  Toast,
} from "antd-mobile";
import styles from "./index.module.scss";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginForm } from "src/types/data";
import { loginActionCreator } from "src/store/actions/login";
import { useEffect, useRef, useState } from "react";
import { sendCode } from "src/services/login";
// import { AxiosError } from "axios";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation<{ url: string }>();
  const onFinish = async (values: LoginForm) => {
    console.log(values);

    try {
      await dispatch(loginActionCreator(values));

      Toast.show({
        content: "登陆成功啦哈哈哈",
        duration: 1000,
        afterClose: () => {
          // if (location.state.url) {
          // // 跳回到之前的页面
          //   history.replace(location.state.url);
          // } else {
          //   history.push("/home");
          // }

          history.replace(location.state?.url || "/home");
        },
      });
    } catch (e) {
      console.log("ERROR", e);
      // const error=e as AxiosError;
      // error.message

      // 在axios中统一错误处理
      // Toast.show({
      //     content:"登陆失败啦，呜呜呜呜呜",
      //     icon:"fail"
      // })
    }
  };

  const [form] = Form.useForm();
  const mobileInputRef = useRef<InputRef>(null);

  //倒计时
  const [seconds, setSeconds] = useState<number>(0);
  const timer = useRef<number>(-1);

  const getCode = async () => {
    if (seconds > 0) return;
    // const mobile = mobileInputRef.current?.nativeElement?.value;

    const mobile = form.getFieldValue("mobile");
    console.log(mobile);

    //表单输入框错误信息
    const errors = form.getFieldError("mobile");

    //为空或格式不对，则聚焦输入框
    if (!mobile && errors.length > 0) {
      return mobileInputRef.current?.focus();
    }

    //调用发送验证码接口
    await sendCode(mobile);

    //启动倒计时
    setSeconds(60);

    //setInterval分前后端，前端要写成window.setInterval，
    timer.current = window.setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
  };

  //监听seconds变化，seconds<0 就关闭定时器
  useEffect(() => {
    if (seconds < 0) {
      clearInterval(timer.current);
    }
  }, [seconds]);

  //清除定时器
  useEffect(() => {
    return clearInterval(timer.current);
  }, []);

  return (
    <div className={styles.root}>
      <NavBar
        onBack={() => {
          history.go(-1);
        }}
      ></NavBar>

      <div className="login-form">
        <h2 className="title">短信登录</h2>
        <Form onFinish={onFinish} form={form}>
          <Form.Item
            name="mobile"
            className="login-item"
            rules={[
              { required: true, message: "请输入手机号" },
              { pattern: /^1[3-9]\d{9}$/, message: "手机号格式错误" },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input placeholder="请输入手机号" ref={mobileInputRef}></Input>
            {/* <Input placeholder="请输入手机号"></Input> */}
          </Form.Item>
          <List.Item
            className="login-code-extra"
            extra={
              <span className="code-extra" onClick={getCode}>
                {seconds > 0 ? `${seconds}s获取验证码` : "获取验证码"}
              </span>
            }
          >
            <Form.Item
              className="login-item"
              name="code"
              rules={[
                { required: true, message: "请输入验证码" },
                {
                  pattern: /^\d{6}$/,
                  message: "验证码格式错误",
                },
              ]}
            >
              <Input placeholder="请输入验证码"></Input>
            </Form.Item>
          </List.Item>
          <Form.Item className="login-item">
            <Button
              color="primary"
              className="login-submit"
              type="submit"
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        {/* <svg className="icon" aria-hidden="true">
            <use xlinkHref="#iconbtn_like_sel"></use>
        </svg> */}
      </div>
    </div>
  );
};
export default Login;
