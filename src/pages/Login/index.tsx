import { Button, Form, Input, NavBar } from "antd-mobile"
import "./index.module.scss"

const Login=()=>{
    return <div className="login-css">
        <NavBar onBack={()=>{}}></NavBar>
        <h2>短信登录</h2>
        <Form>
            <Form.Item>
                <Input placeholder="请输入手机号"></Input>
            </Form.Item>
            <Form.Item extra={<span>发送验证码</span>}>
                <Input placeholder="请输入验证码" ></Input>
            </Form.Item>
            <Button color="success">登录</Button>
        </Form>
    </div>
}
export default Login