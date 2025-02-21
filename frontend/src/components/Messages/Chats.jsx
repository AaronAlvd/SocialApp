import { FaRegPenToSquare } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useModal } from '../../context/modal';

import DispatchCalls from '../../StateManagement/dispatch';
import defaultpfp from '../../assets/Default_pfp.jpg';
import CreateChat from './createChat/createChat';

import './Chats.css';

export default function Chats() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchCalls = new DispatchCalls(dispatch);
  const user = useSelector(state => state.session.user);
  const chats = useSelector((state) => state.messages.chats);
  const following = useSelector((state) => state.users.following);
  const { setModalContent } = useModal();

  useEffect(() => {
    async function fetch() {
      const response = await dispatchCalls.chats();
      const response02 = await dispatchCalls.following();
    };

    fetch()

  }, [dispatch]);

  if (!chats) return null;

  const formatChats = () => {
    const retVal = new Array(chats.length);

    for (let i = 0; i < chats.length; i++) {
      const data = chats[i];
      const altUser = (data.User1.id === user.id) ? data.User2 : data.User1
      retVal[i] = (
        <div className='Chats-section' key={data.id} onClick={() => navigate(`/messages/${altUser.id}`)}>
          {altUser.profilePhoto ? <img src={altUser.profilePhoto} className="Chats-profilePhoto"/> : 
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
      <div>
        <h4>Suggested</h4>
        <div className='Chats-div_suggested'>
          
        </div>
      </div>
    </div>
  )
}