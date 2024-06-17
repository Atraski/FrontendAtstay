import React, { useEffect, useState } from "react";
import "../styles/LoginPopup.css";
import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage";

const LoginPopup = () => {
  const popup = useSelector((state) => state.showPopup);

  return (
    <div className="login-popup" style={{ display: popup ? "flex" : "none" }}>
      <LoginPage />
    </div>
  );
};

export default LoginPopup;
