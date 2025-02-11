import './CreatePost.css';
import DispatchCalls from '../../../StateManagement/dispatch';
import defaultpfp from '../../../assets/Default_pfp.jpg';
import { useModal } from '../../../context/modal';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { FaImage } from "react-icons/fa6";
import { MdVideoLibrary } from "react-icons/md";

export default function CreatePost({ user, event = null}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const dispatchCalls = new DispatchCalls(dispatch);
  const textareaRef = useRef(null);
  const uploadImgRef = useRef(null);
  const uploadVidRef = useRef(null);
  const [text, setText] = useState('');
  const [activeText, setActiveText] = useState();
  const [groups, setGroups] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [file, setFile] = useState();
  const [imgFile, setImgFile] = useState();
  const [vidFile, setVidFile] = useState();
  const [activeInfo, setActiveInfo] = useState({
    userId: user.id,
    name: user.firstName + ' ' + user.lastName,
    profilePhoto: user.profilePhoto,
    groupId: 'default'
  });

  useEffect(() => {
    async function fetch() {
      const response = await dispatchCalls.UserGroups();
      setGroups(response);
    }

    fetch()

    if (event) {
      handleFile(event)
    }

  }, [])

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const changeSubmit = (data, type) => {
    if (type === 'group') {
      setActiveInfo({
        userId: user.id,
        name: data.Group.groupName,
        profilePhoto: data.Group.profilePhoto,
        groupId: data.Group.id,
      })
    } else {
      setActiveInfo({
        id: user.id,
        name: user.firstName + ' ' + user.lastName,
        profilePhoto: user.profilePhoto,
        groupId: 'default',
      })
    }
    console.log(activeInfo)
  }

  const displayGroups = () => {
    if (groups.length === 0) return null;

    const array = Array(groups.length);
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i]
      if (activeInfo.groupId === group.Group.id) {
        array[i] = (
          <div className='group_row'>
            <img src={user.profilePhoto ? user.profilePhoto : defaultpfp } 
                 className='CreatePost-groupProfilePhoto' onClick={() => changeSubmit(null, 'user')}/>
            <p className='CreatePost-groupName' onClick={() => changeSubmit(null, 'user')}>{user.username}</p>
          </div>
        )
      } else {
        array[i] = (
          <div className='group_row'>
            <img src={group.Group.profilePhoto ? group.Group.profilePhoto : defaultpfp } 
                 className='CreatePost-groupProfilePhoto' onClick={() => changeSubmit(group, 'group')}/>
            <p className='CreatePost-groupName' onClick={() => changeSubmit(group, 'group')}>{group.Group.groupName}</p>
          </div>
        )
      }
      
    }
    return array;
  }

  const handleSubmitPost = async () => {
    const data = {
      caption: text || null,
      photo: file || null,
      groupId: activeInfo.groupId || 'default',
    }
    
    const response = await dispatchCalls.newPost(data);
    closeModal();
    alert(response.message);
    window.location.reload();
  }

  useEffect(() => {
    setActiveText(text !== '')

    const textarea = textareaRef.current;

    if (textarea && imgFile) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text])

  if (!groups) return null;

  return(
    <div className='CreatePost-div'>
      <div className='CreatePost-header'>
        <img src={activeInfo.profilePhoto ? activeInfo.profilePhoto : defaultpfp} 
             className='CreatePost-profilePhoto'/>
        <span>
          <p className='CreatePost-name'>{activeInfo.name}</p>
          {groups.length > 0 && (dropdown ? <IoIosArrowUp onClick={() => setDropdown(!dropdown)}/> : <IoIosArrowDown onClick={() => setDropdown(!dropdown)}/>)}
          <p className='CreatePost-username'>@{user.username}</p>
        </span>
        <div className='CreatePost-groups'>
          {dropdown && displayGroups()}
        </div>
      </div>
      <div className='CreatePost-body'>
        <textarea className={(imgFile || vidFile) ? 'CreatePost-textarea-small' : 'CreatePost-textarea'} value={text} 
                  onChange={(e) => setText(e.target.value)} ref={textareaRef} onFocus={() => setActiveText(true)} 
                  onBlur={() => text === '' && setActiveText(false)} placeholder='Share your thoughts...'/>

        {imgFile && <img src={imgFile} className='CreatePost-img'/>}
      </div>
      <hr/>
      <div className='CreatePost-footer'>
          <span style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => alert('Feature Coming Soon..')}>
            <input type="file" style={{display: 'none'}} ref={uploadImgRef} accept="image/*" name='image' onChange={(e) => handleFile(e)}/>
            <FaImage style={{fontSize: '18px'}}/>
            <label style={{marginLeft: '5px', fontWeight: '400', cursor: 'pointer'}}>Photo</label>
          </span>
          <span style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => alert('Feature Coming Soon..')}>
            <input type="file" style={{display: 'none'}} ref={uploadVidRef} accept="video/*" name='video' onChange={(e) => handleFile(e)}/>
            <MdVideoLibrary style={{fontSize: '18px'}}/>
            <label style={{marginLeft: '5px', fontWeight: '400', cursor: 'pointer'}}>Video</label>
          </span>
          <button className={(text !== '' || imgFile) ? 'CreatePost-buttonActive' : 'CreatePost-button'} 
                  disabled={text === '' && !imgFile} onClick={() => handleSubmitPost()}>Post</button>
      </div>
    </div>
  )
}