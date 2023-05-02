import Icon from "../../../components/Icon";
import { NavBar, Input } from "antd-mobile";
import { useHistory } from "react-router-dom";
import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "src/types/store";
import { UserBasicInfo } from "src/types/data";
import { Socket, io } from "socket.io-client";
import { getToken } from "src/utils/token";

//聊天信息格式
type ChatMessage = {
  type: "robot" | "user";
  text: string;
};

//前后端间发送的数据类型
type ExchangeMessage = {
  msg: string;
  timestamp: number;
};

const Chat = () => {
  const history = useHistory();

  //消息列表
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  //初始消息
  const [newMessage, setNewMessages] = useState<string>("");

  const userBasicInfo = useSelector<RootState, UserBasicInfo>((state) => {
    return state.profile.userBasicInfo;
  });

  const socketRef = useRef<Socket | null>(null);

  const listRef = useRef<HTMLDivElement>(null);

  //一进入页面就进行sokect.io连接
  useEffect(() => {
    const socket = io("http://toutiao.itheima.net", {
      transports: ["websocket"],
      query: {
        token: getToken().token,
      },
    });

    //监听
    socket.on("connect", () => {
      console.log("..... 和服务器建立websocket连接");

      //向机器人发送一个消息

      socket.emit("message", {
        msg: "请问布偶可以免费送给我吗",
        timestamp: Date.now(),
      } as ExchangeMessage);
    });

    //监听机器人发给我们的
    socket.on("message", (data: ExchangeMessage) => {
      // console.log("发什么玩意了", data);

      //不可以直接使用messages状态，如果使用它，就需要设置useEffect依赖项，
      //设置依赖项会导致socket.io-client连接重新创建
      //解决办法：使用状态更新函数的参数为函数的形式
      //setMessages( [...messages, { type: "robot", text: data.msg }]);
      setMessages((m) => [...m, { type: "robot", text: data.msg }]);
    });

    socketRef.current = socket;

    //设置依赖项messages会导致messages每次更新，回调函数都会执行一次
    //导致机器人不停的问
  }, []);

  //每次重新渲染，重新算高度
  useEffect(()=>{
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  },[messages])

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        className="fixed-header"
        onBack={() => history.push("/home/profile")}
      >
        喵喵语录
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={listRef}>
        {/* 机器人的消息 */}
        {/* <div className="chat-item">
          <Icon name="icon-tongxunlu1" />
          <div className="message">你好！</div>
        </div> */}

        {/* 用户的消息 */}
        {/* <div className="chat-item user">
          <img src={"http://toutiao.itheima.net/images/user_head.jpg"} alt="" />
          <div className="message">你好？</div>
        </div> */}

        {/* map要设置唯一性的key */}
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={classNames("chat-item", {
                user: msg.type === "user",
              })}
            >
              {msg.type === "robot" && <Icon name="icon-tongxunlu1" />}
              {msg.type === "user" && <img src={userBasicInfo.photo} alt="" />}

              <div className="message">{msg.text}</div>
            </div>
          );
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          value={newMessage}
          onChange={(e) => {
            setNewMessages(e.trim());
          }}
          onKeyUp={(e) => {
            console.log(e);

            if (e.key === "Enter") {
              socketRef.current?.emit("message", {
                msg: newMessage,
                timestamp: Date.now(),
              } as ExchangeMessage);

              setMessages([...messages, { type: "user", text: newMessage }]);

              setNewMessages("");
            }
          }}
        />
        <Icon name="iconbianji" />
      </div>
    </div>
  );
};

export default Chat;
