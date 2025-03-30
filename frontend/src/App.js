import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import LandingPage from "./components/LandingPage";
import Catalog from "./components/Catalog";
import VehicleDetails from "./components/VehicleDetails";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import LoanCalculator from "./components/LoanCalculator";
import Payment from "./components/Payment";

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    navigate("/catalog");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const showNavbar = location.pathname !== "/" && location.pathname !== "/register"; // Hide navbar on landing page

  return (
    <div>
      {showNavbar && <Navbar user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<LoginForm onLogin={handleLogin} />}/>
        <Route path="/login"  element={<LandingPage />}/>
        <Route path="/register" element={<RegisterForm onLogin={handleLogin} />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
        <Route path="/catalog" element={<Catalog user={user} />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/loan-calculator" element={<LoanCalculator />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
