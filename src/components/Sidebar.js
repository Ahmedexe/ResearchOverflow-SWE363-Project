import React from 'react';
import { Link } from 'react-router-dom'; 
import "./Sidebar.css";
import * as Icon from "react-bootstrap-icons";

function Sidebar() {
  return (
    <div className='sidebar'>

      <Link to="/home" className="item">
        <Icon.House size={25} /> Home
      </Link>

      <Link to="/profile" className="item">
        <Icon.Person size={25} /> Profile
      </Link>

      <Link to="/Settings" className="item">
        <Icon.Gear size={25} /> Settings
      </Link>

    </div>
  );
}

export default Sidebar;
