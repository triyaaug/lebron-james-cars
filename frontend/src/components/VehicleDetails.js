import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

  useEffect(() => {
    fetch(`http://18.214.94.81:8080/vehicles/${id}`)
      .then((response) => response.json())
      .then((data) => setVehicle(data))
      .catch((error) => console.error("Error fetching vehicle:", error));
  }, [id]);

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

      {/* Review Form */}
      {user && <ReviewForm vehicleId={id} userId={user.userId} onReviewAdded={() => window.location.reload()} />}

      {/* Review List */}
      <ReviewList vehicleId={id} />
    </div>
  );
};

export default VehicleDetails;
