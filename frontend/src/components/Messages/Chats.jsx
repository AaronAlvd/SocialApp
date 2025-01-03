import DispatchCalls from '../../SocialClass/dispatch';
import { FaRegPenToSquare } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import './Chats.css';

export default function Chats() {
  const dispatch = useDispatch();
  const dispatchCalls = new DispatchCalls(dispatch);
  const user = useSelector(state => state.session.user);
  const chats = useSelector((state) => state.messages.chats);
  const [width, setWidth] = useState(window.innerWidth - 201);

  useEffect(() => {
    dispatchCalls.chats();

    const handleResize = () => {
      setWidth(window.innerWidth - 61); // Update height on window resize
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [dispatch]);

  if (!chats) return null;

  const formatChats = () => {
    const retVal = new Array(chats.length);

    for (let i = 0; i < chats.length; i++) {
      const data = chats[i];
      const altUser = (data.User1.id === user.id) ? data.User2 : data.User1
      retVal[i] = (
        <div className='Chats-section'>
          {altUser.profilePhoto ? <img src={dispatchCalls.convertImageToBase64(altUser.profilePhoto)} className="Chats-profilePhoto"/> : 
                                  <FontAwesomeIcon icon={faUserCircle}/>}
          <div className='Chats-column2'>
            <p className='Chats-name'>{altUser.firstName} {altUser.lastName}</p>
            <p className='Chats-text'>{data.Messages[0].content}</p>
          </div>
        </div>
      )
    }
    return retVal;
  }
  return (
    <div className='Chats-div' style={{width: width}}>
      <div className='Chats-section1'>
        <h2>Messages</h2>
        <FaRegPenToSquare className='Chats-icon'/>
      </div>
      {formatChats()}
    </div>
  )
}