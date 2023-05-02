import classnames from "classnames";

import Icon from "../../../components/Icon";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/types/store";
import { Channel } from "src/types/data";
import { useEffect, useState } from "react";
import { differenceBy } from "lodash";
import { removeUserChannel } from "src/store/actions/channel";

type ChannelProps = {
  onClose: () => void;
  onSelect: (id: number) => void;
  onRecommendSelect: (channel:Channel) => void;
};
const Channels = ({ onClose, onSelect, onRecommendSelect }: ChannelProps) => {
  const dispatch = useDispatch();

  const userChannels = useSelector<RootState, Channel[]>((state) => {
    return state.channel.userchannels;
  });

  const allChannels = useSelector<RootState, Channel[]>((state) => {
    return state.channel.allchannels;
  });

  const [recommendChannels, setRecommendChannels] = useState<Channel[]>([]);

  useEffect(() => {
    //从所有频道中过滤出推荐频道（所有频道-我的频道）
    // const result = allChannels.filter((item) => {
    //   const findItem = userChannels.find((x) => {
    //     return item.id === x.id;
    //   });
    //   return !findItem;
    // });

    //对比两个数组的差异
    const result = differenceBy(allChannels, userChannels, "id");
    setRecommendChannels(result);
  }, [ userChannels,allChannels]);

  //map会得到一个和原数组数量一样的基数组
  const currentChannelId = useSelector<RootState, number>((state) => {
    return state.channel.currentchannelId;
  });

  const [isEdit, setIsEdit] = useState<Boolean>(false);

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon name="icon-btn_essay_close" onclick={onClose} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames("channel-item", { edit: isEdit })}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {isEdit ? "点击按钮进行删除" : "点击按钮进入编辑"}
            </span>
            <span
              className="channel-item-edit"
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            >
              {isEdit ? "完成" : "编辑"}
            </span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {/* <span className={classnames("channel-list-item")}>
              推荐
              <Icon name="iconbtn_tag_close" />
            </span> */}

            {userChannels.map((ucl) => {
              return (
                <span
                  className={classnames("channel-list-item", {
                    selected: currentChannelId === ucl.id,
                  })}
                  key={ucl.id}
                  onClick={() => {
                    if (isEdit) return;
                    onSelect(ucl.id);
                  }}
                >
                  {ucl.name}
                  <Icon
                    name="icon-btn_essay_close"
                    onclick={() => {
                      console.log(ucl.id);
                      
                      dispatch(removeUserChannel(ucl.id));
                    }}
                  />
                </span>
              );
            })}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {/* <span className="channel-list-item">+ HTML</span> */}

            {recommendChannels.map((rechannel) => {
              return (
                <span
                  className="channel-list-item"
                  key={rechannel.id}
                  onClick={() => {
                    onRecommendSelect(rechannel);
                  }}
                >
                  + {rechannel.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
