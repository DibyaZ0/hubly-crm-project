import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landingpage from './Landingpage';
import Loginpage from './Loginpage';
import Signuppage from './Signuppage';
import Dashboard from './Dashboard';
import Contactcenter from './Contactcenter';
import Analytics from './Analytics';
import Chatbot from './Chatbot';
import Teams from './Teams';
import Setting from './Setting';
import Sidebar from './Sidebar';
import { TeamProvider } from './Teamcontext';

const DashboardLayout = ({ children }) => (
  <div className="app-layout">
    <Sidebar />
    <div className="main-content">{children}</div>
  </div>
);

function App() {
  return (
    <Router>
      <TeamProvider>
      <Routes>
        
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />

        
        <Route
          path="/dashboard"
          element={<DashboardLayout><Dashboard /></DashboardLayout>}
        />
        <Route
          path="/contactcenter"
          element={<DashboardLayout><Contactcenter /></DashboardLayout>}
        />
        <Route
          path="/analytics"
          element={<DashboardLayout><Analytics /></DashboardLayout>}
        />
        <Route
          path="/chatbot"
          element={<DashboardLayout><Chatbot /></DashboardLayout>}
        />
        <Route
          path="/teams"
          element={<DashboardLayout><Teams /></DashboardLayout>}
        />
        <Route
          path="/settings"
          element={<DashboardLayout><Setting /></DashboardLayout>}
        />
      </Routes>
      </TeamProvider>
    </Router>
  );
}

export default App;

