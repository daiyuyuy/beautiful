import Icon from "../../../../../components/Icon";
import styles from "./index.module.scss";

import { ArticleInfo } from "src/types/data";

type Props = {
  // normal 普通评论
  // reply 回复评论
  type?: "normal" | "reply";
  article: ArticleInfo;
  onLiking?: (attitude: number) => void;
  onCollecting?: (iscollected: boolean) => void;
  onComment?: () => void;
  onInputShow?: () => void;
};

// const comment = useSelector<RootState>((state) => {
//   return state;
// });

const CommentFooter = ({
  type = "normal",
  article,
  onLiking,
  onCollecting,
  onComment,
  onInputShow,
}: Props) => {
  return (
    <div className={styles.root}>
      <div className="input-btn" onClick={onInputShow}>
        <Icon name="iconbianji" />
        <span>抢沙发</span>
      </div>

      {type === "normal" && (
        <>
          <div className="action-item" onClick={onComment}>
            <Icon name="icon-duihuaxinxi" />
            <p>评论</p>
            {article.comm_count > 0 && (
              <span className="bage">{article.comm_count}</span>
            )}
          </div>
          <div
            className="action-item"
            onClick={() => {
              onLiking?.(article.attitude);
            }}
          >
            <Icon
              name={article.attitude === 1 ? "icon-zantianchong" : "icon-zan1"}
            />
            <p>点赞</p>
          </div>
          <div
            className="action-item"
            onClick={() => {
              // onCollecting(article.is_collected);
              onCollecting?.(article.is_collected);
            }}
          >
            <Icon
              name={article.is_collected ? "icon-xiaitianchong" : "icon-xiai"}
            />
            <p>收藏</p>
          </div>
        </>
      )}

      {type === "reply" && (
        <div className="action-item">
          <Icon
            name={article.attitude === 1 ? "iconbtn_like_sel" : "iconbtn_like2"}
          />
          <p>点赞</p>
        </div>
      )}

      <div className="action-item">
        <Icon name="icon-fenxiang" />
        <p>分享</p>
      </div>
    </div>
  );
};

export default CommentFooter;
