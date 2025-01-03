import { LoginForm, OpenModalButton, SignUpForm } from '../../Modals';
import * as sessionActions from '../../../store/session';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as postActions from '../../../store/post';
import { useSelector, useDispatch } from 'react-redux';
import './UserDropdown.css';

function UserDropdown () {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(sessionActions.logout());
  }
    
  return (
    <ul className="UserDropdown-ul">
      <li className="UserDropdown-li">
       {user ? <p onClick={handleLogout}>Logout</p> : <OpenModalButton buttonText="Login" modalComponent={<LoginForm />}/>}
      </li>
      <li className="UserDropdown-li">
       {user ? <p onClick={() => navigate(`/profile/${user.username}`)}>Profile</p> : <OpenModalButton buttonText="Signup" modalComponent={<SignUpForm />}/>}
      </li>
    </ul>
  )
};

export default UserDropdown;