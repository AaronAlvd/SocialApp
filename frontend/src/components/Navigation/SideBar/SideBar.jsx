import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUsers, faHome } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import './SideBar.css'

export default function SideBar() {
  const navigate = useNavigate();
  const activeUrl = useLocation();
  const [active, setActive] = useState({
    following: activeUrl.pathname === '/socialfeed',
    explore: activeUrl.pathname === '/explore',
  });

  useEffect(() => {
    setActive({
      following: activeUrl.pathname === '/socialfeed',
      explore: activeUrl.pathname === '/explore',
    })

  }, [activeUrl])

  return (
    <div className='SideBar-div'>
      <div className="SideBar-div-row">
        <p className="SideBar-feed"><FontAwesomeIcon icon={faHome} className='SideBar-icon'/>Home</p>
      </div>
      <div className="SideBar-div-row">
        <p className={active.explore ? "SideBar-feed-active" : "SideBar-feed"} onClick={() => navigate('/explore')}><FontAwesomeIcon icon={faGlobe} 
           className={active.explore ? "SideBar-icon-active": "SideBar-icon"}/>Explore</p>
           
        <p className={active.following ? "SideBar-feed-active" : "SideBar-feed"}  onClick={() => navigate('/socialfeed')}><FontAwesomeIcon icon={faUsers} 
           className={active.following ? "SideBar-icon-active": "SideBar-icon"} />Following</p>
      </div>
    </div>
  )
}