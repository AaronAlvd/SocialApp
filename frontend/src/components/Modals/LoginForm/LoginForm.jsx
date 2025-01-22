import './LoginForm.css'
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';
import { useModal } from '../../../context/modal';

export default function LoginForm() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [credential, setCredential ] = useState('');
  const [password, setPassword ] = useState('');
  const [isActive01, setIsActive01 ] = useState(false);
  const [isActive02, setIsActive02 ] = useState(false);
  const credentialRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    return dispatch(sessionActions.login(credential, password))
    .then(() => {
      closeModal
      window.location.reload();
    })
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();

    return dispatch(sessionActions.login('EvaJohns9515', 'password'))
    .then(() => {
      closeModal
      window.location.reload();
    })
  }

  return (
    <div className="LoginForm-div">
      <h2 className='LoginForm-title'>Login</h2>
      <form className="LoginForm-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="LoginForm-div-formInput">
          <FontAwesomeIcon icon={faUserCircle} className='LoginForm-icon'/>
          <label className={ isActive01 ? 'LoginForm-label-active' : 'LoginForm-label'} onClick={() => credentialRef.current.focus()}>Username</label>
          <input type="text" className='LoginForm-input' name="username" value={credential} onChange={(e) => setCredential(e.target.value)} 
           onFocus={() => setIsActive01(true)} onBlur={() => setIsActive01(credential !== '')} ref={credentialRef}/>
        </div>
        <div className="LoginForm-div-formInput">
          <FontAwesomeIcon icon={faLock} className='LoginForm-icon'/>
          <label className={ isActive02 ? 'LoginForm-label-active' : 'LoginForm-label'} onClick={() => passwordRef.current.focus()}>Password</label>
          <input type="text" className='LoginForm-input' name="password" value={password} onChange={(e) => setPassword(e.target.value)}
           onFocus={() => setIsActive02(true)} onBlur={() => setIsActive02(password !== '')} ref={passwordRef}/>
          <small className='LoginForm-small'>Forgot Password?</small>
        </div>
        <div className="LoginForm-div-formButton">
          <button className="LoginForm-button" onClick={(e) => handleSubmit(e)}>Login</button>
          <button className='LoginForm-button' onClick={(e) => handleDemoLogin(e)}>Demo User</button>
        </div>
      </form>
    </div>
  )
}
