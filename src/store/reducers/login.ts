import { Token } from "src/types/data";
import { LoginAction } from "src/types/store";


export type LoginState = {
  token: Token;
};
const initState: LoginState = {
  token: {
    token: "",
    refresh_token: "",
  },
};

export function LoginReducer(
  state: LoginState = initState,
  action: LoginAction
): LoginState {
  if (action.type === "login/set_token") {
    return {
      ...state,
      token: action.payload,
    };
  }
  return state;
}
