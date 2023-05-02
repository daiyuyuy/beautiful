import { Button, List, DatePicker, NavBar, Popup, Dialog } from "antd-mobile";
import classNames from "classnames";

import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetailInfo,
  updataUserPhoto,
  updateUserDetailInfo,
} from "src/store/actions/profile";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { LoginAction, RootState } from "src/types/store";
import { Token, UserInterInfo } from "src/types/data";
import EditInput from "../EditInput";
import EditList from "../EditList/index";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";

import { removeToken } from "src/utils/token";
import { Action } from "antd-mobile/es/components/dialog";

// import EditInput from "../EditInput/index";

const Item = List.Item;
type Popup1ControlData = {
  visible: boolean;
  type: "" | "name" | "intro";
};

type Popup2ControlData = {
  visible: boolean;
  type: "" | "gender" | "photo";
};

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserDetailInfo());
  }, [dispatch]);

  const userDetailInfo = useSelector<RootState, UserInterInfo>((state) => {
    return state.profile.userInterInfo;
  });

  const [popup1status, setPopupStatus] = useState<Popup1ControlData>({
    visible: false,
    type: "",
  });

  const [popup2status, setPopup2Status] = useState<Popup2ControlData>({
    visible: false,
    type: "",
  });
  const [birthdaystatus, setBirthdayStatus] = useState(false);

  //引用文件上传标签
  const fileRef = useRef<HTMLInputElement>(null);

  const fileChangeHeader = async (e: ChangeEvent<HTMLInputElement>) => {
    //1.获取选中文件
    //数组本身为空的情况在数组前加？.
    const file = e.target.files?.[0];

    //2.拼装formData，准备上传
    const formData = new FormData();
    formData.append("photo", file!);

    // 3.进行上传
    await dispatch(updataUserPhoto(formData));

    setPopup2Status({ visible: false, type: "" });
  };

  const LogoutHandler = () => {
    Dialog.show({
      content: "请问小可爱是想要退出登录嘛",
      closeOnAction: true,
      actions: [
        [
          {
            key: "cancel",
            text: "取消",
            className:"dialog-no"
          },
          {
            key: "ok",
            text: "确定",
            className:"dialog-yes"
          },
        ],
      ],
      onAction: (action: Action, index: number) => {
        // console.log(action, index);

       if(action.key==="ok"){
        //清空token
        dispatch({
          type: "login/set_token",
          payload: {
            token: "",
            refresh_token: "",
          } as Token,
        } as LoginAction);

        removeToken();

        //跳转登录页
        history.push("/login");
      }
      },
    });
  };
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            "--border-bottom": "1px solid #F0F0F0",
          }}
          onBack={() => {
            history.push("/home/profile");
          }}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img
                    width={24}
                    height={24}
                    src={userDetailInfo.photo}
                    alt=""
                  />
                </span>
              }
              arrow
              onClick={() => {
                setPopup2Status({ visible: true, type: "photo" });
              }}
            >
              头像
            </Item>

            <input
              type="file"
              hidden
              ref={fileRef}
              onChange={fileChangeHeader}
            />

            <Item
              arrow
              extra={userDetailInfo.name}
              onClick={() => setPopupStatus({ visible: true, type: "name" })}
            >
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames("intro", "normal")}>
                  {userDetailInfo.intro || "未填写"}
                </span>
              }
              onClick={() => {
                setPopupStatus({ visible: true, type: "intro" });
              }}
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item
              arrow
              extra={userDetailInfo.gender === 0 ? "男" : "女"}
              onClick={() => {
                setPopup2Status({ visible: true, type: "gender" });
              }}
            >
              性别
            </Item>
            <Item
              arrow
              extra={userDetailInfo.birthday}
              onClick={() => {
                setBirthdayStatus(true);
              }}
            >
              生日
            </Item>
          </List>

          <DatePicker
            visible={birthdaystatus}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
            //点击取消按钮
            onCancel={() => {
              setBirthdayStatus(false);
            }}
            //点击确认按钮
            onConfirm={async (value: Date) => {
              await dispatch(
                updateUserDetailInfo({
                  birthday: dayjs(value).format("YYYY-MM-DD"),
                })
              );

              setBirthdayStatus(false);
            }}
          />
        </div>

        <div className="logout">
          <Button className="btn" onClick={LogoutHandler}>
            退出登录
          </Button>
        </div>
      </div>

      {/* 弹出层 */}
      {/* 姓名/简介 */}
      <Popup visible={popup1status.visible} position="right" destroyOnClose>
        <div style={{ width: "100vw" }}>
          {/* <EditInput
            type={EditInputProps.type}
            onClose={() => {
              setPopupStatus({ visible: false, type: '' });
            }}
          /> */}
          <EditInput
            type={popup1status.type}
            onClose={() => {
              setPopupStatus({ visible: false, type: "" });
            }}
            onSubmit={async (type: string, val: string) => {
              console.log(val);

              await dispatch(
                updateUserDetailInfo({
                  // type是变量，要用变量的值 [type]
                  [type]: val,
                })
              );
              setPopupStatus({ visible: false, type: "" });
            }}
          />
        </div>
      </Popup>

      {/* 性别/头像 */}
      <Popup visible={popup2status.visible} position="bottom" destroyOnClose>
        <div style={{ width: "100vw" }}>
          <EditList
            type={popup2status.type}
            onCancel={() => {
              setPopup2Status({ visible: false, type: "" });
            }}
            onSelect={async (type: string, val: number) => {
              if (type === "gender") {
                await dispatch(
                  updateUserDetailInfo({
                    [type]: val,
                  })
                );
                setPopup2Status({ visible: false, type: "" });
              } else {
                fileRef.current?.click();
                console.log(val);
              }
            }}
          />
        </div>
      </Popup>
    </div>
  );
};

export default ProfileEdit;
