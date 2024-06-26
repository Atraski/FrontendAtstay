import "../styles/Footer.scss";
import { LocationOn, LocalPhone, Email } from "@mui/icons-material";
import FooterLower from "./FooterLower";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer">
        <div className="footer_left">
          <a href="/">
            <img src="/assets/logo.webp" alt="logo" />
          </a>
        </div>

        <div className="footer_center">
          <h3>Useful Links</h3>
          <ul className="useful-links">
            {/* <li>About Us</li>
            <li>Terms and Conditions</li> */}
            <li>
              <Link to="/HostLogin">Become A Host</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-&-conditions">Terms & Conditions</Link>
            </li>
            <div className="socials">
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
          </ul>
        </div>

        <div className="footer_right">
          <h3>Contact</h3>
          <a href="tel:+919088797850">
            <div className="footer_right_info footer-call">
              <LocalPhone />
              <p>+91 9088797850</p>
            </div>
          </a>
          <div className="footer_right_info">
            <Email />
            <p>atstaytravel@gmail.com</p>
          </div>
        </div>

        <div>
          <div className="payment-options">
            <h3>Pay Via</h3>
            <img src="/assets/payment.png" alt="payment" />
          </div>
          {/* <div className="socials">
            <a href="https://www.facebook.com/atstaybyatraski" target="_blank">
              <FontAwesomeIcon icon={faFacebookF} size="xl" />
            </a>
            <a
              href="https://www.instagram.com/atstaybyatraski?igsh=N2hodnQzdXkzd3E5"
              target="_blank"
            >
              <FontAwesomeIcon icon={faInstagram} size="xl" />
            </a>
          </div> */}
        </div>
      </div>
      <FooterLower />
    </footer>
  );
};

export default Footer;
