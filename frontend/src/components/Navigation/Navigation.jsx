import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUsers, faComments, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import UserDropdown from './Dropdown/UserDropdown';
import Social from '../../SocialClass/social';
import defaultpfp from '../../assets/Default_pfp.jpg';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import './Navigation.css'

export default function Navigation() {
  const user = useSelector(state => state.session.user);
  const navigate = useNavigate();
  const social = new Social();
  const activeUrl = useLocation();
  const [active, setActive] = useState();
  const [userDrop, setUserDrop] = useState(false);

  useEffect(() => {
    setActive({
      following: activeUrl.pathname === '/following',
      explore: activeUrl.pathname === '/explore',
      groups: activeUrl.pathname === '/groups',
      messages: activeUrl.pathname === '/messages',
    })
  }, [activeUrl])

  if (!active) return null;

  return (
    <div className='Navigation-div'>
      <div className='Navigation-div-row Navigation-profile_box'>
        <img src={(user && user.profilePhoto) ? social.convertImageToBase64(user.profilePhoto) : defaultpfp} className="Navigation-profilePhoto" onClick={() => setUserDrop(!userDrop)}/>
        {/* <p className='Navigation-name'>{user.firstName}</p> */}
        {userDrop && <UserDropdown />}
      </div>
      <div className="Navigation-div-row">
        <p className={active.explore ? "Navigation-feed-active" : "Navigation-feed"} onClick={() => user ? navigate('/explore') : 
           alert('You are not logged in')}><FontAwesomeIcon icon={faGlobe} className={active.explore ? "Navigation-icon-active": 
           "Navigation-icon"}/>Explore</p>
      </div>
      <div className="Navigation-div-row">    
        <p className={active.following ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => user ? navigate('/following') : 
            alert('You are not logged in')}><FontAwesomeIcon icon={faUserFriends} className={active.following ? "Navigation-icon-active": 
            "Navigation-icon"} />Following</p>

        <p className={active.groups ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => user ? navigate('/groups') : 
           alert('You are not logged in')}><FontAwesomeIcon icon={faUsers} className={active.groups ? "Navigation-icon-active": 
           "Navigation-icon"} />Groups</p>
      </div>
      <div className="Navigation-div-row">
        <p className={active.messages ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => user ? navigate('/messages') : 
           alert('You are not logged in')}><FontAwesomeIcon icon={faComments} className={active.messages ? "Navigation-icon-active": 
           "Navigation-icon"} />Messages</p>
      </div>
    </div>
  )
}