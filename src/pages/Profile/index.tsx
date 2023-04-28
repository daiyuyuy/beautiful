import { Link, useHistory } from "react-router-dom";

import Icon from "../../components/Icon";
import styles from "./index.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBasicInfo } from "src/store/actions/profile";
import { RootState } from "src/types/store";
import { UserBasicInfo } from "src/types/data";

// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getUser } from '@/store/actions/profile'
// import { RootState } from '@/types/store'
// import { useInitialState } from '@/utils/hooks'

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //一进入页面就调用用户信息
  useEffect(() => {
    dispatch(getUserBasicInfo());
  }, [dispatch]);

  //拿store中的信息用useSelector
  const userBasicInfo = useSelector<RootState,UserBasicInfo>((state) => {
    return state.profile.userBasicInfo;
  });

  //自定义Hook函数代替上面的useEffect和useSelector
  // const {userBasicInfo}=useRemoteData(getUserBasicInfo).profile

  
  // const { user } = useSelector((state: RootState) => state.profile)
  // const { user } = useInitialState(getUser, 'profile')
  // const { user } = useInitialState(getUser, 'profile')
  return (
    <div className={styles.root}>
      <div className="profile">
        {/* 个人信息 */}
        <div className="user-info">
          <div className="avatar">
            <img src={userBasicInfo.photo} alt="" />
          </div>
          <div className="user-name">{userBasicInfo.name}</div>
          <Link to="/profile/edit">
            个人信息 <Icon name="icon-jiantou" />
          </Link>
        </div>

        {/* 今日阅读 */}
        <div className="read-info">
          <Icon name="icon-zuanshi" />
          今日阅读
          <span>10</span>
          分钟
        </div>

        {/* 动态 - 对应的这一行 */}
        <div className="count-list">
          <div className="count-item">
            <p>{userBasicInfo.art_count}</p>
            <p>动态</p>
          </div>
          <div className="count-item">
            <p>{userBasicInfo.follow_count}</p>
            <p>关注</p>
          </div>
          <div className="count-item">
            <p>{userBasicInfo.fans_count}</p>
            <p>粉丝</p>
          </div>
          <div className="count-item">
            <p>{userBasicInfo.like_count}</p>
            <p>被赞</p>
          </div>
        </div>

        {/* 消息通知 - 对应的这一行 */}
        <div className="user-links">
          <div className="link-item">
            <Icon name="icon-zhongyaotishi" />
            <div>消息通知</div>
          </div>
          <div className="link-item">
            <Icon name="icon-shangchuan1" />
            <div>收藏</div>
          </div>
          <div className="link-item">
            <Icon name="icon-wendangxiugai" />
            <div>浏览历史</div>
          </div>
          <div className="link-item">
            <Icon name="icon-wenjianjia" />
            <div>我的作品</div>
          </div>
        </div>
      </div>

      {/* 更多服务 */}
      <div className="more-service">
        <h3>更多服务</h3>
        <div className="service-list">
          <div className="service-item">
            <Icon name="icon-qun" />
            <div>用户反馈</div>
          </div>
          <div className="service-item" onClick={() => history.push("/chat")}>
            <Icon name="icon-hongbao" />
            <div>小智同学</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
