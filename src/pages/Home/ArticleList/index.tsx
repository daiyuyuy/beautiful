import { useDispatch, useSelector } from "react-redux";
import ArticleItem from "../ArticleItem";

import styles from "./index.module.scss";
import { RootState } from "src/types/store";
import { ArticleItemDataPage } from "src/types/data";
import { InfiniteScroll, PullToRefresh } from "antd-mobile";
import {
  getArticleList,
  getArticleRefreshList,
} from "src/store/actions/article";
import { useHistory } from "react-router-dom";

type AriticleListProps = {
  channelId: number;
};

const ArticleList = ({ channelId }: AriticleListProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  //从store中获取指定频道id的文章数据
  const channelArticles = useSelector<RootState, ArticleItemDataPage>(
    (state) => {
      return state.article.channelArticles[channelId];
    }
  );


  return (
    <div className={styles.root}>
      <PullToRefresh
        onRefresh={async () => {
          //得到后端最新的数据
          await dispatch(getArticleRefreshList(channelId));
        }}
      >
        {/* 文章列表中的每一项 */}

        {/*key改用article.art_id报错出现相同key的错误 */}
        <div className="article-item">
          {channelArticles?.results?.map((article,index) => {
            return (
              <ArticleItem
                key={index}
                article={article}
                type={article.cover.type}
                onClick={() => {
                  history.push(`/article/${article.art_id}`);
                }}
              />
            );
          })}
        </div>

        {/* 触底加载 */}
        <InfiniteScroll
          hasMore={!!channelArticles?.pre_timestamp}
          loadMore={async () => {
            await dispatch(
              getArticleList(channelId, channelArticles?.pre_timestamp)
            );
          }}
        />
      </PullToRefresh>
    </div>
  );
};

export default ArticleList;
