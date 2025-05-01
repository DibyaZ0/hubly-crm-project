import React from 'react';
import {useNavigate} from 'react-router-dom';
import './Landingpage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <header className="header">
        <h1 className="logo20"> <img src="/images/logo 1.png" /></h1>
        <div className="auth-buttons">
          <button className="ghost-button" onClick={() => navigate('/login')}>Login</button>
          <button className="primary-button" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </header>

      <main className="main">
      <div className="content-wrapper">
        <section className="text-section">
          <h2>Grow Your Business Faster with Hubly CRM</h2>
          <p>
            Manage leads, automate workflows, and close deals effortlessly—all in one powerful platform.
          </p>
          <div className="actions">
            <button className="primary-button">Get started</button>
            <button className="video-button">▶ Watch Video</button>
          </div>
        </section>

        <section className="image-section">
          <div className="image-group">
          <img src="/images/image.png" className="base-image" alt="Main" />
          <img src="/images/image 26.png" className="overlay bottom-right" alt="Overlay 1" />
          <img src="/images/Card 1.png" className="overlay top-right" alt="Overlay 2" />
          </div>
        </section>

        <section className="brand-banner">
           <img src="/images/image copy.png" /> 
        </section>

        <section className="brand-banner1">
           <img src="/images/image1.png" /> 
        </section>

        <section className="brand-banner2">
           <img src="/images/image 2.png" /> 
        </section>

        <section className="brand-banner3">
           <div className="image-container">
           <img className="main-image" src="/images/image 25.png" alt="Main visual" />
           <img className="overlay-logo" src="/images/logo 1.png" alt="Logo" />
           </div>
        </section>

       </div> 
      </main>
    </div>
  );
};

export default LandingPage;
