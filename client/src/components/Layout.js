import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <Toaster />
        {props.children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
