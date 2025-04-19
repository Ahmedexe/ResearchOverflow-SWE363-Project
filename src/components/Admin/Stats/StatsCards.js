import React from 'react';
import './StatsCards.css';
import PeopleIcon from '@mui/icons-material/People';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EventIcon from '@mui/icons-material/Event';

function StatsCards() {
  return (
    <div className="admin-stats-cards">
      <div className="admin-stat-card">
        <div className="admin-stat-icon admin-members">
          <PeopleIcon />
        </div>
        <div className="admin-stat-info">
          <h3>All Members</h3>
          <p className="admin-stat-value">+2,234</p>
          <p className="admin-stat-trend admin-up">↑ 2.5%</p>
        </div>
      </div>
      
      <div className="admin-stat-card">
        <div className="admin-stat-icon admin-active">
          <GroupAddIcon />
        </div>
        <div className="admin-stat-info">
          <h3>Active Users</h3>
          <p className="admin-stat-value">+5,978</p>
          <p className="admin-stat-trend admin-up">↑ 1.8%</p>
        </div>
      </div>
      
      <div className="admin-stat-card">
        <div className="admin-stat-icon admin-requests">
          <EventIcon />
        </div>
        <div className="admin-stat-info">
          <h3>New Requests</h3>
          <p className="admin-stat-value">+1,234</p>
          <p className="admin-stat-trend admin-down">↓ 0.5%</p>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
