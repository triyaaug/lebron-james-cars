import React, { useState, useEffect } from "react";
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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://18.214.94.81:8080/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://18.214.94.81:8080/users/register", {
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
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f9f9f9", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form style={{display: "flex", flexDirection: "column", gap: "10px"}} onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="text" name="province" placeholder="Province" value={formData.province} onChange={handleChange} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="text" name="phoneNum" placeholder="Phone Number" value={formData.phoneNum} onChange={handleChange} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px", marginTop: "10px"}}>
          <button style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }} type="submit">Register</button>
          <Link to="/" style={{ textDecoration: "none", color: "#007bff", alignSelf: "center" }}><a>Already have an account?</a></Link>
        </div>
      </form>
      <h3 style={{ marginTop: "20px", textAlign: "center", color: "#333" }} >Registered Users</h3>
      <ul style={{ listStyle: "none", padding: "0", textAlign: "center" }} >
        {users.length > 0 ? (
          users.map((user, index) => (
            <li style={{ padding: "5px 0", color: "#555" }} key={index}>{user.name} - {user.email}</li>
          ))
        ) : (
          <p></p>
        )}
      </ul>
    </div>
  );
};

export default RegisterForm;
