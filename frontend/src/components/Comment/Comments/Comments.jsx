import './Comments.css';
import defaultpfp from '../../../assets/Default_pfp.jpg';
import DispatchCalls from '../../../StateManagement/dispatch';
import { IoPaperPlane } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useModal } from '../../../context/modal';

export default function Comments({ userId }) {
  // const { setModalContent } = useModal();
  const { postId } = useParams();
  const dispatch = useDispatch();
  const dispatchCalls = new DispatchCalls(dispatch);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const [text, setText] = useState('');
  const [activeText, setActiveText] = useState(false);
  const [reload, setReload] = useState(false);
  const textAreaRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await dispatchCalls.comments(postId);
        console.log(response);
        setData(response);  // Assuming setData is properly defined
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
  }, [text, reload]);
 
  const handleDelete = async (id) => {
    const response = confirm('Confirm Delete');
    if (response) {
      const complete = dispatchCalls.removeComment(id);
      const results = await dispatchCalls.comments(postId);
      setData(results);
    }
  }

  const handleSubmit = async () => {
    const data = {
      post_id: postId,
      text: text,
    };
    const complete = await dispatchCalls.createComment(data)
    const results = await dispatchCalls.comments(postId);
    setData(results);
  }

  const displayComments = () => {
    const retArr = Array(data.length);

    for (let i = 0; i < data.length; i++) {
      const comment = data[i];
      retArr[i] = (
        <div className='Comments-box'>
          <img src={comment.User.profilePhoto ? comment.User.profilePhoto : defaultpfp} 
               className='Comments-profilePhoto' onClick={() => navigate(`/profile/${comment.User.username}`)}/>
          <div className='Comments-box-column-2'>
            <p className='Comments-username' onClick={() => navigate(`/profile/${comment.User.username}`)}>{comment.User.username}</p>
            <p className='Comments-text'>{comment.comment}</p>
            <span style={{display: 'flex'}}>
              <p className='Comments-reply'>Reply</p>
              {( userId === user.id || comment.userId === user.id) && <p className='Comments-reply' onClick={() => handleDelete(comment.id)}>delete</p>}
            </span>
          </div>
        </div>
      )

    }
    return retArr;
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
          <IoPaperPlane className='Comments-submit' onClick={() => handleSubmit()}/>  
        </div>        
      </div>
      {displayComments()}
    </div>
  )
};