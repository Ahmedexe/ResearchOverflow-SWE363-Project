import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import "./Sidebar.css";
import * as Icon from "react-bootstrap-icons";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <div className='sidebar'>

      <Link to="/home" className="item">
        <Icon.House size={25} /> Home
      </Link>

      <Link to="/profile" className="item">
        <Icon.Person size={25} /> Profile
      </Link>

      <Link to="/settings" className="item">
        <Icon.Gear size={25} /> Settings
      </Link>


      <div className="spacer" />


      <button className="item logout-btn" onClick={handleLogout}>
        <Icon.BoxArrowRight size={25} /> Logout
      </button>

    </div>
  );
}

export default Sidebar;
