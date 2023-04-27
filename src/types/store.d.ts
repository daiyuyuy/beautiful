
import store from "src/store";

import {ThunkAction} from 'redux-thunk'

  //payload:传入新的token属性
export type LoginAction = {
  type: "login/set_token";
  payload: Token;
};

export type RootState=ReturnType<typeof store.getState>
export type LoginThunkAction=ThunkAction<void,RootState,unknown,LoginAction>