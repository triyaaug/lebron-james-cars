// VehicleCard.js
import React from "react";

const VehicleCard = ({ vehicle }) => {
  // Use the imageUrl field from the backend. Fallback to a default image if needed.
  const imageUrl = vehicle.imageUrl || `${process.env.PUBLIC_URL}/images/default-car.jpg`;


  return (
    <div
      style={{
        flex: "1",
        minWidth: "300px",
        height: "300px",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #D9D9D9",
        overflow: "hidden"
      }}
    >
      <img 
        src={imageUrl} 
        alt={`${vehicle.brand}`} 
        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
      />
    </div>
  );
};

export default VehicleCard;
