import React from "react";
import "../style/index.css";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-hot-toast";
import { useCart } from "../context/cartContext";
import { Badge } from "antd";

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
      <nav className="navbar navbar-expand-lg bg-light text-dark p-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            ShopRise
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
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
                        {/* <Badge count={cart?.length} showZero>
                          <NavLink className="nav-link" to="/cart">
                            Cart
                          </NavLink>
                        </Badge> */}

                        <NavLink
                          className="nav-link position-relative"
                          to="/cart"
                        >
                          Cart
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cart?.length}
                            <span class="visually-hidden">unread messages</span>
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
      </nav>
    </>
  );
}

export default Navbar;
