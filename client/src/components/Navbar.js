import React from "react";
import "../style/index.css";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-hot-toast";
import { useCart } from "../context/cartContext";
import { FiShoppingCart } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import { BiShoppingBag } from "react-icons/bi";

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

  return (
    <>
      <nav class="navbar fixed-top mobile-menu">
        <div class="container-fluid">
          <Link className="navbar-brand" to="/">
            <BiShoppingBag />
            ShopRise
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                <Link className="navbar-brand" to="/">
                  <BiShoppingBag />
                  ShopRise
                </Link>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
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
      <nav className="navbar navbar-expand-lg desktop-menu p-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <BiShoppingBag />
            ShopRise
          </Link>

          <ul className="navbar-nav ms-auto">
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
                      <Link className="nav-link active">{auth.user.name}</Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
