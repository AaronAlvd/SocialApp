import LoginForm from '../Modals/LoginForm/LoginForm';
import SignupForm from '../Modals/SignupForm/SignupForm';
import OpenModalButton from '../Modals/OpenModalButton/OpenModalButton';
import { useEffect, useState } from 'react';
import './UserDropdown.css';

function UserDropdown () {

  return (
    <ul className="ul-userDropdown">
      <li className="li-userDropdown">
        <span className="span-modalButton">
          <OpenModalButton buttonText="Login" modalComponent={<LoginForm />}/>
        </span>
      </li>
      <li className="li-userDropdown">
        <span className="span-modalButton">
          <OpenModalButton buttonText="Signup" modalComponent={<SignupForm />}/>
        </span>
      </li>
    </ul>
  )
};

export default UserDropdown;