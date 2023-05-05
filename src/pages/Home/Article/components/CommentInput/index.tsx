import { useHistory } from "react-router-dom";
import styles from "./index.module.scss";
import { NavBar, TextArea } from "antd-mobile";
import { useState } from "react";

type Props = {
  // 评论的作者的名字
  name?: string;
  onClose: () => void;
  onCommit: (content: string) => void;
};

export default function CommentInput({
  name,
  onClose,
  onCommit,
}: Props) {
  const [content, setContent] = useState<string>("");
  return (
    <div className={styles.root}>
      <NavBar
        right={
          <span
            className="publish"
            onClick={() => {
              if (content.trim()) {
                onCommit(content.trim());
              }
            }}
          >
            发表
          </span>
        }
        onBack={onClose}
      >
        {name ? "回复评论" : "评论文章"}
      </NavBar>
      <div className="input-area">
        {/* 回复别人的评论时显示：@某某 */}
        {name && <div className="at">@{name}:</div>}

        {/* 评论内容输入框 */}
        <TextArea
          placeholder="说点什么~"
          rows={10}
          value={content}
          onChange={(val: string) => {
            setContent(val);
          }}
        />
      </div>
    </div>
  );
}
