import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/auth.service';

const API_URL = 'http://localhost:5005';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name };

    authService
      .signup(requestBody)
      .then((response) => {
        console.log('user created');
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={password} onChange={handlePassword} />
        <label htmlFor="name">Name:</label>
        <input type="name" name="text" value={name} onChange={handleName} />
        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={'/login'}> Login</Link>
    </div>
  );
}

export default SignupPage;
