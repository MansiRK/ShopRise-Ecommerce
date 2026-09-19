import React from "react";
import "../style/index.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-hot-toast";
import { useCart } from "../context/cartContext";
import { FiShoppingCart } from "react-icons/fi";
import { RiAccountCircleLine, RiHeart2Fill } from "react-icons/ri";
import { BiShoppingBag } from "react-icons/bi";
import { 
  WiDaySunny 
} from "react-icons/wi";
import axios from "axios";

import { useSearch } from "../context/searchContext";
import { RiSearchLine } from "react-icons/ri";
import {
  RiHeartLine,          // Wishlist
  RiShoppingCartLine,   // Cart
  RiEyeLine,            // Eye open
  RiEyeOffLine,         // Eye close
  RiDeleteBinLine,      // Dustbin
} from "react-icons/ri";
import SaleBar from "./SaleBar";

function Navbar() {
  const [auth, setAuth] = useAuth();

  const [cart, setCart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      accessToken: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged Out Successfully");
  };

    const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(`product/search/${values.keyword}`);
      setValues({
        ...values,
        count: data.count,
        products: data.products,
      });
      navigate("/search");
    } catch (error) {
      console.error(error);
      alert("No product found for this search");
    }
  };

  return (
    <>
    {auth?.user?.role === 1 ? (
      null
    ) : <SaleBar/> } 
      <nav className="navbar fixed-top mobile-menu">
        <div className="container">
          <div className="col-lg-6">
 <Link className="navbar-brand" to="/">
            <BiShoppingBag />
            ShopRise
          </Link>
          </div>
         
         <div className="col-lg-6">
 <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
         </div>
         
          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <Link className="navbar-brand" to="/">
                  <BiShoppingBag />
                  ShopRise
                </Link>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>

                {!auth?.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    {auth?.user?.role === 1 ? (
                      <>
                        <li className="nav-item">
                          <NavLink className="nav-link" to={`/admin/products`}>
                            Dashboard
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link"
                            to="/login"
                            onClick={handleLogout}
                          >
                            Logout
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link active">
                            <RiAccountCircleLine />
                            {auth.user.name}
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="nav-item">
                          <NavLink className="nav-link " to="/user/products">
                            Products
                          </NavLink>
                        </li>

                        <li className="nav-item">
                          <NavLink
                            // onClick={}
                            className="nav-link"
                            to={`/user/orders`}
                          >
                            Orders
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            className="nav-link position-relative"
                            to="/cart"
                          >
                            <FiShoppingCart />

                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                              {cart?.length}
                              <span className="visually-hidden">
                                unread messages
                              </span>
                            </span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link"
                            to="/login"
                            onClick={handleLogout}
                          >
                            Logout
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link active">
                            {auth.user.name}
                          </Link>
                        </li>
                      </>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg desktop-menu pt-4 pb-2">

        <div className="container">
          <div className="row w-100 align-items-center justify-content-between">
<div className="col-lg-2">
         <Link className="navbar-brand" to="/">
            {/* <BiShoppingBag />  */}
            ShopRise
          </Link>
        </div>
         

<div className="col-lg-6">
 <ul className="navbar-nav w-100 justify-content-center">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
              
               <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/about">
                About
              </NavLink>
            </li>
             <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/contact">
                Contact
              </NavLink>
            </li>
            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Sign Up
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li> */}
              </>
            ) : (
              <>
                {auth?.user?.role === 1 ? (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to={`/admin/products`}>
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/login"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active">
                        <RiAccountCircleLine />
                        {auth.user.name}
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link " to="/user/products">
                        Products
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        // onClick={}
                        className="nav-link"
                        to={`/user/orders`}
                      >
                        Orders
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link position-relative"
                        to="/cart"
                      >
                        <FiShoppingCart />

                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                          {cart?.length}
                          <span className="visually-hidden">
                            unread messages
                          </span>
                        </span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/login"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active">{auth.user.name}</Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
</div>
         

           <div className="col-lg-4 d-flex align-items-center justify-content-end">
          <div className="row w-100 align-items-center"role="search" onSubmit={handleSubmit}>
                  <div className="col-lg-7">
           <div className="search-bar">
                          
                          <input
                            className="search-input"
                            type="search"
                            placeholder="What are you looking for?"
                            aria-label="Search"
                            value={values.keyword}
                            onChange={(e) => {
                              setValues({
                                ...values,
                                keyword: e.target.value,
                              });
                            }}
                          />
                          <RiSearchLine />
                        </div>
                  </div>
          
                  <div className="col-lg-5">
                    <div className="navbar-icons">
          <RiHeartLine/>
                  <RiShoppingCartLine/>
                  <RiAccountCircleLine/>
          </div>
                  </div>
                  
                      </div>
        </div>
          </div>
        


        
        </div>
      </nav>
    </>
  );
}

export default Navbar;
