import React from 'react';
import "./Navbar.css";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom"; 

function Navbar() {
  return (
    <div className='navbar'>

      <div className='item'>
        <Link to="/profile">
          <img
            width="35px"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQ6ZmsiCzSC16bStr1KjZNcIBW5hAMa1ek6xoNeSSw5wQouq_N7dQCxlxI02TIeZk1e0&usqp=CAU"
            alt="Avatar"
          />
        </Link>
      </div>

      <div className='item'>
        <Link to="/notifications">
          <Icon.Bell size={25} />
        </Link>
      </div>

      <div className='item'>
        <Link to="/settings">
          <Icon.Gear size={25} />
        </Link>
      </div>

    </div>
  );
}

export default Navbar;
