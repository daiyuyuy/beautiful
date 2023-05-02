import { Channel } from "src/types/data";
import { RootAction } from "src/types/store";

type ChannelState = {
  userchannels: Channel[];
  allchannels: Channel[];
  currentchannelId: number;
};

const initState: ChannelState = {
  userchannels: [],
  allchannels: [],
  currentchannelId: -1,
};

export function channelReducer(
  state: ChannelState = initState,
  action: RootAction
): ChannelState {
  //保存用户数据
  if (action.type === "channel/set_user_channel") {
    return {
      ...state,
      userchannels: action.payload,
    };
  }

  //保存所有频道数据
  if (action.type === "channel/set_all_channel") {
    return {
      ...state,
      allchannels: action.payload,
    };
  }

  //保存当前选中
  if (action.type === "channel/set_current_channel") {
    return {
      ...state,
      currentchannelId: action.payload,
    };
  }
  return state;
}
