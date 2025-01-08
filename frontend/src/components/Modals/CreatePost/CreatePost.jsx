import './CreatePost.css';
import DispatchCalls from '../../../SocialClass/dispatch';
import defaultpfp from '../../../assets/Default_pfp.jpg';
import { useState, useRef, useEffect } from 'react';
import { FaImage } from "react-icons/fa6";
import { MdVideoLibrary } from "react-icons/md";

export default function CreatePost({ user }) {
  const dispatchCalls = new DispatchCalls();
  const [text, setText] = useState('');
  const [activeText, setActiveText] = useState(false);
  const textareaRef = useRef(null);
  const uploadImgRef = useRef(null);
  const [imgFile, setImgFile] = useState();
  const [vidFile, setVidFile] = useState();
  const uploadVidRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    setActiveText(text !== '')

    const textarea = textareaRef.current;

    if (textarea && imgFile) {
      textarea.style.height = 'auto';  // Reset height before resizing
      textarea.style.height = `${textarea.scrollHeight}px`;  // Adjust height based on content
    }
  }, [text])

  return(
    <div className='CreatePost-div'>
      <div className='CreatePost-header'>
        <img src={user.profilePhoto ? dispatchCalls.convertImageToBase64(user.profilePhoto) : defaultpfp} 
             className='CreatePost-profilePhoto'/>
        <span>
          <p className='CreatePost-name'>{user.firstName} {user.lastName}</p>
          <p className='CreatePost-username'>@{user.username}</p>
        </span>
      </div>
      <div className='CreatePost-body'>
        <textarea className={(imgFile || vidFile) ? 'CreatePost-textarea-small' : 'CreatePost-textarea'} value={text} 
                  onChange={(e) => setText(e.target.value)} ref={textareaRef} onFocus={() => setActiveText(true)} 
                  onBlur={() => text === '' && setActiveText(false)} placeholder='Share your thoughts...'/>

        {imgFile && <img src={imgFile} className='CreatePost-img'/>}
      </div>
      <hr/>
      <div className='CreatePost-footer'>
          <span style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => uploadImgRef.current.click()}>
            <input type="file" style={{display: 'none'}} ref={uploadImgRef} accept="image/*" name='image' onChange={(e) => handleFile(e)}/>
            <FaImage style={{fontSize: '18px'}}/>
            <label style={{marginLeft: '5px', fontWeight: '400', cursor: 'pointer'}}>Photo</label>
          </span>
          <span style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => uploadVidRef.current.click()}>
            <input type="file" style={{display: 'none'}} ref={uploadVidRef} accept="video/*" name='video' onChange={(e) => handleFile(e)}/>
            <MdVideoLibrary style={{fontSize: '18px'}}/>
            <label style={{marginLeft: '5px', fontWeight: '400', cursor: 'pointer'}}>Video</label>
          </span>
          <button className={(text !== '' || imgFile) ? 'CreatePost-buttonActive' : 'CreatePost-button'} 
                  disabled={text === '' && !imgFile} onClick={(e) => handleSubmitPost(e)}>Post</button>
      </div>
    </div>
  )
}