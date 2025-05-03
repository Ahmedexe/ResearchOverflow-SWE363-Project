import React from 'react';
import './Header.css';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Header() {
  return (
    <div className="admin-header">
      <div className="admin-welcome-section">
        <div className="admin-welcome-text">
          <h2>Hello Faisal Alabbas</h2>
          <p>Welcome to the dashboard!</p>
          <p className="admin-subtitle">Track your progress and manage your tasks</p>
        </div>
      </div>
      <div className="admin-header-right">
        <div className="admin-notification-icon">
          <NotificationsIcon />
        </div>
        <div className="admin-user-profile">
          <Avatar className="admin-avatar">HF</Avatar>
        </div>
      </div>
    </div>
  );
}

export default Header;
