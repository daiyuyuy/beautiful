import { ResponseResult, UserInterInfo, UserBasicInfo } from "src/types/data";
import {
  ProfileAction,
  RootThunkAction,
  UserDetailAction,
} from "src/types/store";
import http from "src/utils/request";

//存入store

//获取用户自己信息
export const getUserBasicInfo = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ResponseResult<UserBasicInfo>>("/user");
    const info = res.data.data;

    dispatch({
      type: "profile/set_user_basic",
      payload: info,
    } as ProfileAction);
  };
};
//获取用户个人资料
export const getUserDetailInfo = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ResponseResult<UserInterInfo>>("/user/profile");
    const info = res.data.data;
    console.log(res);

    dispatch({
      type: "profile/set_user_detail",
      payload: info,
    } as UserDetailAction);
  };
};
//修改用户昵称和简介和性别 Partial时TS提供的一个工具类型，可以将一个对象类型中的所有字段，变成可选
export const updateUserDetailInfo = (
  detailInfo: Partial<UserInterInfo>
): RootThunkAction => {
  return async (dispatch) => {
     await http.patch("/user/profile", detailInfo);

    //重新获取最新的用户详情信息
    dispatch(getUserDetailInfo())
  };
};

//修改用户头像
export const updataUserPhoto=(formData:FormData):RootThunkAction=>{
    return async (dispatch)=>{
        await http.patch("/user/photo",formData)

        dispatch(getUserDetailInfo())
    }
}


