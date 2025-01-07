import React from "react";
import "./SectionTitle.css";

const SectionTitle = ({ title, description }) => {
  return (
    <div className="section-title">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default SectionTitle;
