import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllUsers } from "../services/userService";

const LoginForm = ({ onLogin }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
        setMessage("Login successful!");
        onLogin(user); // Pass user data to parent component
        navigate("/catalog");
      } else {
        setMessage("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to connect to the server.");
    }

    if (user) {
      navigate("/catalog"); // Redirect logged-in users to the catalog
    } else {
      getAllUsers().then(setUsers); // Fetch registered users only if not logged in
    }
  };
  
  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", borderRadius: "5px" }}>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "400px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff"}} onSubmit={handleSubmit}>
        <div>
          <input style={{width: "90%", margin: "5px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px"}} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input style={{width: "90%", margin: "5px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px"}} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button style={{width: "120px", padding: "10px", borderRadius: "5px", backgroundColor: "#007bff", color: "white", fontSize: "16px", cursor: "pointer", border: "none", transition: "0.3s"}} type="submit">Login</button>
          <Link to="/register"><button style={{width: "120px", padding: "10px", borderRadius: "5px", backgroundColor: "#28a745", color: "white", fontSize: "16px", cursor: "pointer", border: "none", transition: "0.3s"}} type="button">Register</button></Link>
        </div>      
      </form>
    </div>
  );


};

export default LoginForm;
