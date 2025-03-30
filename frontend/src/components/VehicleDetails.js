import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user
  const [addingToCart, setAddingToCart] = useState(false); // State for adding to cart

  useEffect(() => {
    fetch(`http://localhost:8080/vehicles/${id}`)
      .then((response) => response.json())
      .then((data) => setVehicle(data))
      .catch((error) => console.error("Error fetching vehicle:", error));
  }, [id]);

  const handleAddToCart = () => {
    if (!user || !user.userId) {
      alert("Please log in to add items to the cart.");
      return;
    }

    setAddingToCart(true);

    fetch(`http://localhost:8080/users/${user.userId}/cart/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add to cart");
        return response.json();
      })
      .then(() => {
        alert("Vehicle added to cart!");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("Could not add to cart.");
      })
      .finally(() => {
        setAddingToCart(false);
      });
  };

  if (!vehicle) return <p>Loading vehicle details...</p>;

  return (
    <div>
      <h2>{vehicle.brand} - {vehicle.modelYear}</h2>
      <p>Price: ${vehicle.price}</p>
      <p>Shape: {vehicle.shape}</p>
      <p>History: {vehicle.vehicleHistory}</p>
      <p>Mileage: {vehicle.mileage} km</p>
      <p>CO2 Emission: {vehicle.co2Emission}</p>
      <p>Fuel Usage: {vehicle.fuelUsage} L/100km</p>

      {/* Add to Cart Button */}
      {user && (
        <button
          onClick={handleAddToCart}
          disabled={addingToCart}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {addingToCart ? "Adding..." : "Add to Cart"}
        </button>
      )}

      {/* Review Form */}
      {user && <ReviewForm vehicleId={id} userId={user.userId} onReviewAdded={() => window.location.reload()} />}

      {/* Review List */}
      <ReviewList vehicleId={id} />
    </div>
  );
};

export default VehicleDetails;
