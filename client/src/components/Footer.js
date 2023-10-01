import React from "react";
import { Link } from "react-router-dom";
import "../style/index.css";

const Footer = () => {
  return (
    <div className="footer">
      <h5 className="text-center">All Rights Reserved &copy; ShopRise</h5>
      <p className="text-center ">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </p>
    </div>
  );
};

export default Footer;
