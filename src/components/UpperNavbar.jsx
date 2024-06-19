import React from "react";
import "../styles/upperNavbar.css";
import { Link } from "react-router-dom";
import { Call } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function UpperNavbar() {
  return (
    <div>
      <div className="upper-nav">
        <div className="container-fluid nav-top">
          <div className="navtopleft">
            <a
              href="https://www.facebook.com/atstaybyatraski"
              target="_blank"
              className="facebook"
            >
              <FontAwesomeIcon icon={faSquareFacebook} />
            </a>
            <a
              href="https://www.instagram.com/atstaybyatraski?igsh=N2hodnQzdXkzd3E5"
              target="_blank"
              className="instagram"
            >
              <FontAwesomeIcon icon={faSquareInstagram} />
            </a>
            <a
              href="https://www.linkedin.com/company/at-stay/"
              target="_blank"
              className="linkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>

          <div className="navtopright">
            <span className="mx-3 calls" style={{ color: "white" }}>
              <a
                href="tel:+919088797850"
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
