import { Popup, Tabs } from "antd-mobile";
import Icon from "../../components/Icon";

import styles from "./index.module.scss";
import {
  getAllChannel,
  getUserChannel,
  updateUserChannels,
} from "src/store/actions/channel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrentChannelAction, RootState } from "src/types/store";
import { Channel } from "src/types/data";
import Channels from "./Channels";
import ArticleList from "./ArticleList";
import { getArticleList } from "src/store/actions/article";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserChannel());
    dispatch(getAllChannel());
  }, [dispatch]);

  const userChannels = useSelector<RootState, Channel[]>((state) => {
    return state.channel.userchannels;
  });

  const [channelMangerShow, setChannelMangerShow] = useState<boolean>(false);

  const currentChannelId = useSelector<RootState, number>((state) => {
    return state.channel.currentchannelId;
  });

  useEffect(() => {
    dispatch(getArticleList(currentChannelId));
  }, [dispatch, currentChannelId]);

  useEffect(() => {
    const defaultSelectChannelId = userChannels[0]?.id;

    dispatch({
      type: "channel/set_current_channel",
      payload: defaultSelectChannelId,
    } as CurrentChannelAction);
  }, [userChannels, dispatch]);
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}

      <Tabs
        className="tabs"
        activeLineMode={"fixed"}
        activeKey={"" + currentChannelId}
        onChange={(key: string) => {
          dispatch({
            type: "channel/set_current_channel",
            payload: +key,
          } as CurrentChannelAction);
        }}
      >
        {/* <Tabs.Tab title="猫猫零食" key={"catfood"}>
      
        </Tabs.Tab>
        <Tabs.Tab title="垃圾食品" key={"junkfood"}>
          垃圾食品
        </Tabs.Tab>
        <Tabs.Tab title="日常百货" key={"general"}>
          日常百货
        </Tabs.Tab>
        <Tabs.Tab title="衣物饰品" key={"cloths"}>
          衣物饰品
        </Tabs.Tab>
        <Tabs.Tab title="奢侈品" key={"luxury"}>
          奢侈品
        </Tabs.Tab> */}

        {userChannels.map((chls) => {
          return (
            <Tabs.Tab title={chls.name} key={"" + chls.id}>
            
              <ArticleList channelId={chls.id} />
            </Tabs.Tab>
          );
        })}
      </Tabs>
      <div className="tabs-opration">
        <Icon name="icon-sousuo1" />
        <Icon
          name="icon-shezhi"
          onclick={() => {
            setChannelMangerShow(true);
          }}
        />
      </div>

      <Popup visible={channelMangerShow} position="left">
        <div style={{ width: "100vw" }}>
          <Channels
            onClose={() => setChannelMangerShow(false)}
            onSelect={(id: number) => {
              console.log(id);

              dispatch({
                type: "channel/set_current_channel",
                payload: id,
              } as CurrentChannelAction);

              setChannelMangerShow(false);
            }}
            onRecommendSelect={(channel: Channel) => {
              dispatch(updateUserChannels(channel));
            }}
          />
        </div>
      </Popup>
    </div>
  );
};

export default Home;
