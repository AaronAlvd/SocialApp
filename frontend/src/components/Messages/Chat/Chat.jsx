import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowCircleUp } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";

import DispatchCalls from '../../../StateManagement/dispatch'

export default function Chat() {
  const params = useParams()
  const dispatch = useDispatch();
  const dispatchCall = new DispatchCalls(dispatch);
  const user = useSelector(state => state.session.user)
  const userProfile = useSelector(state => state.users.profile)
  const messages = useSelector(state => state.messages.messages)
  const textareaRef = useRef()
  const [text, setText] = useState("")
  const [height, setHeight] = useState(window.innerHeight)
  const [textareaHeight, setTextareaHeight] = useState(40)
  const [messageDropdown, setMessageDropdown] = useState('')
  const [reload, setReload] = useState(false)

  const textareaClass = `bg-gray-200 resize-none w-[95%] rounded-[20px] focus:outline-none px-[20px] py-[5px]`;
  const class01 = `bg-gray-200 resize-none w-[98%] rounded-[20px] flex items-center`;


  useEffect(() => {
    const fetch = async () => {
      const response = await dispatchCall.UserProfile(params.userId)
    }

    fetch()

  }, [])
  useEffect(() => {

    if (text !== "") {
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }

    if (text !== "" && textareaRef.current.scrollHeight > 40) {
      setTextareaHeight(textareaRef.current.scrollHeight)
    }

  }, [text])
  useEffect(() => {
    async function fetch() {
      const response = await dispatchCall.FetchMessages(userProfile.id)
    }

    fetch()
  }, [userProfile, reload])

  const handleInput = (e) => {
    setText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents new line
    }
  };
  const handleSubmit = async () => {
    const data = {
      content: text,
      userId: userProfile.id
    }
    const response = await dispatchCall.SendMessage(data)
    const response02 = await dispatchCall.FetchMessages(userProfile.id)
    setText("")
    return setReload(!reload)
  };
  const displayProfile = () => { 
    return (
      <div style={{height: 'min-content', paddingBottom: '10px'}}>
        <div className='pt-[30px] flex items-center flex-col'>
          <img src={userProfile.profilePhoto} className='rounded-[50%] w-[115px] h-[115px]'/>
          <p className='text-[20px] font-bold mt-[10px]'>{userProfile.username}</p>
          <div className='flex gap-[10px]'>
            <p>{dispatchCall.FormatNumbers(userProfile.followers)} followers</p>
            -
            <p>{dispatchCall.FormatNumbers(userProfile.posts)} posts</p>
          </div>
          <button className='mt-[15px] rounded-[10px] bg-[rgb(230,230,230)] h-[30px] w-[130px] font-bold text-[14px]'>
            View Profile
          </button>
        </div>
      </div>
    )
  };
  const handleMessageClick = (e, id) => {
    e.stopPropagation()

    if (!messageDropdown) {
      setMessageDropdown(id)
    } else if (messageDropdown === id) {
      setMessageDropdown(null)
    } else if (messageDropdown !== id) {
      setMessageDropdown(id)
    }
  };
  const handleDelete = async (id) => {
    const response = await dispatchCall.DeleteMessage(id)
  }

  if (!userProfile || !messages) return null;

  return (
    <div style={{height: `${height - 55}px`, overflow: 'scroll'}} onClick={() => setMessageDropdown(null)}>
      <div className='h-[45px] border-b-1 border-b-gray-200 flex items-center box-border'>
        <img src={userProfile.profilePhoto} className='rounded-[50%] w-[35px] h-[35px]'/>
        <div className='h-[45px] ml-[10px]'>
          <p className='text-[18px] font-bold h-[19px] mb-[3px]'>
            {userProfile.firstName} {userProfile.lastName}
          </p>
          <p className='text-[13px] h-[14px]'>
            {userProfile.username}
          </p>
        </div>
      </div>

      <div style={{height: `${height - 60 - 45 - 55}px`, overflow: 'scroll'}}>
        {displayProfile()}
        <div className='h-[280px] overflow-scroll'>
          {messages.map((data) => {
            if (data.User.id === user.id) {
              return (
                <div className='h-[min-content] flex justify-end px-[5px] items-center py-[5px] relative cursor-pointer'>
                  <p className='bg-[rgb(28,96,255)] w-[min-content] px-[15px] py-[3px] rounded-[10px] text-white whitespace-nowrap'
                     onClick={(e) => handleMessageClick(e, data.id)}>
                    {data.content}
                  </p>
                  {messageDropdown === data.id && <TbTrash className='text-red-500 mx-[5px]' onClick={() => handleDelete(data.id)}/>}
                </div>
              )
            } else {
              <div className='h-[minHeight] flex px-[10px]'>
                <p className='bg-gray-200 w-[min-content] px-[15px] py-[3px] rounded-[10px]'>{data.content}</p>
              </div>
            }
          })}
        </div>
      </div>

      <div className='flex items-center justify-center' style={{height: `${textareaHeight + 20}px`, minHeight: '60px'}}>
        <div className={class01} style={{height: `${textareaHeight}px`, minHeight: '40px'}}>
          <textarea className={textareaClass} ref={textareaRef} onChange={handleInput} value={text} rows="1" onKeyDown={handleKeyDown}>
          </textarea>
          {text !== "" && <FaArrowCircleUp className="text-[25px] ml-[10px]" onClick={() => handleSubmit()}/>}
        </div>
      </div>
    </div>
  )
}