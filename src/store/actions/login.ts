import { LoginForm, ResponseResult, Token } from "src/types/data";
import { LoginAction, RootThunkAction } from "src/types/store";
import http from "src/utils/request";
import { setToken } from "src/utils/token";

// export const LoginTask:LoginThunkAction=async(dispatch)=>{}

export const loginActionCreator = (loginForm: LoginForm): RootThunkAction => {
  return async (dispatch) => {
    //进行网络请求
    const res = await http.post<ResponseResult<Token>>(
      "/authorizations",
      loginForm
    );
    // console.log(res.data.data.token);
    const token = res.data.data;
    dispatch({
      type: "login/set_token",
      payload: token,
    } as LoginAction);

    setToken(token);
  };
};
