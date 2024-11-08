import { useState } from 'react';

export default function SignUpForm() {

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profilePhoto: file,
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

    console.log('Form submitted', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required/>
      </div>

      <div>
        <label>Last Name</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required/>
      </div>

      <div>
        <label>Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </div>

      <div>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div>
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>

      <div>
        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        {errors.passwordMatch && <span style={{ color: 'red' }}>{errors.passwordMatch}</span>}
      </div>

      <div>
        <label>Profile Photo</label>
        <input type="file" name="profilePhoto" accept="image/*" onChange={handleFileChange} />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}
