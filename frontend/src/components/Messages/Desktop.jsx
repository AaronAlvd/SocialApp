import { FaRegPenToSquare } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useModal } from '../../context/modal';

import DispatchCalls from '../../StateManagement/dispatch';
import defaultpfp from '../../assets/Default_pfp.jpg';
import CreateChat from './createChat/createChat';
import Chat from './Chat/Chat';

import './Chats.css';

export default function Desktop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchCalls = new DispatchCalls(dispatch);
  const user = useSelector(state => state.session.user);
  const chats = useSelector((state) => state.messages.chats);
  const following = useSelector((state) => state.users.following);
  const [height, setHeight] = useState(window.innerHeight);
  const [activeChat, setActiveChat] = useState(null);
  const { setModalContent } = useModal();

  useEffect(() => {
    async function fetch() {
      const response = await dispatchCalls.chats();
      const response02 = await dispatchCalls.following();
    };

    fetch()

  }, [dispatch]);

  if (!chats) return null;


  
  return (
    <div className='Chats-div' style={{height: `${height - 50}px`}}>

    <div className="flex">
      <div className="w-[350px] overflow-scroll" style={{height: `${height - 50}px`}}>
        <div className='h-[44px] flex items-center justify-end'>
          <FaRegPenToSquare className='text-[20px] mr-[5px]' onClick={() => setModalContent(<CreateChat data={[following, chats]}/>)}/>
        </div>
      {chats.map((data) => {
        if (data.Messages.length === 0) return null;
        const altUser = data.User1.id === user.id ? data.User2 : data.User1

        if (activeChat === altUser.id) {
          return (
            <div className="h-[80px] flex items-center px-[5px] box-border bg-gray-200" 
              onClick={() => {
                setActiveChat(altUser.id)
                navigate(`/messages/${altUser.username}`)
              }}
            >
              <img src={altUser.profilePhoto}
                className="w-[45px] h-[45px] rounded-[50%]"
              />
             <div className="h-[55px]">
               <p className="ml-[5px] font-bold text-[16px]">
                 {altUser.firstName} {altUser.lastName}
               </p>
               <p className="ml-[5px] text-[14px] whitespace-nowrap">
                 {dispatchCalls.FormatMessages(data.Messages[0].content)}
               </p>
             </div>
            </div>
          )
        }
        return (
          <div className="h-[80px] flex items-center px-[5px] box-border" 
            onClick={() => {
              setActiveChat(altUser.id)
              navigate(`/messages/${altUser.username}`)
            }}
          >
            <img src={altUser.profilePhoto}
              className="w-[45px] h-[45px] rounded-[50%]"
            />
            <div className="h-[55px]">
              <p className="ml-[5px] font-bold text-[16px]">
                {altUser.firstName} {altUser.lastName}
              </p>
              <p className="ml-[5px] text-[14px] whitespace-nowrap">
                {dispatchCalls.FormatMessages(data.Messages[0].content)}
              </p>
            </div>
          </div>
        )
      })}
      </div>

      <div className="w-[100%]">
        {activeChat && <Chat />}
      </div>
    </div>
    </div>
  )
}