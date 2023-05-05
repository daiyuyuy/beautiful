import { ArticleInfo, ArticleItemDataPage } from "src/types/data";
import { RootAction } from "src/types/store";

type ArticleState = {
  //每个频道对应的文章列表

  channelArticles: {
    [key: number]: ArticleItemDataPage;
  };
  //文章详情
  articleInfo: ArticleInfo;
};

const initState: ArticleState = {
  channelArticles: {},
  articleInfo: {} as ArticleInfo,
};

export function articleReducer(
  state: ArticleState = initState,
  action: RootAction
): ArticleState {
  if (action.type === "article/set_channel_articles") {
    const id = action.payload.channelId;
    return {
      ...state,
      channelArticles: {
        ...state.channelArticles,
        [id]: action.payload.data,
      },
    };
  }

  if (action.type === "article/set_article_info") {
    return {
      ...state,
      articleInfo: action.payload,
    };
  }
  return state;
}
