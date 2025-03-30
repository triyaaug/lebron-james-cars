import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Catalog = ({ user }) => {
  const [vehicles, setVehicles] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [addingToCart, setAddingToCart] = useState({});
  
  // Filter states
  const [brand, setBrand] = useState("");
  const [shape, setShape] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [vehicleHistory, setVehicleHistory] = useState("");
  const [showOnSale, setShowOnSale] = useState(null);
  
  // Available filter options (you can fetch these from API if needed)
  const brandOptions = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Tesla"]; // Replace with your actual brands
  const shapeOptions = ["Sedan", "SUV", "Truck", "Hatchback", "Coupe"]; // Replace with your actual shapes
  const vehicleHistoryOptions = ["Clean", "Minor Damage", "Salvage"]; // Replace with your actual history options
  const yearOptions = [2020, 2021, 2022, 2023, 2024]; // Replace with your actual years

  const navigate = useNavigate();

  useEffect(() => {
    // Build query parameters
    const params = new URLSearchParams();
    
    // Add sort parameters
    params.append("sortBy", sortBy);
    params.append("direction", sortOrder);
    
    // Add filter parameters (only if they have values)
    if (brand) params.append("brand", brand);
    if (shape) params.append("shape", shape);
    if (modelYear) params.append("modelYear", modelYear);
    if (vehicleHistory) params.append("vehicleHistory", vehicleHistory);
    if (showOnSale !== null) params.append("onSale", showOnSale);
    
    // Make API request with all parameters
    fetch(`http://localhost:8080/vehicles?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, [sortBy, sortOrder, brand, shape, modelYear, vehicleHistory, showOnSale]);

  const handleClick = (id) => {
    navigate(`/vehicle/${id}`);
  };

  const handleAddToCart = (vehicleID) => {
    if (!user || !user.userId) {
      alert("Please log in to add items to the cart.");
      return;
    }

    setAddingToCart((prev) => ({ ...prev, [vehicleID]: true }));

    fetch(`http://localhost:8080/users/${user.userId}/cart/${vehicleID}`, {
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

  const resetFilters = () => {
    setBrand("");
    setShape("");
    setModelYear("");
    setVehicleHistory("");
    setShowOnSale(null);
  };

  // Separate Hot Deals from other vehicles
  const hotDeals = vehicles.filter((vehicle) => vehicle.onSale);
  const regularVehicles = vehicles.filter((vehicle) => !vehicle.onSale);

  return (
    <div>
      <h2>Car Catalog</h2>

      {/* Filter and Sort Options */}
      <div style={{ marginBottom: "20px", padding: "15px", border: "1px solid #eee", borderRadius: "5px" }}>
        <h3>Filter & Sort Options</h3>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "15px" }}>
          {/* Brand Filter */}
          <div>
            <label>Brand: </label>
            <select onChange={(e) => setBrand(e.target.value)} value={brand}>
              <option value="">All Brands</option>
              {brandOptions.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          
          {/* Shape Filter */}
          <div>
            <label>Vehicle Type: </label>
            <select onChange={(e) => setShape(e.target.value)} value={shape}>
              <option value="">All Types</option>
              {shapeOptions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          
          {/* Model Year Filter */}
          <div>
            <label>Year: </label>
            <select onChange={(e) => setModelYear(e.target.value)} value={modelYear}>
              <option value="">All Years</option>
              {yearOptions.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          
          {/* History Filter */}
          <div>
            <label>History: </label>
            <select onChange={(e) => setVehicleHistory(e.target.value)} value={vehicleHistory}>
              <option value="">Any History</option>
              {vehicleHistoryOptions.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>
          
          {/* On Sale Filter */}
          <div>
            <label>Deals: </label>
            <select onChange={(e) => setShowOnSale(e.target.value === "" ? null : e.target.value === "true")} value={showOnSale === null ? "" : showOnSale.toString()}>
              <option value="">All Vehicles</option>
              <option value="true">Hot Deals Only</option>
              <option value="false">Regular Prices Only</option>
            </select>
          </div>
        </div>
        
        {/* Sort Options */}
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <div>
            <label>Sort by: </label>
            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
              <option value="price">Price</option>
              <option value="modelYear">Model Year</option>
              <option value="mileage">Mileage</option>
            </select>
          </div>

          <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            {sortOrder === "asc" ? "⬆️ Ascending" : "⬇️ Descending"}
          </button>
          
          <button onClick={resetFilters} style={{ marginLeft: "auto" }}>
            Reset Filters
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(brand || shape || modelYear || vehicleHistory || showOnSale !== null) && (
        <div style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <strong>Active Filters:</strong>
            {brand && <span style={{ backgroundColor: "#e6f7ff", padding: "3px 8px", borderRadius: "3px" }}>Brand: {brand}</span>}
            {shape && <span style={{ backgroundColor: "#e6f7ff", padding: "3px 8px", borderRadius: "3px" }}>Type: {shape}</span>}
            {modelYear && <span style={{ backgroundColor: "#e6f7ff", padding: "3px 8px", borderRadius: "3px" }}>Year: {modelYear}</span>}
            {vehicleHistory && <span style={{ backgroundColor: "#e6f7ff", padding: "3px 8px", borderRadius: "3px" }}>History: {vehicleHistory}</span>}
            {showOnSale === true && <span style={{ backgroundColor: "#e6f7ff", padding: "3px 8px", borderRadius: "3px" }}>Hot Deals Only</span>}
            {showOnSale === false && <span style={{ backgroundColor: "#e6f7ff", padding: "3px 8px", borderRadius: "3px" }}>Regular Prices Only</span>}
          </div>
        </div>
      )}

      {/* Search Results Stats */}
      <p>Showing {vehicles.length} vehicles</p>

      {/* Hot Deals Section (only show if not filtered out) */}
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
      {regularVehicles.length > 0 && (
        <>
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
        </>
      )}

      {/* No Results Message */}
      {vehicles.length === 0 && (
        <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
          <p>No vehicles match your search criteria. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default Catalog;