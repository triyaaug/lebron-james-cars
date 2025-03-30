import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../services/userService";

function LandingPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user) {
      navigate("/catalog"); // Redirect logged-in users to the catalog
    } else {
      getAllUsers().then(setUsers); // Fetch registered users only if not logged in
    }
  }, [user, navigate]);

  return (
    <div style={styles.homeContainer}>
    <h1 style={styles.heading}>Welcome to Lebron James’ Cars</h1>

    {!user && (
      <div style={styles.buttonGroup}>
        <Link to="/login">
          <button style={styles.loginButton}>Login</button>
        </Link>
        <Link to="/register">
          <button style={styles.registerButton}>Register</button>
        </Link>
      </div>
    )}

    <img
      src="/lebron.png"
      alt="Lebron"
      style={styles.lebronImage}
    />

    {!user && (
      <div style={styles.userListSection}>
        <h3>Registered Users</h3>
        <ul>
          {users.length > 0 ? (
            users.map((user, index) => (
              <li key={index}>{user.name} - {user.email}</li>
            ))
          ) : (
            <p>No registered users yet.</p>
          )}
        </ul>
      </div>)}
    </div>
  );
}

const styles = {
  homeContainer: {
    textAlign: "center",
    padding: "40px 20px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "500",
    marginBottom: "30px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
  },
  loginButton: {
    padding: "12px 24px",
    backgroundColor: "#9E2A2B",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  registerButton: {
    padding: "12px 24px",
    backgroundColor: "#E09F3E",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  lebronImage: {
    width: "200px",
    marginTop: "10px",
  },
  userListSection: {
    marginTop: "40px",
    textAlign: "center",
  }
};


export default LandingPage;
