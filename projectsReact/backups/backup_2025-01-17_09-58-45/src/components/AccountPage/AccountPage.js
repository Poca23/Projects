import React, { useState, useEffect } from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import "./AccountPage.css";
const AccountPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [name, setName] = useState(() => {
    const savedName = localStorage.getItem("accountName");
    return savedName || "John Doe";
  });

  const [email, setEmail] = useState(() => {
    const savedEmail = localStorage.getItem("accountEmail");
    return savedEmail || "john.doe@example.com";
  });

  const [password, setPassword] = useState(() => {
    const savedPassword = localStorage.getItem("accountPassword");
    return savedPassword || "password123";
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleEditingName = () => {
    setIsEditingName(!isEditingName);
  };

  const toggleEditingEmail = () => {
    setIsEditingEmail(!isEditingEmail);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleKeyDown = (e, toggleFunction) => {
    if (e.key === "Enter") {
      toggleFunction();
    }
  };

  useEffect(() => {
    localStorage.setItem("accountName", name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem("accountEmail", email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem("accountPassword", password);
  }, [password]);

  return (
    <PageTemplate>
      <div className="account-page">
        <h1 className="title">Mon Compte</h1>
        <div className="account-details">
          <p>
            Nom :
            {isEditingName ? (
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                onBlur={toggleEditingName}
                onKeyDown={(e) => handleKeyDown(e, toggleEditingName)}
                className="edit-input"
                autoFocus
              />
            ) : (
              <>
                <span onClick={toggleEditingName}>{name}</span>
                <i
                  className="fas fa-pencil-alt edit-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleEditingName();
                  }}
                ></i>
              </>
            )}
          </p>
          <p>
            Email :
            {isEditingEmail ? (
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={toggleEditingEmail}
                onKeyDown={(e) => handleKeyDown(e, toggleEditingEmail)}
                className="edit-input"
                autoFocus
              />
            ) : (
              <>
                <span onClick={toggleEditingEmail}>{email}</span>
                <i
                  className="fas fa-pencil-alt edit-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleEditingEmail();
                  }}
                ></i>
              </>
            )}
          </p>
          <p>
            Mot de passe :
            <span className="password">
              {showPassword ? password : "********"}
            </span>
            <i
              className={`fas ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              } edit-icon`}
              onClick={togglePasswordVisibility}
            ></i>
          </p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default AccountPage;
