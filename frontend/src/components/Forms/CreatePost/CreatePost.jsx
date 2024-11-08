import { useSelector } from 'react-redux';
import Social from '../../../SocialClass/social';
import { useState, useEffect } from 'react';
import './CreatePost.css';

export default function CreatePost() {
  const user = useSelector(state => state.session.user);
  const social = new Social();
  const [width, setWidth] = useState(window.innerWidth - 201);

  useEffect(() => {

    document.addEventListener('resize', () => {
      setWidth(window.innerWidth - 201);
    });

  }, [])
  
  return (
    <div className='CreatePost-div' style={{ width: width}}>
      <p className='CreatePost-name'>{user ? user.firstName : null} {user ? user.lastName : null}</p>
      <p><small>@{user ? user.username : null}</small></p>
      <form className='CreatePost-form'>
        <textarea className='CreatePost-textarea' placeholder='tell us whats on your mind...' />
      </form>
    </div>
  )
}