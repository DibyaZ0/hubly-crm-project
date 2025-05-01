import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signuppage.css';
import { API_BASE_URL } from './Config';

const Signuppage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("You must agree to the terms and privacy policy.");
      return;
    }

    try {
      const payload = {
        name: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(API_BASE_URL+'/api/user', payload);
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-left">
        <div className="logo">
          <img src="/images/logo 1.png" alt="Logo" />
        </div>

        <div className="signup-box">
          <h2>Create an account <a href="/login" className="signin-link">Sign in instead</a></h2>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />

            <div className="terms">
              <input
                type="checkbox"
                id="agree"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agree">
                By creating an account, I agree to our <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="signup-button">Create an account</button>
          </form>
        </div>

        <footer>
          <p>
            This site is protected by reCAPTCHA and the <a href="#"> Google Privacy Policy</a> and <a href="#">Terms of Service</a> apply.
          </p>
        </footer>
      </div>

      <div className="signup-right">
        <img src="/images/Frame.png" alt="Working person" />
      </div>
    </div>
  );
};

export default Signuppage;
