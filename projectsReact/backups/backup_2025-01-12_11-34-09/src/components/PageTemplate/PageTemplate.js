import React from "react";
import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import "./PageTemplate.css";

const PageTemplate = ({ children }) => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default PageTemplate;
