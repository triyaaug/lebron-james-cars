import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totalPrice = location.state?.totalPrice || 0; // Default to 0 if not provided

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault(); // Prevent actual form submission

    // Simulate processing delay
    setPaymentStatus("Processing payment...");
    setTimeout(() => {
      setPaymentStatus("Payment successful! Redirecting...");
      setTimeout(() => navigate("/catalog"), 2000);
    }, 1500);

  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <h2>Payment Page</h2>
      <p>Total Price: <strong>${totalPrice.toFixed(2)}</strong></p>
      
      <form onSubmit={handlePayment} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Billing Address" value={formData.address} onChange={handleChange} required />
        
        <input type="text" name="cardNumber" placeholder="Card Number" maxLength="16" value={formData.cardNumber} onChange={handleChange} required />
        <div style={{ display: "flex", gap: "10px" }}>
          <input type="text" name="expiryDate" placeholder="MM/YY" maxLength="5" value={formData.expiryDate} onChange={handleChange} required />
          <input type="text" name="cvv" placeholder="CVV" maxLength="3" value={formData.cvv} onChange={handleChange} required />
        </div>
        
        <button type="submit" style={{ backgroundColor: "#007bff", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Pay Now
        </button>
      </form>

      {paymentStatus && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{paymentStatus}</p>}
    </div>
  );
};

export default Payment;
