import React, { useState } from "react";
import "../styles/Login.scss";
import { setLogin, setShowPopup } from "../redux/state";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_1 } from "../api/api";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);

  const popup = useSelector((state) => state.showPopup);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClick = (e) => {
    dispatch(setShowPopup({ popup: false }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_1, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      /* Get data after fetching */
      const loggedIn = await response.json();

      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        if (window.location.pathname === "/login") {
          navigate("/");
        }
        dispatch(setShowPopup({ popup: false }));
      }
    } catch (err) {
      console.log("Login failed", err.message);
    }
  };

  const passwordVisibilityHandler = () => {
    setPasswordIsVisible((passwordIsVisible) => !passwordIsVisible);
  };

  const passwordFocusHandler = () => {
    setPasswordIsFocused(true);
  };

  return (
    <>
      <div className="login" onClick={handleClick}>
        <div className="login_content" onClick={(e) => e.stopPropagation()}>
          <p
            style={{
              display: popup ? "flex" : "none",
              justifyContent: "flex-end",
              fontSize: "2rem",
              cursor: "pointer",
            }}
            onClick={(e) => handleClick(e)}
          >
            X
          </p>
          <div className="heading">Login Page</div>
          <form className="login_content_form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
            <button type="submit">LOG IN</button>
          </form>
          <Link to="/register">Don't have an account? Sign In Here</Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
