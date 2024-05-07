import React, { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit called");
    console.log("formData:", formData);

    try {
      const { firstName, lastName, email, password, contact } = formData;
      const response = await axios.post(`${API_3}api/Registerhosts`, {
        firstName,
        lastName,
        email,
        password,
        contact,
      });
      console.log("response", response);
      if (response.status === 201) {
        navigate("/hostLogin");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
      window.alert("Registration failed. Please try again.");
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
