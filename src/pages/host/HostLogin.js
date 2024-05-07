import React, { useState } from "react";
import "../../styles/Login.scss";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setHostLogin } from "../../redux/state";
import { API_6 } from "../../api/api";

const HostLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
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
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <Link to="/hostRegister">Don't have an account? Sign In Here</Link>
      </div>
    </div>
  );
};

export default HostLogin;
