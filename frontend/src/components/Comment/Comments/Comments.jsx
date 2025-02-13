import './Comments.css';

import defaultpfp from '../../../assets/Default_pfp.jpg';
import DispatchCalls from '../../../StateManagement/dispatch';
import DisplayMessage from '../../Modals/DisplayMessage/DisplayMessage';

import { IoPaperPlane } from "react-icons/io5";

import { useModal } from '../../../context/modal';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Comments({ userId }) {
  const { setMessageContent, closeModal } = useModal();
  const { postId } = useParams();
  const dispatch = useDispatch();
  const dispatchCalls = new DispatchCalls(dispatch);
  const data = useSelector(state => state.posts.comments);
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const [text, setText] = useState('');
  const [activeText, setActiveText] = useState(false);
  const textAreaRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await dispatchCalls.comments(postId);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    }
    fetchData();
    const textArea = textAreaRef.current;

    if (textArea) {
      textArea.style.height = 'auto';  // Reset height before resizing
      textArea.style.height = `${textArea.scrollHeight}px`;  // Adjust height based on content
    }
  }, [text]);

  useEffect(() => {
    
  }, [data])
 
  const handleDelete = async (id) => {
    if (user.id === 'fffbd13b-428a-4d50-a03e-2f65c1f20b0a' && process.env.NODE_ENV === 'production') {
      alert('CREATE, UPDATE, and DELETE features have been disabled for the demo account.')
    }
    const response = confirm('Confirm Delete');
    if (response) {
      const response02 = await dispatchCalls.removeComment(id, postId);
      // setMessageContent(<DisplayMessage message={response02.message}/>)
      // alert(`${response02.message}`)
      setTimeout(async () => {
        const results = await dispatchCalls.comments(postId);
      }, 100);
    }
  }

  const handleSubmit = async (e) => {
    if (user.id === 'fffbd13b-428a-4d50-a03e-2f65c1f20b0a' && process.env.NODE_ENV === 'production') {
      alert('CREATE, UPDATE, and DELETE features have been disabled for the demo account.')
    }
    e.preventDefault();
    setText('');
    setActiveText();
    const data = {
      post_id: postId,
      text: text,
    };
    const complete = await dispatchCalls.createComment(data);
    const response = await dispatchCalls.comments(postId);
  }


  if (!data) return null;

  return (
    <div className='Comments-div'>
      <div className='Comments-box'>
        <img src={user.profilePhoto ? user.profilePhoto : defaultpfp} className='Comments-profilePhoto'/>
        {(!text && !activeText) && <label className='Comments-label' onClick={() => textAreaRef.current.focus()}>Add comment...</label>}
        <textarea id="dynamic-input" value={text} onChange={(e) => setText(e.target.value)} className='Comments-text_input' 
                  ref={textAreaRef} style={{resize: 'none', overflow: 'hidden' }} onFocus={() => setActiveText(true)} onBlur={() => setActiveText(false)}/>
        <div style={{display: 'flex', alignItems: 'flex-end'}}>
          <IoPaperPlane className='Comments-submit' onClick={(e) => handleSubmit(e)}/>  
        </div>        
      </div>
      {data.map((comment, index) => {
        return (
          <div className='Comments-box' key={comment.id}>
          <img src={comment.User.profilePhoto ? comment.User.profilePhoto : defaultpfp} 
               className='Comments-profilePhoto' onClick={() => navigate(`/profile/user/${comment.User.username}`)}/>
          <div className='Comments-box-column-2'>
            <p className='Comments-username' onClick={() => navigate(`/profile/user/${comment.User.username}`)}>{comment.User.username}</p>
            <p className='Comments-text'>{comment.comment}</p>
            <span style={{display: 'flex'}}>
              <p className='Comments-reply' onClick={() => alert('Feature Coming Soon...')}>Reply</p>
              {( userId === user.id || comment.userId === user.id) && <p className='Comments-reply' onClick={() => handleDelete(comment.id)}>delete</p>}
            </span>
          </div>
        </div>
        )
      })}
    </div>
  )
};