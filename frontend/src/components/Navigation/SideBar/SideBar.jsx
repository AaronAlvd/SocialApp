import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUsers, faComments, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import './SideBar.css'

export default function SideBar() {
  const user = useSelector(state => state.session.user);
  const navigate = useNavigate();
  const activeUrl = useLocation();
  const [active, setActive] = useState();

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
    <div className='SideBar-div'>
      <div className="SideBar-div-row">
        <p className={active.explore ? "SideBar-feed-active" : "SideBar-feed"} onClick={() => user ? navigate('/explore') : 
           alert('You are not logged in')}><FontAwesomeIcon icon={faGlobe} className={active.explore ? "SideBar-icon-active": 
           "SideBar-icon"}/>Explore</p>
      </div>

      <div className="SideBar-div-row">    
        <p className={active.following ? "SideBar-feed-active" : "SideBar-feed"}  onClick={() => user ? navigate('/following') : 
            alert('You are not logged in')}><FontAwesomeIcon icon={faUserFriends} className={active.following ? "SideBar-icon-active": 
            "SideBar-icon"} />Following</p>

        <p className={active.groups ? "SideBar-feed-active" : "SideBar-feed"}  onClick={() => user ? navigate('/groups') : 
           alert('You are not logged in')}><FontAwesomeIcon icon={faUsers} className={active.groups ? "SideBar-icon-active": 
           "SideBar-icon"} />Groups</p>
      </div>
      <div className="SideBar-div-row">
        <p className={active.messages ? "SideBar-feed-active" : "SideBar-feed"}  onClick={() => user ? navigate('/messages') : 
           alert('You are not logged in')}><FontAwesomeIcon icon={faComments} className={active.messages ? "SideBar-icon-active": 
           "SideBar-icon"} />Messages</p>
      </div>
    </div>
  )
}