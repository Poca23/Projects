import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {
  const [recaptchaValue, setRecaptchaValue] = useState("");

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    if (!recaptchaValue) {
      alert("Veuillez compléter le reCAPTCHA.");
      return;
    }
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: event.target.login.value,
        password: event.target.password.value,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("authToken", data.token); // Stocke le token d'authentification
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    if (!recaptchaValue) {
      alert("Veuillez compléter le reCAPTCHA.");
      return;
    }
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        password: event.target.signupPassword.value,
      }),
    });
    if (response.ok) {
      alert("User registered successfully");
    } else {
      alert("Error registering user");
    }
  };

  return (
    <div className="login-container">
      <div className="form-section">
        <form onSubmit={handleSubmitLogin} className="login-form">
          <h3>Identification</h3>
          <label htmlFor="login">Login:</label>
          <input type="text" id="login" required />
          <label htmlFor="password">Mot de passe:</label>
          <input type="password" id="password" required />
          <a href="#forgot-password">Mot de passe oublié ?</a>
          <div className="captcha-container">
            <ReCAPTCHA
              sitekey="YOUR_RECAPTCHA_SITE_KEY"
              onChange={handleRecaptchaChange}
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
      <div className="divider"></div>
      <div className="form-section">
        <form onSubmit={handleSubmitSignup} className="signup-form">
          <h3>Inscription</h3>
          <label htmlFor="firstName">Prénom:</label>
          <input type="text" id="firstName" required />
          <label htmlFor="lastName">Nom:</label>
          <input type="text" id="lastName" required />
          <label htmlFor="email">Adresse mail:</label>
          <input type="email" id="email" required />
          <label htmlFor="confirmEmail">Confirmer l'adresse mail:</label>
          <input type="email" id="confirmEmail" required />
          <label htmlFor="signupPassword">Mot de passe:</label>
          <input type="password" id="signupPassword" required />
          <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
          <input type="password" id="confirmPassword" required />
          <div className="captcha-container">
            <ReCAPTCHA
              sitekey="YOUR_RECAPTCHA_SITE_KEY"
              onChange={handleRecaptchaChange}
            />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
