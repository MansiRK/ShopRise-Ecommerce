import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout>
      <div className="text-center " style={{ marginTop: "100px" }}>
        <h1 className="title">404</h1>
        <h3 className="heading">Sorry! Page Not Found</h3>
        <Link to="/" className="btn btn-dark">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
