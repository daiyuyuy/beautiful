import { ArticleItemDataPage, ResponseResult } from "src/types/data";
import { ChannelArticleAction, RootThunkAction } from "src/types/store";
import http from "src/utils/request";

export const getArticleList = (channelId: number): RootThunkAction => {
  return async (dispatch) => {
    //忽略频道id为-1，null，undefined之类的情况
    if (channelId >= 0) {
      const res = await http.get<ResponseResult<ArticleItemDataPage>>(
        "/articles",
        {
          params: {
            channel_id: channelId,
            timestamp: Date.now(),
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
