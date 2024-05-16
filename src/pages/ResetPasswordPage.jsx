import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_28 } from "../api/api";
import "../styles/Login.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ResetPasswordPage.css";

import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] =
    useState(false);

  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [confirmPasswordIsFocused, setConfirmPasswordIsFocused] =
    useState(false);

  const { resetToken } = useParams();
  const navigate = useNavigate();

  const passwordVisibilityHandler = () => {
    setPasswordIsVisible((passwordIsVisible) => !passwordIsVisible);
  };
  const confirmPasswordVisibilityHandler = () => {
    setConfirmPasswordIsVisible(
      (confirmPasswordIsVisible) => !confirmPasswordIsVisible
    );
  };

  const passwordFocusHandler = () => {
    setPasswordIsFocused(true);
  };
  const confirmPasswordFocusHandler = () => {
    setConfirmPasswordIsFocused(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password.trim() !== confirmPassword.trim()) {
      window.alert("Passwords should match!");
    } else {
      try {
        // Sending request
        const response = await fetch(API_28, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resetToken, password, confirmPassword }),
        });

        const resData = await response.json();

        if (response.ok) {
          console.log("Reset successfully");
          window.alert("Password reset successfully");
          navigate("/login");
        } else {
          window.alert(resData.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="reset-page-container">
      <h1>Reset Password</h1>
      <form className="login_content_form" onSubmit={submitHandler}>
        <div className="password-input">
          <input
            type={!passwordIsVisible ? "password" : "text"}
            placeholder="Password"
            value={password}
            onFocus={passwordFocusHandler}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordIsFocused && (
            <button
              type="button"
              onClick={passwordVisibilityHandler}
              style={{
                color: "#E5E5E5",
                opacity: passwordIsVisible ? 1 : 0.5,
              }}
            >
              {passwordIsVisible ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </button>
          )}
        </div>
        <div className="password-input">
          <input
            type={!confirmPasswordIsVisible ? "password" : "text"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onFocus={confirmPasswordFocusHandler}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {confirmPasswordIsFocused && (
            <button
              type="button"
              onClick={confirmPasswordVisibilityHandler}
              style={{
                color: "#E5E5E5",
                opacity: confirmPasswordIsVisible ? 1 : 0.5,
              }}
            >
              {confirmPasswordIsVisible ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </button>
          )}
        </div>

        <button type="submit" className="update-password-btn">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
