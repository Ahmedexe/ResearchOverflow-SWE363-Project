import React, { useState } from 'react';
import './Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import SettingsIcon from '@mui/icons-material/Settings';

function Sidebar({ activePage, setActivePage }) {
  const [expanded, setExpanded] = useState(true);
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`admin-sidebar ${expanded ? '' : 'collapsed'}`}>
      <div className="admin-sidebar-header">
        <h3>Admin</h3>
        <button className="admin-sidebar-toggle" onClick={toggleSidebar}>
          {expanded ? '←' : '→'}
        </button>
      </div>
      <div className="admin-sidebar-menu">
        <div className="admin-menu-section">
          <p className="admin-menu-title">SUMMARY</p>
          <ul className="admin-menu-items">
            <li 
              className={`admin-menu-item ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => setActivePage('home')}
            >
              <HomeIcon className="admin-menu-icon" />
              <span className="admin-menu-text">Home</span>
            </li>
          </ul>
        </div>
        <div className="admin-menu-section">
          <p className="admin-menu-title">PAGES</p>
          <ul className="admin-menu-items">
            <li 
              className={`admin-menu-item ${activePage === 'users' ? 'active' : ''}`}
              onClick={() => setActivePage('users')}
            >
              <PeopleIcon className="admin-menu-icon" />
              <span className="admin-menu-text">Users</span>
            </li>
            <li 
              className={`admin-menu-item ${activePage === 'membership-requests' ? 'active' : ''}`}
              onClick={() => setActivePage('membership-requests')}
            >
              <CardMembershipIcon className="admin-menu-icon" />
              <span className="admin-menu-text">Membership Requests</span>
            </li>
          </ul>
        </div>
        <div className="admin-menu-section">
          <ul className="admin-menu-items">
            <li 
              className={`admin-menu-item ${activePage === 'settings' ? 'active' : ''}`}
              onClick={() => setActivePage('settings')}
            >
              <SettingsIcon className="admin-menu-icon" />
              <span className="admin-menu-text">Settings</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
