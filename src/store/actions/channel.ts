import { Channel, ResponseResult } from "src/types/data";
import {
  AllChannelAction,
  RootThunkAction,
  UserChannelAction,
} from "src/types/store";
import { getChannel, setChannel } from "src/utils/channel";
import http from "src/utils/request";
import { hasToken } from "src/utils/token";

//获取频道信息
export const getUserChannel = (): RootThunkAction => {
  return async (dispatch) => {
    //如果用户已登录
    if (hasToken()) {
      const res = await http.get<ResponseResult<{ channels: Channel[] }>>(
        "/user/channels"
      );
      console.log(res.data.data.channels);

      //将频道数据保存到store
      dispatch({
        type: "channel/set_user_channel",
        payload: res.data.data.channels,
      } as UserChannelAction);
    }
    //如果未登录
    else {
      const channels = getChannel();
      if (channels.length > 0) {
        dispatch({
          type: "channel/set_user_channel",
          payload: channels,
        } as UserChannelAction);
      } else {
        const res = await http.get<ResponseResult<{ channels: Channel[] }>>(
          "/user/channels"
        );
        console.log(res.data.data.channels);

        const chl = res.data.data.channels;
        //将频道数据保存到store
        dispatch({
          type: "channel/set_user_channel",
          payload: chl,
        } as UserChannelAction);

        setChannel(chl);
      }
    }
  };
};

//获取全部频道
export const getAllChannel = (): RootThunkAction => {
  return async (dispatch) => {
    //调用接口，获取所有频道数据
    const res = await http.get<ResponseResult<{ channels: Channel[] }>>(
      "/channels"
    );

    console.log(res.data.data.channels);

    //将所有频道数据保存到Redux
    dispatch({
      type: "channel/set_all_channel",
      payload: res.data.data.channels,
    } as AllChannelAction);
  };
};

export const updateUserChannels = (channel: Channel): RootThunkAction => {
  return async (dispatch, getState) => {
    const newUserChannels = [...getState().channel.userchannels, channel];
    if (!hasToken()) {
      dispatch({
        type: "channel/set_user_channel",
        payload: newUserChannels,
      } as UserChannelAction);

      setChannel(newUserChannels);
    } else {
      const res = await http.put<ResponseResult<{ channels: Channel[] }>>(
        "/user/channels",
        {
          channels: newUserChannels,
        }
      );

      dispatch({
        type: "channel/set_user_channel",
        payload: res.data.data.channels,
      } as UserChannelAction);
    }
  };
};

//删除
export const removeUserChannel = (id: number): RootThunkAction => {
  return async (dispatch, getState) => {
    //登录用户
    if (hasToken()) {
      await http.delete(`/user/channels/${id}`);

      //过滤出点击的id和我的频道id不一样的，将其保留
      const newUserChannels = getState().channel.userchannels.filter(
        (x) => id !== x.id
      );

      dispatch({
        type: "channel/set_user_channel",
        payload: newUserChannels,
      } as UserChannelAction);
    }

    //未登录用户
    else {
      const channels = getChannel();
      const newUserChannels = channels.filter((x) => id !== x.id);

      dispatch({
        type: "channel/set_user_channel",
        payload: newUserChannels,
      } as UserChannelAction);

      setChannel(newUserChannels);
    }
  };
};
