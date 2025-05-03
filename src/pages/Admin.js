import React, { useState } from 'react';
import '../styles/Admin.css';
import Sidebar from '../components/Admin/Sidebar/Sidebar';
import Header from '../components/Admin/Header/Header';
import StatsCards from '../components/Admin/Stats/StatsCards';
import LineChart from '../components/Admin/Charts/LineChart';
import PieChart from '../components/Admin/Charts/PieChart';
import BarChart from '../components/Admin/Charts/BarChart';
import DataTable from '../components/Admin/Table/DataTable';
import { Snackbar, Alert } from '@mui/material';

function Admin() {
  const [activePage, setActivePage] = useState('home');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleSaveSettings = () => {
    showNotification('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    showNotification('Settings reset to default values', 'info');
  };

  const renderContent = () => {
    switch(activePage) {
      case 'users':
        return (
          <div className="admin-users-page">
            <h2>Users Management</h2>
            <p className="admin-page-description">View and manage all users in the system</p>
            
            <div className="admin-users-stats">
              <div className="admin-users-stat-card">
                <h3>Total Users</h3>
                <p className="admin-users-stat-value">12,234</p>
              </div>
              <div className="admin-users-stat-card">
                <h3>Active Users</h3>
                <p className="admin-users-stat-value">5,678</p>
              </div>
              <div className="admin-users-stat-card">
                <h3>New Users (This Month)</h3>
                <p className="admin-users-stat-value">342</p>
              </div>
            </div>
            
            <div className="admin-users-table-container">
              <DataTable />
            </div>
          </div>
        );
      case 'membership-requests':
        return (
          <div className="admin-membership-page">
            <h2>Membership Requests</h2>
            <p className="admin-page-description">Review and manage membership requests</p>
            
            <div className="admin-membership-stats">
              <div className="admin-membership-stat-card">
                <h3>New Requests</h3>
                <p className="admin-membership-stat-value">1,234</p>
              </div>
              <div className="admin-membership-stat-card">
                <h3>Pending Approval</h3>
                <p className="admin-membership-stat-value">456</p>
              </div>
              <div className="admin-membership-stat-card">
                <h3>Approved This Month</h3>
                <p className="admin-membership-stat-value">789</p>
              </div>
            </div>
            
            <div className="admin-membership-table-container">
              <DataTable />
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="admin-settings-page">
            <h2>Settings</h2>
            <p className="admin-page-description">Configure system settings and preferences</p>
            
            <div className="admin-settings-container">
              <div className="admin-settings-section">
                <h3>General Settings</h3>
                <div className="admin-settings-form">
                  <div className="admin-settings-form-group">
                    <label>Site Name</label>
                    <input type="text" defaultValue="Research Overflow" />
                  </div>
                  <div className="admin-settings-form-group">
                    <label>Site Description</label>
                    <textarea defaultValue="A platform for research collaboration and knowledge sharing"></textarea>
                  </div>
                  <div className="admin-settings-form-group">
                    <label>Email Notifications</label>
                    <div className="admin-settings-toggle">
                      <input type="checkbox" id="emailNotifications" defaultChecked />
                      <label htmlFor="emailNotifications">Enable email notifications</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="admin-settings-section">
                <h3>Security Settings</h3>
                <div className="admin-settings-form">
                  <div className="admin-settings-form-group">
                    <label>Two-Factor Authentication</label>
                    <div className="admin-settings-toggle">
                      <input type="checkbox" id="twoFactorAuth" />
                      <label htmlFor="twoFactorAuth">Enable two-factor authentication</label>
                    </div>
                  </div>
                  <div className="admin-settings-form-group">
                    <label>Session Timeout (minutes)</label>
                    <input type="number" defaultValue="30" min="5" max="120" />
                  </div>
                </div>
              </div>
              
              <div className="admin-settings-actions">
                <button 
                  className="admin-settings-save-btn"
                  onClick={handleSaveSettings}
                >
                  Save Changes
                </button>
                <button 
                  className="admin-settings-reset-btn"
                  onClick={handleResetSettings}
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <>
            <StatsCards />
            <div className="admin-charts-container">
              <div className="admin-chart-row">
                <div className="admin-line-chart-container">
                  <LineChart />
                </div>
                <div className="admin-pie-chart-container">
                  <PieChart />
                </div>
              </div>
              <div className="admin-chart-row">
                <div className="admin-donut-chart-container">
                  <PieChart donut={true} />
                </div>
              </div>
              <div className="admin-chart-row">
                <div className="admin-bar-chart-container">
                  <BarChart />
                </div>
              </div>
            </div>
            <div className="admin-table-container">
              <DataTable />
            </div>
          </>
        );
    }
  };

  return (
    <div className="admin-app">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="admin-main-content">
        <Header />
        <div className="admin-dashboard-content">
          {renderContent()}
        </div>
      </div>
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Admin;
