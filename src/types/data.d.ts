export type Token = {
  token: string;
  refresh_token: string;
};
export type LoginForm = {
  mobile: string;
  code: string;
};


//用户基本信息
export type UserBasicInfo={
  id:number;
  name:string;
  photo:string;
  art_count:number
  follow_count:number
  fans_count:number
  like_count:number
}

//用户详情信息
export type UserInterInfo={
  id:number
  name:string
  photo:string
  mobile:string
  gender:number
  birthday:string
  intro:string
}


export type ResponseResult<T = any> = {
  message: string;
  data: T;
};
