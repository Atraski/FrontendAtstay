import React, { useEffect, useState } from "react";
import "../styles/LoginPopup.css";
import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage";

const LoginPopup = () => {
  const popup = useSelector((state) => state.showPopup);

  return (
    <div style={{ display: popup ? "flex" : "none" ,height:"100vh",width:"100vw",inset:"0" ,position:"fixed",background:"rgba(118, 122, 123, 0.86)",zIndex:"1000"}} >
    
    <LoginPage />
    
     
    </div>
  );
};

export default LoginPopup;
