import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>{user.name} - {user.email}</li>
        ))}
      </ul>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
    
  );
};

export default UserList;
