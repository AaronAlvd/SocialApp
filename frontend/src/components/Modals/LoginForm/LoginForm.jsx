import './LoginForm.css'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';
import { useModal } from '../../../context/modal';

export default function LoginForm() {
  const [ credential, setCredential ] = useState('');
  const [ password, setPassword ] = useState('');
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    return dispatch(sessionActions.login(credential, password))
    .then(() => {
      closeModal
      // window.location.reload()
    })
    .catch(() => {

    })
  };

  return (
    <div className="LoginForm-div">
      <h2 className='LoginForm-title'>Login</h2>
      <form className="LoginForm-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="LoginForm-div-formInput">
          <label className='LoginForm-label'>Username</label>
          <input type="text" className='LoginForm-input' name="username" value={credential} onChange={(e) => setCredential(e.target.value)}/>
        </div>
        <div className="LoginForm-div-formInput">
          <label className='LoginForm-label'>Password</label>
          <input type="text" className='LoginForm-input' name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <small className='LoginForm-small'>Forgot Password?</small>
        </div>
        <div className="LoginForm-div-formButton">
          <button className="LoginForm-button">Login</button>
        </div>
      </form>
    </div>
  )
}
