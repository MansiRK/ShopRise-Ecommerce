import React from "react";
import Layout from "../components/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className="container row m-4">
        <div className="col-md-6">
          <img
            src="../images/contact.png"
            style={{ width: "100%" }}
            alt="contact"
          />
        </div>
        <div className="col-md-4 text-center">
          <h2>Contact Us</h2>
          <p className="text-justify mt-3">
            Feel free to contact us 24X7 in case you face any issue.
          </p>
          <p className="mt-3">www.shoprisehelp@gmail.com</p>
          <p className="mt-3">91-34541 45435</p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
