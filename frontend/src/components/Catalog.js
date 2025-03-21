import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Catalog = () => {
  const [vehicles, setVehicles] = useState([]);
  const [sortBy, setSortBy] = useState("price"); // Default sorting by price
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/vehicles?sortBy=${sortBy}&direction=${sortOrder}`) // Fetch sorted data
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, [sortBy, sortOrder]); // Refetch when sorting changes

  const handleClick = (id) => {
    navigate(`/vehicle/${id}`);
  };

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

      {/* Vehicle Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "10px" }}>
        {vehicles.map((vehicle) => (
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
