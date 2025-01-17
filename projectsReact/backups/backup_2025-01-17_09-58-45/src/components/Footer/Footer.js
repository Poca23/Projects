import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-section logo">
        <a href="/">
          <img
            src="../media/images/blog-logo.png"
            alt="Blog de Cinéma"
            className="logo-image-footer"
          />
        </a>
      </div>
      <div className="footer-section legal">
        <p>
          <a href="/mentions-legales" className="legal-link">
            Mentions Légales
          </a>
        </p>
      </div>
      <div className="footer-section navigation">
        <p>
          <a href="/categories" className="nav-link">
            Catégories
          </a>
        </p>
        <p>
          <a href="/favoris" className="nav-link">
            Favoris
          </a>
        </p>
        <p>
          <a href="/visionnes" className="nav-link">
            Visionnés
          </a>
        </p>
      </div>
      <div className="footer-section social">
        <a href="https://www.facebook.com">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.instagram.com">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
