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
    <div>
      <h1>Lebron James Cars</h1>
      <p>Welcome to Lebron James Cars. Register to join our exclusive car community!</p>

      {!user && (
        <div>
          <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      )}

      {!user && (
        <>
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
        </>
      )}
    </div>
  );
}

export default LandingPage;
