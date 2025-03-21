import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/vehicles/${id}`) // Fetch vehicle details
      .then((response) => response.json())
      .then((data) => setVehicle(data))
      .catch((error) => console.error("Error fetching vehicle:", error));
  }, [id]);

  if (!vehicle) {
    return <p>Loading vehicle details...</p>;
  }

  return (
    <div>
      <h2>{vehicle.brand} - {vehicle.modelYear}</h2>
      <p>Price: ${vehicle.price}</p>
      <p>Shape: {vehicle.shape}</p>
      <p>History: {vehicle.vehicleHistory}</p>
      <p>Mileage: {vehicle.mileage} km</p>
      <p>CO2 Emission: {vehicle.co2Emission}</p>
      <p>Fuel Usage: {vehicle.fuelUsage} L/100km</p>
    </div>
  );
};

export default VehicleDetails;
