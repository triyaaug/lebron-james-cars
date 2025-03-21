import React, { useEffect, useState } from "react";

const Cart = ({ user }) => {
  const [cart, setCart] = useState(null);
  const userId = user?.userId; // Ensure user is logged in

  useEffect(() => {
    if (!user) {
      console.log("No user found, skipping cart fetch.");
      return;
    }

    console.log(`Fetching cart for user ID: ${user.userId}`);

    fetch(`http://localhost:8080/users/${user.userId}/cart`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Cart data received:", data);
        setCart(data);
      })
      .catch((error) => console.error("Error fetching cart:", error));
  }, [user]);

  const handleRemove = (vehicleId) => {
    fetch(`http://localhost:8080/users/${userId}/cart/${vehicleId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((updatedCart) => {
        console.log("Updated cart after removal:", updatedCart);
        if (updatedCart?.vehicles) {
          setCart(updatedCart);
        } else {
          setCart({ vehicles: [], price: 0, noItems: 0 }); // Fallback to empty cart
        }
      })
      .catch((err) => console.error("Error removing item:", err));
  };

  const handleCheckout = () => {
    fetch(`http://localhost:8080/users/${userId}/cart/checkout`, { method: "POST" })
      .then((res) => res.text())
      .then((message) => {
        alert(message);
        setCart({ vehicles: [], price: 0, noItems: 0 }); // Ensure cart structure is correct
      })
      .catch((err) => console.error("Error checking out:", err));
  };

  if (!cart) return <p>Loading cart...</p>;
  if (!cart?.vehicles || cart.vehicles.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.vehicles.map((vehicle) => (
          <li key={vehicle.vehicleID}>
            {vehicle.brand} {vehicle.shape} - ${vehicle.price}
            <button onClick={() => handleRemove(vehicle.vehicleID)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total Price: ${cart.price}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
