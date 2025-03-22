import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <nav style={{ 
      backgroundColor: "#333", 
      padding: "10px 20px", 
      color: "white", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center" 
    }}>
      {/* Left side links */}
      <div>
        <Link to="/catalog" style={{ color: "white", textDecoration: "none", marginRight: "15px" }}>Catalog</Link>
        <Link to="/cart" style={{ color: "white", textDecoration: "none",marginLeft: "10px",marginRight: "15px"}}>Cart</Link>
        <Link to="/loan-calculator" style={{ color: "white", textDecoration: "none",marginLeft: "10px" }}>Loan Calculator</Link>
      </div>

      {/* Right side logout button (only shown when logged in) */}
      {user && (
        <button 
          onClick={onLogout} 
          style={{ 
            background: "none", 
            color: "white", 
            border: "none", 
            cursor: "pointer", 
            fontSize: "16px" 
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
