import React, { useEffect, useState } from "react";

const ReviewList = ({ vehicleId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/vehicles/${vehicleId}/reviews`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [vehicleId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} style={{ borderBottom: "1px solid #ccc", padding: "5px 0" }}>
              <p><strong>Rating:</strong> {review.rating} ★</p>
              <p><strong>Comment:</strong> {review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
