import { FaRegPlusSquare, FaUser} from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaInbox } from "react-icons/fa6";

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useModal } from '../../context/modal';

export default function Mobile() {
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
  

  return (
    <>
    <div className='Navigation-div'>
      <div className="Navigation-box" onClick={() => user ? navigate('/') : alert('You are not logged in')}>
        <IoHome className="Navigation-icon"/>
        <p className="Navigation-label">Home</p>
      </div>

      <div className="Navigation-box">
        <MdEvent className="Navigation-icon-1"/>
        <p className="Navigation-label">Events</p>
      </div>

      <div className='Navigation-upload_post' >
        <FaRegPlusSquare style={{fontSize: '25px'}} onClick={() => setModalContent(<CreatePost user={user}/>)}/>
      </div>

      <div className="Navigation-box" onClick={() => navigate('/messages')}>
        <FaInbox className="Navigation-icon"/>
        <p className="Navigation-label">Inbox</p>
      </div>

      <div className="Navigation-box" onClick={() => user ? navigate('/profile') : alert('You are not logged in')}>
        <FaUser className="Navigation-icon"/>
        <p className="Navigation-label">Profile</p>
      </div>
    </div>
    </>
  )
}