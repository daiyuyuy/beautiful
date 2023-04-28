import store from "src/store";

import { ThunkAction } from "redux-thunk";
import { RootInterInfo, Token, UserBasicInfo } from "./data";

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
  payload: RootInterInfo;
};



export type RootState = ReturnType<typeof store.getState>;

export type RootAction = LoginAction | ProfileAction | UserDetailAction;

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
