import { CommentRes, ResponseResult } from "src/types/data";
import { CommentResAction, RootThunkAction } from "src/types/store";
import http from "src/utils/request";

//获取文章评论
export const getCommentList = (
  articleId: string,
  offset: string
): RootThunkAction => {
  return async (dispatch, getState) => {
    const res = await http.get<ResponseResult<CommentRes>>("/comments", {
      params: {
        type: "a", //获取普通评论
        source: articleId,
        offset, //下一页的起始数据的ID
        limit: 5,
      },
    });
    console.log(res);

    //将评论数据存入redux

    const oldComment = getState().comment.commentRes;
    const newComment = res.data.data;

    dispatch({
      type: "comment/set_comment_res",
      payload: {
        total_count: newComment.total_count,
        last_id: newComment.last_id,
        end_id: newComment.end_id,
        results: [...oldComment.results, ...newComment.results],
      },
    } as CommentResAction);

    // dispatch({
    //   type: "comment/set_comment_res",
    //   payload: {
    //     total_count: res.data.data.total_count,
    //     last_id: res.data.data.last_id,
    //     end_id: res.data.data.end_id,
    //     results: [...oldComment.results, ...res.data.data.results],
    //   },
    // } as CommentResAction);
  };
};

//获取文章评论（不拼接老数据，只获取新数据）
export const getNewCommentList = (
  articleId: string,
  offset: string
): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ResponseResult<CommentRes>>("/comments", {
      params: {
        type: "a", //获取普通评论
        source: articleId,
        offset, //下一页的起始数据的ID
        limit: 5,
      },
    });
    console.log(res);

    //将评论数据存入redux

    const newComment = res.data.data;

    dispatch({
      type: "comment/set_comment_res",
      payload: {
        total_count: newComment.total_count,
        last_id: newComment.last_id,
        end_id: newComment.end_id,
        results: newComment.results,
      },
    } as CommentResAction);

    // dispatch({
    //   type: "comment/set_comment_res",
    //   payload: {
    //     total_count: res.data.data.total_count,
    //     last_id: res.data.data.last_id,
    //     end_id: res.data.data.end_id,
    //     results: [...oldComment.results, ...res.data.data.results],
    //   },
    // } as CommentResAction);
  };
};

//回复文章评论：发送请求
export const publishComment = (
  target: string,
  content: string
): RootThunkAction => {
  return async (dispatch) => {
    //请求参数记得看文档body
     await http.post<ResponseResult<CommentRes>>("/comments", {
      target,
      content,
    });

    dispatch(getNewCommentList(target, ""));
  };
};
