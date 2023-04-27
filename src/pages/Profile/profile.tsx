// import styles from './index.module.scss'
import Icon from 'src/components/Icon'
import styles from './profile.module.scss'

const Profile = () => {
  return( 
  <div className={styles.root}>
    <div className='profile-header'>
      <div className='profile-header-left'>
        <img src="./cat.jpg" alt="" />
      </div>
      <div className='profile-header-middle'>19846125129</div>
      <div className='profile-header-right'>
        <span>个人信息</span>
        <span><Icon name='icon-jiantou'></Icon></span>
      </div>
    </div>
    <div className='profile-main-number'></div>
    <div className='profile-main-message'></div>
    <div className='profile-more'></div>
  </div>)
}

export default Profile
