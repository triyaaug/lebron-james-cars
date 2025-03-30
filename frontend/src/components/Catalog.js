import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Catalog = ({ user }) => {
  const [vehicles, setVehicles] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [addingToCart, setAddingToCart] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://18.214.94.81:8080/vehicles?sortBy=${sortBy}&direction=${sortOrder}`)
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, [sortBy, sortOrder]);

  const handleClick = (id) => {
    navigate(`/vehicle/${id}`);
  };

  const handleAddToCart = (vehicleID) => {
    console.log("User before adding to cart:", user); // Debugging

    if (!user || !user.userId) {
      alert("Please log in to add items to the cart.");
      return;
    }

    setAddingToCart((prev) => ({ ...prev, [vehicleID]: true }));

    fetch(`http://18.214.94.81:8080/users/${user.userId}/cart/${vehicleID}`, {
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
        setAddingToCart((prev) => ({ ...prev, [vehicleID]: false }));
      });
  };

  // Separate Hot Deals from other vehicles
  const hotDeals = vehicles.filter((vehicle) => vehicle.onSale);
  const regularVehicles = vehicles.filter((vehicle) => !vehicle.onSale);

  return (
    <div>
      <h2>Car Catalog</h2>

      {/* Debugging user object */}
      {console.log("User in Catalog:", user)}

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
                style={{
                  border: "2px solid red",
                  padding: "10px",
                  width: "220px",
                  backgroundColor: "#ffe6e6",
                }}
              >
                <h3 onClick={() => handleClick(vehicle.vehicleID)} style={{ cursor: "pointer" }}>
                  {vehicle.brand}
                </h3>
                <p>{vehicle.modelYear}</p>
                <p><b>Discounted Price:</b> ${vehicle.price}</p>
                <p>Mileage: {vehicle.mileage} km</p>
                <button
                  onClick={() => handleAddToCart(vehicle.vehicleID)}
                  disabled={addingToCart[vehicle.vehicleID]}
                >
                  {addingToCart[vehicle.vehicleID] ? "Adding..." : "Add to Cart"}
                </button>
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
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "220px",
            }}
          >
            <h3 onClick={() => handleClick(vehicle.vehicleID)} style={{ cursor: "pointer" }}>
              {vehicle.brand}
            </h3>
            <p>{vehicle.modelYear}</p>
            <p>${vehicle.price}</p>
            <p>Mileage: {vehicle.mileage} km</p>
            <button
              onClick={() => handleAddToCart(vehicle.vehicleID)}
              disabled={addingToCart[vehicle.vehicleID]}
            >
              {addingToCart[vehicle.vehicleID] ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
