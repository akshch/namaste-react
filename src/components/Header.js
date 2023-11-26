import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Header = () => {

  console.log('Header rendered');
  const [btnName, setBtnName] = useState('Login');

  // If a dependency array is not present => useEffect is called everytime the component get rendered
  // If a dependency array is empty = [] => useEffect is called only initial rendered (just once)
  // If a dependency array is present [btnName] => useEffect is called on every [btnName] gets updated.
  
  useEffect(() => {
    console.log("useEffect called");
  }, [btnName]);
  
  return (<div className="header">
    <div className="logo-container">
      <img className="logo" alt="Food Logo" src={LOGO_URL}></img>
    </div>
    <div className="nav-items">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li>Cart</li>
        <button className="login" onClick={() => {
          btnName === 'Login' ? setBtnName('Logout') : setBtnName('Login');
        }}>{btnName}</button>
      </ul>
    </div>
  </div>)
}

export default Header;