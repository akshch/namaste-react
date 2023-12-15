import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Header = () => {
  console.log("Header rendered");
  const [btnName, setBtnName] = useState("Login");

  // If a dependency array is not present => useEffect is called everytime the component get rendered
  // If a dependency array is empty = [] => useEffect is called only initial rendered (just once)
  // If a dependency array is present [btnName] => useEffect is called on every [btnName] gets updated.

  useEffect(() => {
    console.log("useEffect called");
  }, [btnName]);

  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="flex justify-between bg-pink-50">
      <div className="logo-container p-4">
        <img className="w-20" alt="Food Logo" src={LOGO_URL}></img>
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">
            Online Status: {onlineStatus ? "Online" : "Offline"}
          </li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4">Cart</li>
          <button
            className="login"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
          <li className="px-4 font-bold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
