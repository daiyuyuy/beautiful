import { useSelector } from "react-redux";
import ArticleItem from "../ArticleItem";

import styles from "./index.module.scss";
import { RootState } from "src/types/store";
import { ArticleItemDataPage } from "src/types/data";

type AriticleListProps = {
  channelId: number;
};

const ArticleList = ({ channelId }: AriticleListProps) => {
  //从store中获取指定频道id的文章数据
  const channelArticles = useSelector<RootState, ArticleItemDataPage>(
    (state) => {
      return state.article.channelArticles[channelId];
    }
  );

  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      <div className="article-item">
        {channelArticles?.results?.map((article) => {
          return <ArticleItem key={article.art_id} article={article} type={article.cover.type} />;
        })}
      </div>
    </div>
  );
};

export default ArticleList;
