import React, { useState, useEffect } from 'react';
import './Setting.css';
import axios from 'axios';
import { API_BASE_URL } from './Config';

const Setting = () => {
  // ✅ Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(API_BASE_URL+'/api/user');
        const userData = response.data.find(u => u._id === userId);
        if (userData) {
          setFormData({
            id: userData._id,
            firstName: userData.name || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            password:  '',
            confirmPassword:   '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.put(
        `${API_BASE_URL}/api/user/${formData.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="setting-container">
      <p className="page-title">Setting</p>
      <div className="setting-header">
        <h2>Edit Profile</h2>
      </div>

      <form className="edit-profile-form" onSubmit={handleSubmit}>
        {['firstName', 'lastName', 'email', 'password', 'confirmPassword'].map((field, idx) => (
          <div className="form-group" key={idx}>
            <label>{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={field.includes('password') ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.replace(/([A-Z])/g, ' $1')}
            />
          </div>
        ))}

        <div className="save-button-wrapper">
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
