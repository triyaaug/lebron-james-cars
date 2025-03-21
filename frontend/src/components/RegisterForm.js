import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    postalCode: "",
    city: "",
    province: "",
    phoneNum: "",
    role: "USER", // Default role
  });

  const [message, setMessage] = useState(""); // Success/Error message

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("User registered successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          address: "",
          postalCode: "",
          city: "",
          province: "",
          phoneNum: "",
          role: "USER",
        });
      } else {
        setMessage("Error registering user.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to connect to the server.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
        <input type="text" name="province" placeholder="Province" value={formData.province} onChange={handleChange} />
        <input type="text" name="phoneNum" placeholder="Phone Number" value={formData.phoneNum} onChange={handleChange} />
        <div style={{display: "flex", justifyContent: "center"}}>
          <button type="submit">Register</button>
          <Link to="/"><a>Already have an account?</a></Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
