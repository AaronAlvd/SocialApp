import { OpenModalButton, LoginForm, SignupForm } from '../Modals';
import './UserDropdown.css';

function UserDropdown () {

  return (
    <ul className="ul-userDropdown">
      <li className="li-userDropdown">
        <p className="UserDropdown-p">Empty</p>
      </li>
      <li className="li-userDropdown">
        <p className="UserDropdown-p">Empty</p>
      </li>
      <li className="li-userDropdown">
        <p className="UserDropdown-p">Empty</p>
      </li>
      <li className="li-userDropdown">
        <span className="span-modalButton">
          <OpenModalButton buttonText="Login" modalComponenet={<LoginForm />}/>
        </span>
      </li>
      <li className="li-userDropdown">
        <span className="span-modalButton">
          <OpenModalButton buttonText="Signup" modalComponenet={<SignupForm />}/>
        </span>
      </li>
    </ul>
  )
};

export default UserDropdown;