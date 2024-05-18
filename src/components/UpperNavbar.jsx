import React from "react";
import "../styles/upperNavbar.css";
import { Link } from "react-router-dom";
// import FacebookIcon from '@mui/icons-material/Facebook';
import { Call, Facebook, Instagram } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function UpperNavbar() {
  return (
    <div>
      <div className="nav">
        <div
          className="container-fluid nav-top d-flex justify-content-between"
          style={{ alignItems: "center" }}
        >
          <div className="navtopleft">
            <Link
              to="https://www.facebook.com/atstaybyatraski"
              target="_blank"
              className="icon"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link
              to="https://www.instagram.com/atstaybyatraski?igsh=N2hodnQzdXkzd3E5"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ fontSize: "2rem", marginTop: "2.4px" }}
              />
            </Link>
            {/* <span className="mx-3 emm" style={{color:"white"}}> <a style={{ color:"white"}} href="mailto:support@attravels.in">support@attravels.in</a></span> */}
          </div>

          <div className="navtopright">
            <span className="mx-3 calls" style={{ color: "white" }}>
              <a
                href="tel:+9654862355"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <Call
                  style={{
                    fontSize: "1.5rem",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
                <p style={{ fontSize: "17px" }}>Call Now</p>
              </a>
            </span>
            {/* <Link  to ="/signin"><span className="mx-3 log" style={{color:"white"}}>Login</span></Link>
               <Link to ="/signup"> <span className="mx-3 sig" style={{color:"white"}}>Signup</span></Link> */}
          </div>
        </div>

        {/* <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" className="logoimg" />
        </Link>
        </div> */}
        {/* <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"  
>
          <span className="navbar-toggler-icon"></span>
        </button>

        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/attours" className="nav-link">
                ATTOURS
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/atstays" className="nav-link"> 
                ATSTAYS
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/bloggerpage" className="nav-link">
                BLOGS
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav> */}
      </div>
      {/* <AnyWhere /> */}
    </div>
  );
}
