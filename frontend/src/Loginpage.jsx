import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './Loginpage.css';

const API_BASE_URL = 'http://localhost:3000/api/';

const Loginpage = () => {
  const navigate = useNavigate();

  const [givenData, setGivenData] = useState({
    username: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGivenData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const payload = {
        username: givenData.username,
        password: givenData.password,
      };

      const response = await axios.post(API_BASE_URL + 'login', payload);
      const user = response.data.user;

      localStorage.setItem('user', JSON.stringify(user));

      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        setErrorMsg('Invalid username or password.');
      } else {
        setErrorMsg('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="logo-container">
          <img src="./src/images/logo 1.png" alt="Logo" />
        </div>

        <div className="login-box">
          <h2>Sign in to your Plexify</h2>

          {errorMsg && <div className="error-message">{errorMsg}</div>}

          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={givenData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={givenData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="login-button">Log in</button>
          </form>

          <div className="links">
            <a href="#">Forgot password?</a>
          </div>

          <div className="signup-prompt">
            <p>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>

          <footer>
            <p>
              This site is protected by reCAPTCHA and the
              <a href="#"> Google Privacy Policy </a>
              and
              <a href="#"> Terms of Service </a>
              apply.
            </p>
          </footer>
        </div>
      </div>

      <div className="login-right">
        <img src="./src/images/Frame.png" alt="Working person" />
      </div>
    </div>
  );
};

export default Loginpage;
