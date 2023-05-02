import store from "src/store";

import { ThunkAction } from "redux-thunk";
import { UserInterInfo, Token, UserBasicInfo, Channel } from "./data";

//payload:传入新的token属性
export type LoginAction = {
  type: "login/set_token";
  payload: Token;
};

export type ProfileAction = {
  type: "profile/set_user_basic";
  payload: UserBasicInfo;
};

export type UserDetailAction = {
  type: "profile/set_user_detail";
  payload: UserInterInfo;
};

//频道
export type UserChannelAction = {
  type: "channel/set_user_channel";
  payload: Channel[];
};

//全部频道
export type AllChannelAction = {
  type: "channel/set_all_channel";
  payload: Channel[];
};

//当前选中的频道
export type CurrentChannelAction = {
  type: "channel/set_current_channel";
  payload: number;
};

//文章列表
export type ChannelArticleAction = {
  type: "article/set_channel_articles";
  payload: {
    channelId: number;
    data: ArticleItemDataPage;
  };
};

export type RootState = ReturnType<typeof store.getState>;

export type RootAction =
  | LoginAction
  | ProfileAction
  | UserDetailAction
  | UserChannelAction
  | AllChannelAction
  | CurrentChannelAction
  | ArticleAction;

// export type LoginThunkAction = ThunkAction<
//   void,
//   RootState,
//   unknown,
//   LoginAction
// >;

// export type UserThunkAction = ThunkAction<
//   void,
//   RootState,
//   unknown,
//   UserThunkAction
// >;

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;
