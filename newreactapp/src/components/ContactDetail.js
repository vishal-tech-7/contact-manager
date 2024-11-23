import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo512 from "../images/logo512.png";
import { Link } from "react-router-dom";

const ContactDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle undefined state
  if (!location.state) {
    // Redirect back to the home page if state is missing
    navigate("/");
    return null;
  }

  const { name, email } = location.state;

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={logo512} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
            <button className="ui button blue center">Back to Contact List</button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
