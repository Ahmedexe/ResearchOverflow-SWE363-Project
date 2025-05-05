import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Settings.css";
import axios from "axios";

export default function Settings() {
  const [profileImage, setProfileImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQ6ZmsiCzSC16bStr1KjZNcIBW5hAMa1ek6xoNeSSw5wQouq_N7dQCxlxI02TIeZk1e0&usqp=CAU"
  );

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    originalEmail: "", // ✅ Needed to identify user
    password: "",
    confirmPassword: ""
  });

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setForm(prev => ({
        ...prev,
        fname: storedUser.fname || "",
        lname: storedUser.lname || "",
        email: storedUser.email || "",
        originalEmail: storedUser.email || "",
        phone: "+966 5X XXX XXXX"
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  const handleSave = async (e) => {
    e.preventDefault();
    const confirmChange = window.confirm("Are you sure you want to save these changes?");
    if (!confirmChange) return;

    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/user/update`, {
        originalEmail: form.originalEmail,
        fname: form.fname,
        lname: form.lname,
        phone: form.phone,
        email: form.email,
      });

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Changes saved successfully!");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Update failed.");
      console.log("SETTINGS ERROR: ", err);
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

          <form className="settings-form" onSubmit={handleSave}>
            <div className="settings-card">
              <h2>Personal Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input name="fname" type="text" value={form.fname} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input name="lname" type="text" value={form.lname} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input name="phone" type="text" value={form.phone} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="settings-card">
              <h2>Change Password</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>New Password</label>
                  <input name="password" type="password" value={form.password} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleInputChange} />
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
