import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../context/modal";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [formData, setFormData] = useState({username: '', password: ''});

  


  return (
    <div className="div-loginForm">

      <div className="div-h1">
        <h1 className="h1-login">Log In</h1>
      </div>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="div-input">
          <FontAwesomeIcon icon={faUser} className="formIcons" id="faUser" />
          <label htmlFor="username" id="labelUsername" className="formLabel">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="inputBox"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>

        <div className="div-input">
          <FontAwesomeIcon icon={faLock} className="formIcons" id="faLock" />
          <label htmlFor="password" id="labelPassword" className="formLabel">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="inputBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="div-button">
          {errors.credential && <p className="login-displayErrors">{errors.credential}</p>}
          <button type="submit" className="submitButton" disabled={(password.length < 6) && (credential.length < 4)}>Login</button>
        </div>
      </form>

      <button className="LF-demoButton" onClick={() => handleDemoSubmit()}>Demo User</button>
    </div>
  );
}

export default LoginForm;
