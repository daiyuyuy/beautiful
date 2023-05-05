import { NavBar, InfiniteScroll, Popup } from "antd-mobile";
import { useHistory, useParams } from "react-router-dom";
import classNames from "classnames";
import styles from "./index.module.scss";

import Icon from "../../../components/Icon";
import CommentItem from "./components/CommentItem";
import CommentFooter from "./components/CommentFooter";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  collectArticle,
  followAuthor,
  getArticleDetailInfo,
  likeArticle,
} from "src/store/actions/article";
import { RootState } from "src/types/store";
import { ArticleInfo, CommentRes, Comment } from "src/types/data";
import DOMPurify from "dompurify";
import { getCommentList, publishComment } from "src/store/actions/comment";
import NoComment from "./components/NoComment";
import CommentInput from "./components/CommentInput";
import CommentReply from "./components/CommentReply";

// import highLight from "highlight.js";
// import "highlight.js/styles/vs2015.css";

const Article = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const params = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getArticleDetailInfo(params.id));
    dispatch(getCommentList(params.id, ""));
  }, [dispatch, params]);

  const articleInfo = useSelector<RootState, ArticleInfo>((state) => {
    return state.article.articleInfo;
  });

  // useEffect(() => {
  //   highLight.configure({
  //     ignoreUnescapedHTML: true,
  //   });

  //   const preList = document.querySelectorAll(".dg-html pre");

  //   preList.forEach((pre) => {
  //     highLight.highlightElement(pre as HTMLElement);
  //   });

  //   //每次articleInfo发生变化，就会重新渲染
  // }, [articleInfo]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);

  const [isTopInfoShow, setIsTopInfoShow] = useState<boolean>(false);

  useEffect(() => {
    const scrollHandler = () => {
      //得到关于这个元素的信息，比如宽高，四边位置的信息
      const rectInfo = authorRef.current?.getBoundingClientRect();
      // console.log(rectInfo);

      //如果当前元素滚出了容器，那就显示顶部工具栏的内容
      if (rectInfo!.top <= 0) {
        setIsTopInfoShow(true);
      } else {
        setIsTopInfoShow(false);
      }
    };
    wrapperRef.current?.addEventListener("scroll", scrollHandler);

    return () => {
      wrapperRef.current?.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const commentRes = useSelector<RootState, CommentRes>((state) => {
    return state.comment.commentRes;
  });
  // useEffect(() => {
  //   //只有当id
  //   // if (articleInfo.art_id) {
  //   //   dispatch(getCommentList(articleInfo.art_id));
  //   // }
  //   dispatch(getCommentList(articleInfo.art_id));
  // }, [dispatch,articleInfo]);

  console.log(articleInfo);

  const onAuthorFollow = () => {
    dispatch(
      followAuthor(
        articleInfo.aut_id,
        articleInfo.art_id,
        articleInfo.is_followed
      )
    );
  };

  // const [showCommentForm, setShowCommentForm] = useState<Boolean>(false);
  // const [showCommentReply, setShowCommentReply] = useState<Boolean>(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const [showCommentReply, setShowCommentReply] = useState(false);
  const [currentCommentReply, setCurrentCommentReply] = useState<Comment>(
    {} as Comment
  );

  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper" ref={wrapperRef}>
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{articleInfo.title}</h1>

            <div className="info">
              <span>{articleInfo.pubdate}</span>
              <span>{articleInfo.read_count} 阅读</span>
              <span>{articleInfo.comm_count} 评论</span>
            </div>

            <div className="author" ref={authorRef}>
              <img src={articleInfo.aut_photo} alt="" />
              <span className="name">{articleInfo.aut_name}</span>
              {/* <span className={classNames("follow", articleInfo.is_followed ? "followed" : "")}> */}
              <span
                className={classNames("follow", {
                  followed: articleInfo.is_followed,
                })}
                onClick={onAuthorFollow}
              >
                {articleInfo.is_followed ? "已关注" : "关注"}
              </span>
            </div>
          </div>

          <div className="content">
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(articleInfo.content || ""),
              }}
            />
            <div className="date">{articleInfo.pubdate}</div>
          </div>

          <div className="comment" ref={commentRef}>
            <div className="comment-header">
              <span>全部评论{articleInfo.comm_count}</span>
              <span>{articleInfo.like_count} 点赞</span>
            </div>

            {/* 评论列表 */}
            <div className="comment-list">
              {commentRes.results.length <= 0 && <NoComment />}
              {commentRes.results.map((comment, index) => {
                return (
                  <CommentItem
                    comment={comment}
                    key={index}
                    onReply={() => {
                      setShowCommentReply(true);
                      setCurrentCommentReply(comment);
                    }}
                  />
                );
              })}

              <InfiniteScroll
                hasMore={commentRes.last_id !== commentRes.end_id}
                loadMore={async () => {
                  await dispatch(getCommentList(params.id, commentRes.last_id));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onBack={() => history.go(-1)}
          right={
            <span>
              <Icon name="icongengduo" />
            </span>
          }
        >
          {isTopInfoShow && (
            <div className="nav-author">
              <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
              <span className="name">{articleInfo.aut_name}</span>
              <span
                className={classNames("follow", {
                  followed: articleInfo.is_followed,
                })}
                onClick={onAuthorFollow}
              >
                {articleInfo.is_followed ? "已关注" : "关注"}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter
          article={articleInfo}
          onLiking={(attitude: number) => {
            // dispatch(likeArticle(articleInfo.art_id))
            dispatch(likeArticle(articleInfo.art_id, attitude));
          }}
          onCollecting={(isCollected: boolean) => {
            dispatch(collectArticle(articleInfo.art_id, isCollected));
          }}
          onComment={() => {
            //如果当前不在评论区域，则滚动到评论区域

            const res = commentRef.current?.getBoundingClientRect();

            // const headerHeight=headerRef.current?.getBoundingClientRect()
            console.log(res);

            // if (wrapperRef.current!.scrollTop === res!.top) {
            //   wrapperRef.current!.scrollTop = 0 + 50;
            // } else {
            wrapperRef.current!.scrollTop = res!.top - 50;
          }}
          onInputShow={() => {
            setShowCommentForm(true);
          }}
        />

        {/* 弹窗组件 */}
        <Popup visible={showCommentForm} position="bottom" destroyOnClose>
          {/* 宽度高度充满 */}
          <div style={{ width: "100vw", height: "100vh" }}>
            <CommentInput
              onClose={() => {
                setShowCommentForm(false);
              }}
              onCommit={(content: string) => {
                console.log(content);
                dispatch(publishComment(articleInfo.art_id, content));

                setShowCommentForm(false);
                const res = commentRef.current?.getBoundingClientRect();

                //设置如果在评论区域，那么返回时还在评论区域
                //如果不在评论区域，跳转到评论区域
                if (res!.top >= 100) {
                  wrapperRef.current!.scrollTop = res!.top - 50;
                }
              }}
            />
          </div>
        </Popup>

        {/* 回复弹窗 */}
        <Popup visible={showCommentReply} position="bottom" destroyOnClose>
          <div style={{ width: "100vw", height: "100vh" }}>
            <CommentReply
              onClose={() => {
                setShowCommentReply(false);
              }}
              comment={currentCommentReply}
            />
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default Article;
