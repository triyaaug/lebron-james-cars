import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Catalog = () => {
  const [vehicles, setVehicles] = useState([]);
  const [sortBy, setSortBy] = useState("price"); // Default sorting by price
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/vehicles?sortBy=${sortBy}&direction=${sortOrder}`)
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, [sortBy, sortOrder]); // Refetch when sorting changes

  const handleClick = (id) => {
    navigate(`/vehicle/${id}`);
  };

  // Separate Hot Deals from other vehicles
  const hotDeals = vehicles.filter((vehicle) => vehicle.onSale);
  const regularVehicles = vehicles.filter((vehicle) => !vehicle.onSale);

  return (
    <div>
      <h2>Car Catalog</h2>

      {/* Sort Options */}
      <div>
        <label>Sort by: </label>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="price">Price</option>
          <option value="modelYear">Model Year</option>
          <option value="mileage">Mileage</option>
        </select>

        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          {sortOrder === "asc" ? "⬆️ Ascending" : "⬇️ Descending"}
        </button>
      </div>

      {/* Hot Deals Section */}
      {hotDeals.length > 0 && (
        <div>
          <h2 style={{ color: "red" }}>🔥 Hot Deals 🔥</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {hotDeals.map((vehicle) => (
              <div
                key={vehicle.vehicleID}
                onClick={() => handleClick(vehicle.vehicleID)}
                style={{
                  border: "2px solid red",
                  padding: "10px",
                  cursor: "pointer",
                  width: "200px",
                  backgroundColor: "#ffe6e6",
                }}
              >
                <h3>{vehicle.brand}</h3>
                <p>{vehicle.modelYear}</p>
                <p><b>Discounted Price:</b> ${vehicle.price}</p>
                <p>Mileage: {vehicle.mileage} km</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Vehicle List */}
      <h2>All Vehicles</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "10px" }}>
        {regularVehicles.map((vehicle) => (
          <div
            key={vehicle.vehicleID}
            onClick={() => handleClick(vehicle.vehicleID)}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              cursor: "pointer",
              width: "200px",
            }}
          >
            <h3>{vehicle.brand}</h3>
            <p>{vehicle.modelYear}</p>
            <p>${vehicle.price}</p>
            <p>Mileage: {vehicle.mileage} km</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
