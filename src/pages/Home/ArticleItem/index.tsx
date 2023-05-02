import classnames from "classnames";

import Icon from "../../../components/Icon";

import styles from "./index.module.scss";
import { ArticleItemData } from "src/types/data";

import dayjs from "dayjs";

// import relactiveTime from "dayjs/plugin/relativeTime";

// import "dayjs/locale/zh-cn";

// dayjs.locale("zh-cn");

// //启用fromNow插件，可以让日期显示成相对日期 （xxx天前）
// dayjs.extend(relactiveTime);

type ArticleItemProps = {
  /**
   * 0 表示无图
   * 1 表示单图
   * 3 表示三图
   */
  type?: 0 | 1 | 3;
  article: ArticleItemData;
};

const ArticleItem = ({ type = 0, article }: ArticleItemProps) => {
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          "article-content",
          type === 3 && "t3",
          type === 0 && "none-mt"
        )}
      >
        <h3>{article.title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {article?.cover?.images?.map((img, index) => {
              return (
                <div className="article-img-wrapper" key={index}>
                  <img src={img} alt="" />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className={classnames("article-info", type === 0 && "none-mt")}>
        <span>{article.aut_name}</span>
        <span>{article.comm_count} 评论</span>
        <span>{dayjs(article.pubdate).fromNow()} </span>
        <span className="close">
          <Icon name="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  );
};

export default ArticleItem;
