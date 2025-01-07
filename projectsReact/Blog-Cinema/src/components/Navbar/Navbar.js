import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import "./Navbar.css";

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img
            src="../media/images/blog-logo.png"
            alt="Blog de Cinéma"
            className="logo-image"
          />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/categories">
            <i className="fas fa-th-list"></i>
            <span>Catégories</span>
          </Link>
        </li>
        <li>
          <Link to="/favoris">
            <i className="fas fa-heart"></i>
            <span>Favoris</span>
          </Link>
        </li>
        <li>
          <Link to="/visionnes">
            <i className="fas fa-eye"></i>
            <span>Visionnés</span>
          </Link>
        </li>
        <li>
          <Link to="/compte">
            {" "}
            {/* Changez '/account' en '/compte' */}
            <i className="fas fa-user"></i>
            <span>Mon Compte</span>
          </Link>
        </li>
      </ul>
      <div className="connexion">
        <button onClick={toggleForm}>
          <i className="fas fa-sign-in-alt"></i>
          <span>Connexion</span>
        </button>
        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={toggleForm}>
                &times;
              </span>
              <Login />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
