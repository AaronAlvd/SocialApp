import DispatchCalls from '../../SocialClass/dispatch';
import { FaRegPenToSquare } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useModal } from '../../context/modal';
import defaultpfp from '../../assets/Default_pfp.jpg';
import CreateChat from './createChat/createChat';
import './Chats.css';

export default function Chats() {
  const dispatch = useDispatch();
  const dispatchCalls = new DispatchCalls(dispatch);
  const user = useSelector(state => state.session.user);
  const chats = useSelector((state) => state.messages.chats);
  const following = useSelector((state) => state.users.following);
  const { setModalContent } = useModal();
  const [width, setWidth] = useState(window.innerWidth - 201);

  useEffect(() => {
    dispatchCalls.chats();
    dispatchCalls.following();

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
                                  <img src={defaultpfp} className="Chats-profilePhoto"/>}
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
    <div className='Chats-div'>
      <div className='Chats-section1'>
        <h2>Messages</h2>
        <FaRegPenToSquare className='Chats-icon' onClick={() => setModalContent(<CreateChat data={[following, chats]}/>)}/>
      </div>
      {formatChats()}
    </div>
  )
}