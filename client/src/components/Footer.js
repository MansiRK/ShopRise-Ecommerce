import React from "react";
import { Link } from "react-router-dom";
import "../style/index.css";

const Footer = () => {
  return (
    <div className="footer">
      <p className="text-center ">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </p>
      <h6 className="text-center mt-5">All Rights Reserved &copy; ShopRise</h6>
    </div>
  );
};

export default Footer;
