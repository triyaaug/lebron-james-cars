import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RegisterForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
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

  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://18.214.94.81:8080/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        // Auto login after successful registration
        const loginResponse = await fetch("http://localhost:8080/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (loginResponse.ok) {
          const loggedInUser = await loginResponse.json();
          localStorage.setItem("user", JSON.stringify(loggedInUser));
          onLogin(loggedInUser);
        } else {
          setMessage("Registration successful, but auto login failed. Please login manually.");
        }

        // Clear form
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
    <div style={styles.container}>
      <h2 style={styles.welcomeTitle}>Welcome to Lebron James’ Cars!</h2>
      <h3 style={styles.title}>Register</h3>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={styles.input} />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={styles.input} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={styles.input} />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} style={styles.input} />
        <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} style={styles.input} />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} style={styles.input} />
        <input type="text" name="province" placeholder="Province" value={formData.province} onChange={handleChange} style={styles.input} />
        <input type="text" name="phoneNum" placeholder="Phone Number" value={formData.phoneNum} onChange={handleChange} style={styles.input} />
        <button type="submit" style={styles.registerButton}>Register</button>
      </form>
      <p style={styles.loginText}>
        <Link to="/" style={styles.loginLink}>Already have an account?</Link>
      </p>



    {/* <h3 style={styles.subtitle}>Registered Users</h3>
      <ul style={{ listStyle: "none", padding: "0", textAlign: "center" }}>
        {users.length > 0 ? (
          users.map((user, index) => (
            <li style={{ padding: "5px 0", color: "#555" }} key={index}>{user.name} - {user.email}</li>
          ))
        ) : (
          <p></p>
        )}
      </ul> */}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "450px",
    margin: "2rem auto",
    padding: "50px 50px",
    borderRadius: "20px",
    backgroundColor: "#FFF3B0",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  welcomeTitle: {
    fontSize: "22px",
    color: "#2c5d63",
    fontWeight: "500",
    marginBottom: "10px",
  },
  title: {
    fontSize: "28px",
    color: "#2c5d63",
    marginBottom: "25px",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "0",
  },
  input: {
    width: "420px",
    padding: "12px",
    border: "1px solid black",
    borderRadius: "10px",
    fontSize: "16px",
    backgroundColor: "white",
  },
  registerButton: {
    width: "150px",
    padding: "12px",
    backgroundColor: "#9E2A2B",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "10px",
    alignSelf: "center"
  },
  loginText: {
    marginTop: "16px",
    fontSize: "14px",
    color: "#000",
  },
  loginLink: {
    color: "#000",
    textDecoration: "none",
    textDecoration: "underline",
    fontWeight: "500",
    marginLeft: "5px",
  }
};


export default RegisterForm;
