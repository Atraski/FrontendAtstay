import React, { useState } from "react";
import "../../styles/Login.scss";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setHostLogin } from "../../redux/state";
import { API_6, API_27 } from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Loader from "../../components/Loader";

const HostLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const passwordVisibilityHandler = () => {
    setPasswordIsVisible((passwordIsVisible) => !passwordIsVisible);
  };

  const passwordFocusHandler = () => {
    setPasswordIsFocused(true);
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_6, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      /* Get data after fetching */
      const loggedIn = await response.json();
      console.log("LoggedIn data", loggedIn);

      if (loggedIn) {
        dispatch(
          setHostLogin({
            host: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/");
      }
    } catch (err) {
      console.log("Login failed", err.message);
    }
  };

  const resetPasswordHandler = async () => {
    if (email.trim().length === 0) {
      window.alert("Enter your email please.");
    } else {
      setIsLoading(true);
      const response = await fetch(API_27, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, type: "host" }),
      });
      const resData = await response.json();
      if (response.ok) {
        window.alert("Reset link sent to mail.");
      } else {
        window.alert(resData.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="login">
          <div className="login_content">
            <div className="heading">Host Login Form</div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <p
                  className="reset-link"
                  to="/reset"
                  style={{ fontSize: "14px" }}
                  onClick={resetPasswordHandler}
                >
                  Forgot password?
                </p>
              </div>
              <button type="submit">LOG IN</button>
            </form>
            <Link to="/hostRegister">Don't have an account? Sign In Here</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default HostLogin;
