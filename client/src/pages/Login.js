import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/login`, {
        email,
        password,
      });

      if (res && res.status === 200) {
        toast.success("User Login Successful");
        setAuth({
          ...auth,
          user: res.data.user,
          accessToken: res.data.accessToken,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error("User Login Failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <>
        <h2 className="text-center">Login Now</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="staticEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="staticEmail"
                placeholder="johndoe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center">
              <button className="my-btn" type="submit">
                LOGIN
              </button>
              <p className="text-center">
                Don't have an account? Please{" "}
                <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </>
    </Layout>
  );
}

export default Login;
