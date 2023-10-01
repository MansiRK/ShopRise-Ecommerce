import React, { useState } from "react";
import Layout from "../components/Layout";
import "../style/index.css";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/register`, {
        name,
        email,
        username,
        password,
        address,
        phone,
      });

      if (res && res.status === 200) {
        toast.success("User Registration Successful");
        navigate("/login");
      } else {
        toast.error("User Registration Failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <>
        <h2 className="text-center">Register Now</h2>
        <div className="form-container ">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="staticName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="staticName"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="staticUserName" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="staticUserName"
                placeholder="JohnDoe"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

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
              <label htmlFor="staticAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="staticAddress"
                placeholder="Street, City, State, Country"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="staticPhone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="staticPhone"
                placeholder="00000-00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                REGISTER
              </button>
              <p className="text-center">
                Already have an account? Please <Link to="/login">login</Link>
              </p>
            </div>
          </form>
        </div>
      </>
    </Layout>
  );
};

export default Register;
