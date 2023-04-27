export type Token = {
  token: string;
  refresh_token: string;
};
export type LoginForm = {
  mobile: string;
  code: string;
};

export type ResponseResult<T = any> = {
  message: string;
  data: T;
};
