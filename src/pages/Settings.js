import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Settings.css";

export default function Settings() {
  const [profileImage, setProfileImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQ6ZmsiCzSC16bStr1KjZNcIBW5hAMa1ek6xoNeSSw5wQouq_N7dQCxlxI02TIeZk1e0&usqp=CAU"
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="body-container">
        <Sidebar />
        <div className="main-content">
          <h1>Settings</h1>

          <div className="profile-header">
            <div className="avatar-container">
              <img src={profileImage} alt="Profile" className="avatar-img" />
              <label htmlFor="upload-input" className="edit-icon">✏️</label>
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <form
            className="settings-form"
            onSubmit={(e) => {
              e.preventDefault();
              const confirmChange = window.confirm("Are you sure you want to save these changes?");
              if (confirmChange) {
                window.location.reload();
              }
            }}
          >
            <div className="settings-card">
              <h2>Personal Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" defaultValue="Doe" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" defaultValue="Jane" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" defaultValue="+1 234 567 890" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" defaultValue="jane.doe@example.com" />
                </div>
              </div>
            </div>

            <div className="settings-card">
              <h2>Change Password</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" defaultValue="ABC123" />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" defaultValue="ABC123" />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
