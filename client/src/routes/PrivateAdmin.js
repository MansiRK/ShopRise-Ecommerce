import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const PrivateAdmin = () => {
  const [valid, setValid] = useState();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`/auth/admin`);
        // , {
        //   headers: {
        //     Authorization: auth?.accessToken,
        //   },
        // }

        if (res.data.valid) {
          setValid(true);
        } else {
          setValid(false);
        }
      } catch (error) {
        console.log("Not valid admin", error);
        setValid(false);
      }
    };

    if (auth?.accessToken) {
      authCheck();
    }
  }, [auth?.accessToken]);

  return valid ? <Outlet /> : <Spinner path="" />;
};

export default PrivateAdmin;
