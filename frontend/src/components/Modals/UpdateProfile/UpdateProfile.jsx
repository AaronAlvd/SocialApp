import './UpdateProfile.css'

import defaultpfp from '../../../assets/Default_pfp.jpg';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const textareaRef = useRef();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUsername(user.username);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"; // Set new height
    }
  }, [bio]);

  if (!user) return null;

  return (
    <div className='UpdateProfile'>
      <div className='UpdateProfile-div_photo'>
        <img src={user.profilePhoto ? user.profilePhoto : defaultpfp} className='UpdateProfile-photo'/>
      </div>
      <form className='UpdateProfile-form'>
        <div className='UpdateProfile-div_input'>
          <label className='UpdateProfile-label'>First Name</label>
          <input type="text" className='UpdateProfile-input' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </div>

        <div className='UpdateProfile-div_input'>
          <label className='UpdateProfile-label'>Last Name</label>
          <input type="text" className='UpdateProfile-input' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </div>

        <div className='UpdateProfile-div_input'>
          <label className='UpdateProfile-label'>Username</label>
          <input type="text" className='UpdateProfile-input' value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>

        <div className='UpdateProfile-div_input'>
          <label className='UpdateProfile-label'>Email</label>
          <input type="text" className='UpdateProfile-input' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className='UpdateProfile-div_input'>
          <label className='UpdateProfile-label'>Bio</label>
          <textarea value={bio} className='UpdateProfile-bio' ref={textareaRef} onChange={(e) => setBio(e.target.value)}/>
        </div>

        <div>
          <button className='UpdateProfile-button'>Save</button>
        </div>
      </form>
    </div>
  )
}