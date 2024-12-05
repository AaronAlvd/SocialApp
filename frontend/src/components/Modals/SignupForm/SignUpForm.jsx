import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DispatchCalls from '../../../SocialClass/dispatch';
import './SignupForm.css';

export default function SignUpForm() {
  const dispatch = useDispatch();
  const dispatchCalls = new DispatchCalls(dispatch);
  const [isActive01, setIsActive01] = useState(false);
  const [isActive02, setIsActive02] = useState(false);
  const [isActive03, setIsActive03] = useState(false);
  const [isActive04, setIsActive04] = useState(false);
  const [isActive05, setIsActive05] = useState(false);
  const [isActive06, setIsActive06] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePhoto: null,
  });

  const [errors, setErrors] = useState({
    passwordMatch: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePassword = () => {
    if (formData.password !== formData.confirmPassword) {
      setErrors({ passwordMatch: 'Passwords do not match' });
      return false;
    }
    setErrors({ passwordMatch: '' });
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    dispatchCalls.SignupUser(formData);

    console.log('Form submitted', formData);
  };

  return (
    <div className='SignupForm-div'>
      <h2 className='SignupForm-title'>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className='SignupForm-div-input'>
          <label className={isActive01 ? 'SignupForm-label-active' : 'SignupForm-label'}>First Name</label>
          <input type="text" name="firstName" className="SignupForm-input" value={formData.firstName} onChange={handleChange} required
           onFocus={() => setIsActive01(true)} onBlur={() => setIsActive01(formData.firstName !== '')}/>
        </div>
        <div className='SignupForm-div-input'>
          <label className={isActive02 ? 'SignupForm-label-active' : 'SignupForm-label'}>Last Name</label>
          <input type="text" name="lastName" className="SignupForm-input" value={formData.lastName} onChange={handleChange} required
           onFocus={() => setIsActive02(true)} onBlur={() => setIsActive02(formData.lastName !== '')}/>
        </div>
        <div className='SignupForm-div-input'>
          <label className={isActive03 ? 'SignupForm-label-active' : 'SignupForm-label'}>Username</label>
          <input type="text" name="username" className="SignupForm-input" value={formData.username} onChange={handleChange} required
           onFocus={() => setIsActive03(true)} onBlur={() => setIsActive03(formData.username !== '')}/>
        </div>
        <div className='SignupForm-div-input'>
          <label className={isActive04 ? 'SignupForm-label-active' : 'SignupForm-label'}>Email</label>
          <input type="email" name="email" className="SignupForm-input" value={formData.email} onChange={handleChange} required
           onFocus={() => setIsActive04(true)} onBlur={() => setIsActive04(formData.email !== '')}/>
        </div>
        <div className='SignupForm-div-input'>
          <label className={isActive05 ? 'SignupForm-label-active' : 'SignupForm-label'}>Password</label>
          <input type="password" name="password" className="SignupForm-input" value={formData.password} onChange={handleChange} required
           onFocus={() => setIsActive05(true)} onBlur={() => setIsActive05(formData.password !== '')}/>
        </div>
        <div className='SignupForm-div-input'>
          <label className={isActive06 ? 'SignupForm-label-active' : 'SignupForm-label'}>Confirm Password</label>
          <input type="password" name="confirmPassword" className="SignupForm-input" value={formData.confirmPassword} onChange={handleChange} required
           onFocus={() => setIsActive06(true)} onBlur={() => setIsActive06(formData.confirmPassword !== '')}/>
          {errors.passwordMatch && <span style={{ color: 'red' }}>{errors.passwordMatch}</span>}
        </div>
        <div className='SignupForm-div-button'>
          <button type="submit" className='SignupForm-button' onClick={() => handleSubmit}>Sign Up</button>
          </div>
      </form>
    </div>
  );
}
