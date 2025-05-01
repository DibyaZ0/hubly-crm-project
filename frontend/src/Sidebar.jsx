import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { FiHome, FiPhoneCall, FiBarChart2, FiMessageSquare, FiUsers, FiSettings, FiUser } from 'react-icons/fi';

const Sidebar = () => {
  const menuItems = [
    { label: 'Dashboard', icon: <FiHome />, path: '/dashboard' },
    { label: 'Contactcenter', icon: <FiPhoneCall />, path: '/contactcenter' },
    { label: 'Analytics', icon: <FiBarChart2 />, path: '/analytics' },
    { label: 'Chatbot', icon: <FiMessageSquare />, path: '/chatbot' },
    { label: 'Teams', icon: <FiUsers />, path: '/teams' },
    { label: 'Settings', icon: <FiSettings />, path: '/settings' },
  ];

  return (
    <div className="sidebar">
      <div className="top-section">
        <div className="logo23">
          <img src="./src/images/logo 2.png" alt="Logo" />
        </div>
        <nav className="nav-links">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'sidebar-link active-link' : 'sidebar-link'
              }
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
