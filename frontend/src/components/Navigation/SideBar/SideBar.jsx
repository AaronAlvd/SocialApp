import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUsers, faHome } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import './SideBar.css'

export default function SideBar() {
  const user = useSelector(state => state.session.user);
  const navigate = useNavigate();
  const activeUrl = useLocation();
  const [active, setActive] = useState({
    following: activeUrl.pathname === '/following',
    explore: activeUrl.pathname === '/explore',
  });

  useEffect(() => {
    setActive({
      following: activeUrl.pathname === '/following',
      explore: activeUrl.pathname === '/explore',
    })

  }, [activeUrl])

  return (
    <div className='SideBar-div'>
      <div className="SideBar-div-row">
        <p className="SideBar-feed" onClick={() => navigate('/')}><FontAwesomeIcon icon={faHome} className='SideBar-icon'/>Home</p>
      </div>
      <div className="SideBar-div-row">
        <p className={active.explore ? "SideBar-feed-active" : "SideBar-feed"} onClick={() => user ? navigate('/explore') : alert('You are not logged in')}><FontAwesomeIcon icon={faGlobe} 
           className={active.explore ? "SideBar-icon-active": "SideBar-icon"}/>Explore</p>
           
        <p className={active.following ? "SideBar-feed-active" : "SideBar-feed"}  onClick={() => user ? navigate('/following') : alert('You are not logged in')}><FontAwesomeIcon icon={faUsers} 
           className={active.following ? "SideBar-icon-active": "SideBar-icon"} />Following</p>
      </div>
    </div>
  )
}