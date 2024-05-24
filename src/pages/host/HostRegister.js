import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Register.scss";
import { API_3 } from "../../api/api";

const HostRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.contact.toString().length !== 10) {
      window.alert("Please enter correct 10 digit mobile number");
      return;
    }

    const { firstName, lastName, email, password, contact } = formData;

    let response;
    try {
      response = await axios.post(`${API_3}api/Registerhosts`, {
        firstName,
        lastName,
        email,
        password,
        contact,
      });
    } catch (err) {
      if (err.response.status === 400) {
        window.alert("All fields are required!");
        return;
      }
      if (err.response.status === 409) {
        window.alert("User already exists!");
        return;
      }
    }

    if (response.response.ok) {
      navigate("/hostLogin");
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <div className="heading">Host Registration Page</div>
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
            placeholder="contact"
            name="contact"
            type="string"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <button type="submit" disabled={!passwordMatch}>
            REGISTER
          </button>
        </form>
        <Link to="/hostLogin">Already have an account? Log In Here</Link>
      </div>
    </div>
  );
};

export default HostRegister;
