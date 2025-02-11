import Header from './Header/Header.jsx';
import Social from '../../StateManagement/social.jsx';
import CreatePost from '../Modals/CreatePost/CreatePost.jsx';
import DisplayMessage from '../Modals/DisplayMessage/DisplayMessage.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUsers, faComments, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import { IoMdTrendingUp } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaRegPlusSquare } from "react-icons/fa";

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useModal } from '../../context/modal';

import './Navigation.css';

export default function Navigation() {
  const { setModalContent, setMessageContent, closeModal } = useModal();
  const user = useSelector(state => state.session.user);
  const navigate = useNavigate();
  const social = new Social();
  const activeUrl = useLocation();
  const [active, setActive] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Define the resize handler
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    // Add event listener on component mount
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  useEffect(() => {
    setActive({
      following: /^\/following(\/.*)?$/.test(activeUrl.pathname),
      explore: /^\/explore(\/.*)?$/.test(activeUrl.pathname),
      groups: /^\/groups(\/.*)?$/.test(activeUrl.pathname),
      messages: /^\/messages(\/.*)?$/.test(activeUrl.pathname),
      trending: /^\/trending(\/.*)?$/.test(activeUrl.pathname),
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
            <p className={active.groups ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => alert('Feature Coming Soon...')}>
              <FontAwesomeIcon icon={faUsers} className={active.groups ? "Navigation-icon-active":
               "Navigation-icon"} />{width > 767 && 'Groups'}</p>
          </div>
        </>
      )
    } else {
      return (
        <div className="Navigation-div-row">    
          <p className={active.following ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => user ? navigate('/following') : 
              alert('You are not logged in')}><FontAwesomeIcon icon={faUserFriends} className={active.following ? "Navigation-icon-active": 
              "Navigation-icon"}/>{width > 767 && 'Following'}</p>

          <p className={active.groups ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => alert('Feature Coming Soon...')}>
            <FontAwesomeIcon icon={faUsers} className={active.groups ? "Navigation-icon-active": 
             "Navigation-icon"} />{width > 767 && 'Groups'}</p>
        </div>
      )
    }
  }

  const displayRow5 = () => {
    return (
      <div className="Navigation-div-row">
        <p className={active.trending ? "Navigation-feed-active" : "Navigation-feed"} onClick={() => alert('Feature Coming Soon...')}>
          <IoMdTrendingUp className='Navigation-icon'/>Trending</p>
      </div>
    )
  }

  if (!active) return null;

  if (width < 1040) return (
    <>
    <div className='Navigation-div'>
        <p className={active.explore ? "Navigation-feed-active" : "Navigation-feed"} onClick={() => user ? navigate('/explore') : 
           alert('You are not logged in')}><FontAwesomeIcon icon={faGlobe} className={active.explore ? 
            "Navigation-icon-active": "Navigation-icon"}/>{width > 767 && 'Explore'}</p>

        <p className={active.following ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => user ? navigate('/following') : 
           alert('You are not logged in.')}><FontAwesomeIcon icon={faUserFriends} className={active.following ? "Navigation-icon-active": 
          "Navigation-icon"}/>{width > 767 && 'Following'}</p>

        <div className='Navigation-upload_post' >
          <FaRegPlusSquare style={{fontSize: '25px'}} onClick={() => setModalContent(<CreatePost user={user}/>)}/>
        </div>

        <p className={active.groups ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => alert('Feature Coming Soon...')}>
          <FontAwesomeIcon icon={faUsers} className={active.groups ? "Navigation-icon-active" : "Navigation-icon"} />{width > 767 && 'Groups'}</p>

        <p className={active.messages ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => navigate('/messages')}><FontAwesomeIcon icon={faComments} className={active.messages ? "Navigation-icon-active": 
           "Navigation-icon"} />{width > 767 && 'Messages'}</p>
      </div>
    </>
  )

  return (
    <>
    <Header />
    <div className='Navigation-div' style={{height: `${height - 60}px`}}>
      <div className="Navigation-div-row">
        <p className={active.explore ? "Navigation-feed-active" : "Navigation-feed"} onClick={() => user ? navigate('/explore') : 
           alert('You are not logged in')}><FontAwesomeIcon icon={faGlobe} className={active.explore ? 
            "Navigation-icon-active": "Navigation-icon"}/>{width > 767 && 'Explore'}</p>
      </div>
      {displayRow3()}
      <div className="Navigation-div-row">
        <p className={active.messages ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => navigate('/messages')}>
          <FontAwesomeIcon icon={faComments} className={active.messages ? "Navigation-icon-active": 
           "Navigation-icon"} />{width > 767 && 'Messages'}</p>
      </div>
      {displayRow5()}
    </div>
    <span className='Create-Post' style={{transform: `translate(${width - 45}px, ${height - 105}px)`}} 
          onClick={() => setModalContent(<CreatePost user={user}/>)}>
      <FaPlus/>
    </span>
    </>
  )
}