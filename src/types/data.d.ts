export type Token = {
  token: string;
  refresh_token: string;
};
export type LoginForm = {
  mobile: string;
  code: string;
};

//用户基本信息
export type UserBasicInfo = {
  id: number;
  name: string;
  photo: string;
  art_count: number;
  follow_count: number;
  fans_count: number;
  like_count: number;
};

//用户详情信息
export type UserInterInfo = {
  id: number;
  name: string;
  photo: string;
  mobile: string;
  gender: number;
  birthday: string;
  intro: string;
};

//频道数据信息
export type Channel = {
  id: number;
  name: string;
};

//文章详情
//文章列表项数据中的 图片信息
export type ArticleItemCover = {
  type: 0 | 1 | 3;
  images: string[];
};

//interface 定义重名了会合并属性，type 办不到(会报错提醒 重复定义)

//文章列表项数据的主体
export type ArticleItemData = {
  art_id: string;
  title: string;
  aut_id: string;
  aut_name: string;
  comm_count: number;
  is_top: number;
  pubdate: string;
  cover: ArticleItemCover;
};

//文章列表项分页数据结构
export type ArticleItemDataPage = {
  pre_timestamp: string;
  results: ArticleItemData[];
};

export interface ArticleDetail extends ArticleDetail {
  like_count: number;
  collect_count: number;
}

export type ArticleInfo = {
  art_id: string; //文章id
  title: string;
  content: string;
  pubdate: string;

  aut_id: string; //作者id
  aut_name: string;
  aut_photo: string;
  comm_count: number;
  like_count: number;
  read_count: number;
  attitude: number; //点赞
  is_followed: boolean; //关注
  is_collected: boolean; //收藏
};

//评论数据类型
export type Comment = {
  // art_id: string;

  aut_id: string;
  aut_name: string;
  aut_photo: string;
  com_id: string;
  content: string;
  // is_top: number;
  pubdate: string;
  is_liking: boolean;
  like_count: number;

  reply_count: number;
};

export type CommentRes = {
  end_id: string;
  last_id: string;
  results: Comment[];
  total_count: number;
};

export type ResponseResult<T = any> = {
  message: string;
  data: T;
};
