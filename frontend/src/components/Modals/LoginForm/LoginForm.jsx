import './LoginForm.css'
import { useState, useEffect } from 'react';

export default function LoginForm() {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');


  return (
    <div className="LoginForm-div">
      <h2 className='LoginForm-title'>Login</h2>
      <form className="LoginForm-form">
        <div className="LoginForm-div-formInput">
          <label className='LoginForm-label'>Username</label>
          <input type="text" className='LoginForm-input' name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="LoginForm-div-formInput">
          <label className='LoginForm-label'>Password</label>
          <input type="text" className='LoginForm-input' name="password" value={password} onChange={() => setPassword(e.target.value)}/>
          <small className='LoginForm-small'>Forgot Password?</small>
        </div>
        <div className="LoginForm-div-formButton">
          <button className="LoginForm-button">Login</button>
        </div>
      </form>
    </div>
  )
}
