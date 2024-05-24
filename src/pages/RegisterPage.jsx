import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.scss";
import { API_2 } from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const RegisterPage = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] =
    useState(false);
  const [confirmPasswordIsFocused, setConfirmPasswordIsFocused] =
    useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    contact: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.contact.toString().length !== 10) {
      window.alert("Please enter correct 10 digit mobile number");
      return;
    }

    if (formData.profileImage === null) {
      window.alert("Please enter profile image.");
      return;
    }

    const register_form = new FormData();

    for (var key in formData) {
      console.log("key", key);
      register_form.append(key, formData[key]);
    }

    const response = await fetch(API_2, {
      method: "POST",
      body: register_form,
    });

    if (response.status === 409) {
      window.alert("Email already in use!");
      return;
    }

    if (response.status === 400) {
      window.alert("Please enter profile image.");
      return;
    }

    if (response.ok) {
      navigate("/login");
    } else {
      window.alert("Registration failed!");
    }
  };

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

  return (
    <div className="register">
      <div className="register_content">
        <div className="heading">Registration Page</div>
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Enter 10 digit contact number"
            name="contact"
            type="number"
            value={formData.contact}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={10}
          />
          <div className="password-input">
            <input
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={passwordFocusHandler}
              type={!passwordIsVisible ? "password" : "text"}
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
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={confirmPasswordFocusHandler}
              type={!confirmPasswordIsVisible ? "password" : "text"}
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

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>
            REGISTER
          </button>
        </form>
        <Link to="/login">Already have an account? Log In Here</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
