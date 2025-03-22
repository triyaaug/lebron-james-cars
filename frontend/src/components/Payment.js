import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totalPrice = location.state?.totalPrice || 0; // Default to 0 if not provided

  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = () => {
    fetch("http://localhost:8080/payment", { method: "POST" })
      .then((res) => res.json())
      .then((success) => {
        if (success) {
          setPaymentStatus("Payment successful!");
          setTimeout(() => navigate("/catalog"), 2000);
        } else {
          setPaymentStatus("Payment failed! Try again.");
        }
      })
      .catch((err) => console.error("Error processing payment:", err));
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <button onClick={handlePayment}>Pay Now</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default Payment;
