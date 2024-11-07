import { LoginForm, OpenModalButton, SignupForm } from '../../Modals';
import * as sessionActions from '../../../store/session';
import { useEffect, useState } from 'react';
import * as postActions from '../../../store/post';
import { useSelector, useDispatch } from 'react-redux';
import './UserDropdown.css';

function UserDropdown () {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(sessionActions.logout());
  }
    
  return (
    <ul className="UserDropdown-ul">
      <li className="UserDropdown-li">
       {user ? <p onClick={handleLogout}>Logout</p> : <OpenModalButton buttonText="Login" modalComponent={<LoginForm />}/>}
      </li>
      <li className="UserDropdown-li">
       {user ? <p>Blank</p> : <OpenModalButton buttonText="Signup" modalComponent={<SignupForm />}/>}
      </li>
    </ul>
  )
};

export default UserDropdown;