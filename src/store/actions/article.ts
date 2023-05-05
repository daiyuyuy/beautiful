import {
  ArticleInfo,
  ArticleItemDataPage,
  ResponseResult,
} from "src/types/data";
import {
  ArticleInfoAction,
  ChannelArticleAction,
  RootThunkAction,
} from "src/types/store";
import http from "src/utils/request";

export const getArticleList = (
  channelId: number,
  timestamp: string
): RootThunkAction => {
  return async (dispatch, getState) => {
    //忽略频道id为-1，null，undefined之类的情况
    if (channelId >= 0) {
      const res = await http.get<ResponseResult<ArticleItemDataPage>>(
        "/articles",
        {
          params: {
            channel_id: channelId,
            timestamp: timestamp,
          },
        }
      );
      console.log(res.data.data);

      const newResults = [
        ...(getState().article.channelArticles[channelId]?.results || []),
        ...res.data.data.results,
      ];
      dispatch({
        type: "article/set_channel_articles",
        payload: {
          channelId,
          data: {
            pre_timestamp: res.data.data.pre_timestamp,
            results: newResults,
          },
        },
      } as ChannelArticleAction);
    }
  };
};

export const getArticleRefreshList = (channelId: number): RootThunkAction => {
  return async (dispatch) => {
    //忽略频道id为-1，null，undefined之类的情况
    if (channelId >= 0) {
      const res = await http.get<ResponseResult<ArticleItemDataPage>>(
        "/articles",
        {
          params: {
            channel_id: channelId,
            timestamp: "" + Date.now(),
          },
        }
      );
      console.log(res.data.data);

      dispatch({
        type: "article/set_channel_articles",
        payload: {
          channelId,
          data: res.data.data,
        },
      } as ChannelArticleAction);
    }
  };
};

//请求文章详情数据
export const getArticleDetailInfo = (id: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ResponseResult<ArticleInfo>>(`/articles/${id}`);

    dispatch({
      type: "article/set_article_info",
      payload: res.data.data,
    } as ArticleInfoAction);
  };
};

//对文章点赞
export const likeArticle = (id: string, attitude: number): RootThunkAction => {
  // export const likeArticle = (id: string): RootThunkAction => {
  // return async (dispatch, getState) => {
  return async (dispatch) => {
    //取消点赞
    // if (getState().article.articleInfo.attitude===1) {
    if (attitude === 1) {
      await http.delete(`/article/likings/${id}`);
    } else {
      //进行点赞
      await http.post("/article/likings", {
        target: id,
      });
    }

    //重新请求当前文章的详情数据
    dispatch(getArticleDetailInfo(id));
  };
};

//对文章评论
export const collectArticle = (
  id: string,
  isCollected: boolean
): RootThunkAction => {
  return async (dispatch) => {
    if (isCollected) {
      http.delete(`/article/collections/${id}`);
    } else {
      await http.post("/article/collections", {
        target: id,
      });
    }

    dispatch(getArticleDetailInfo(id));
  };
};

//关注作者
export const followAuthor = (
  authorId: string,
  articleId: string,
  isFollowed: boolean
): RootThunkAction => {
  return async (dispatch) => {
    if (isFollowed) {
      await http.delete(`/user/followings/${authorId}`);
    } else {
      await http.post("/user/followings", {
        target: authorId,
      });
    }
    //请求文章数据，要拿文章id
    dispatch(getArticleDetailInfo(articleId));
  };
};
