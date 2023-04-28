import { Input, InputRef, NavBar, TextArea, TextAreaRef } from "antd-mobile";

import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "src/types/store";
import { UserInterInfo } from "src/types/data";
import { useEffect, useRef, useState } from "react";

type EditInputProps = {
  onClose?: () => void;
  type: "" | "name" | "intro";
  onSubmit: (type: string, val: string) => void;
};

const EditInput = ({ onClose, type, onSubmit }: EditInputProps) => {
  const userDetailInfo = useSelector<RootState, UserInterInfo>((state) => {
    return state.profile.userInterInfo;
  });

  const [content, setContent] = useState<string>(() => {
    return type === "name" ? userDetailInfo.name : userDetailInfo.intro;
  });
  const onChange = (e: string) => {
    setContent(e);
  };

  const inputRef = useRef<InputRef>(null);
  const textareaRef = useRef<TextAreaRef>(null);

  useEffect(() => {
    if (type === "name") {
      inputRef.current?.focus();
    } else {
      textareaRef.current?.focus();
    }
  }, [type, inputRef, textareaRef]);

  const commitInfo = () => {
    onSubmit(type,content);
  };

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={
          <span className="commit-btn" onClick={commitInfo}>
            提交
          </span>
        }
        onBack={onClose}
      >
        编辑{type === "name" ? "昵称" : "简介"}
      </NavBar>

      <div className="edit-input-content">
        <h3>{type === "name" ? "昵称" : "简介"}</h3>

        {type === "name" ? (
          <div className="input-wrap">
            <Input
              placeholder="请输入"
              value={content}
              onChange={onChange}
              ref={inputRef}
            />
          </div>
        ) : (
          <TextArea
            className="textara"
            showCount
            maxLength={99}
            placeholder="请输入"
            value={content}
            onChange={onChange}
            ref={textareaRef}
          />
        )}
      </div>
    </div>
  );
};

export default EditInput;
