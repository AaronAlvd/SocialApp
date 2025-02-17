import { FaGlobe, FaUserFriends, FaRegCalendarAlt, FaPlus } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useModal } from '../../context/modal';

import Header from "./Header/Header";

export default function Desktop() {
  const { setModalContent, setMessageContent, closeModal } = useModal();
  const navigate = useNavigate();
  const activeUrl = useLocation();
  const user = useSelector(state => state.session.user);
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

  if (!active) return null

  return (
    <>
    <Header />
    <div className='Navigation-div' style={{height: `${height - 60}px`}}>
      <div className="Navigation-div-row">
        <p className={active.explore ? "Navigation-feed-active" : "Navigation-feed"} onClick={() => user ? navigate('/explore') : 
           alert('You are not logged in')}><FaGlobe className={active.explore ? 
            "Navigation-icon-active": "Navigation-icon"}/>{width > 767 && 'Explore'}</p>
      </div>

      <div className="Navigation-div-row">    
        <p className={active.following ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => user ? navigate('/following') : 
            alert('You are not logged in')}><FaUserFriends className={active.following ? "Navigation-icon-active": 
            "Navigation-icon"}/>
          {width > 767 && 'Following'}
        </p>
        <p className={active.groups ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => alert('Feature Coming Soon...')}>
          <FaRegCalendarAlt className={active.groups ? "Navigation-icon-active": "Navigation-icon"} />
          {width > 767 && 'Events'}
        </p>
      </div>

      <div className="Navigation-div-row">
        <p className={active.messages ? "Navigation-feed-active" : "Navigation-feed"}  onClick={() => navigate('/messages')}>
          <AiOutlineMessage className={active.messages ? "Navigation-icon-active": "Navigation-icon"} />
          {width > 767 && 'Messages'}
        </p>
      </div>

      <div className="Navigation-div-row">
        <p className={active.trending ? "Navigation-feed-active" : "Navigation-feed"} onClick={() => alert('Feature Coming Soon...')}>
          <FaArrowTrendUp className='Navigation-icon'/>Trending
        </p>
      </div>
    </div>

    <span className='Create-Post' style={{transform: `translate(${width - 45}px, ${height - 105}px)`}} 
          onClick={() => setModalContent(<CreatePost user={user}/>)}>
      <FaPlus/>
    </span>
    </>
  )
}