import React, { useState } from "react";
import "../styles/Login.scss";
import { setLogin, setShowPopup } from "../redux/state";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_1 } from "../api/api";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const popup = useSelector((state) => state.showPopup);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClick = (e) =>{
    dispatch(setShowPopup({popup:false}))
  }
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
        if(window.location.pathname === '/login'){

          navigate("/");
        }
        dispatch(setShowPopup({popup:false}))
      }
    } catch (err) {
      console.log("Login failed", err.message);
    }
  };

  return (
    <>
      <div className="login"
      onClick={handleClick}>
        <div className="login_content" onClick={(e) => e.stopPropagation()}>
        <p style={{display: popup ? "flex" : "none",justifyContent:'flex-end',fontSize:'2rem',cursor:'pointer'}}
        onClick={(e)=>handleClick(e)}>X</p>
          <div className="heading">Login Page</div>
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
          <Link to="/register">Don't have an account? Sign In Here</Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
