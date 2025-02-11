import LoginForm from '../../Modals/LoginForm/LoginForm.jsx';
import OpenModalButton from '../../Modals/OpenModalButton/OpenModalButton.jsx';
import SignUpForm from '../../Modals/SignupForm/SignUpForm.jsx';
import * as sessionActions from '../../../store/session.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import * as postActions from '../../../store/post.js';
import { useSelector, useDispatch } from 'react-redux';
import './UserDropdown.css';

function UserDropdown () {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await dispatch(sessionActions.logout());
    navigate('/');
    alert(`${response.message}`);
  }
    
  return (
    <ul className="UserDropdown-ul">
      <li className="UserDropdown-li_1 UserDropdown-li">
       {user ? <p onClick={handleLogout}>Logout</p> : <OpenModalButton buttonText="Login" modalComponent={<LoginForm />}/>}
      </li>
      <li className="UserDropdown-li_2 UserDropdown-li">
       {user ? <p onClick={() => navigate(`/profile/user/${user.username}`)}>Profile</p> : <OpenModalButton buttonText="Signup" modalComponent={<SignUpForm />}/>}
      </li>
    </ul>
  )
};

export default UserDropdown;