import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUsers, faComments, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import UserDropdown from './Dropdown/UserDropdown';
import Social from '../../StateManagement/social';
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
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    setActive({
      following: /^\/following(\/.*)?$/.test(activeUrl.pathname),
      explore: /^\/explore(\/.*)?$/.test(activeUrl.pathname),
      groups: /^\/groups(\/.*)?$/.test(activeUrl.pathname),
      messages: /^\/messages(\/.*)?$/.test(activeUrl.pathname),
    });
  }, [activeUrl])

  const displayRow3 = () => {
    if (width < 768) {
      return (
        <>
        <div className="Navigation-div-row">    
          <p className={active.following ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => user ? navigate('/following') : 
              alert('You are not logged in')}><FontAwesomeIcon icon={faUserFriends} className={active.following ? "Navigation-icon-active": 
              "Navigation-icon"} />{width > 767 && 'Explore'}</p>
        </div>
          <div className="Navigation-div-row">
            <p className={active.groups ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => user ? navigate('/groups') :
               alert('You are not logged in')}><FontAwesomeIcon icon={faUsers} className={active.groups ? "Navigation-icon-active":
               "Navigation-icon"} />{width > 767 && 'Groups'}</p>
          </div>
        </>
      )
    } else {
      return (
        <div className="Navigation-div-row">    
          <p className={active.following ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => user ? navigate('/following') : 
              alert('You are not logged in')}><FontAwesomeIcon icon={faUserFriends} className={active.following ? "Navigation-icon-active": 
              "Navigation-icon"} />{width > 767 && 'Following'}</p>

          <p className={active.groups ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => user ? navigate('/groups') : 
             alert('You are not logged in')}><FontAwesomeIcon icon={faUsers} className={active.groups ? "Navigation-icon-active": 
             "Navigation-icon"} />{width > 767 && 'Groups'}</p>
        </div>
      )
    }
  }

  if (!active) return null;

  return (
    <div className='Navigation-div'>
      <div className='Navigation-div-row Navigation-profile_box'>
        <img src={(user && user.profilePhoto) ? user.profilePhoto : defaultpfp} className="Navigation-profilePhoto" onClick={() => setUserDrop(!userDrop)}/>
        {/* <p className='Navigation-name'>{user.firstName}</p> */}
        {userDrop && <UserDropdown />}
      </div>
      <div className="Navigation-div-row">
        <p className={active.explore ? "Navigation-feed-active" : "Navigation-feed"} onClick={() => user ? navigate('/explore') : 
           alert('You are not logged in')}><FontAwesomeIcon icon={faGlobe} className={active.explore ? 
            "Navigation-icon-active": "Navigation-icon"}/>{width > 767 && 'Explore'}</p>
      </div>
      {displayRow3()}
      <div className="Navigation-div-row">
        <p className={active.messages ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => user ? navigate('/messages') : 
           alert('You are not logged in')}><FontAwesomeIcon icon={faComments} className={active.messages ? "Navigation-icon-active": 
           "Navigation-icon"} />{width > 767 && 'Messages'}</p>
      </div>
    </div>
  )
}