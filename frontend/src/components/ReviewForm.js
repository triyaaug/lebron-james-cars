import React, { useState } from "react";

const ReviewForm = ({ vehicleId, userId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("You must be logged in to leave a review.");
      return;
    }

    const response = await fetch(`/vehicles/${vehicleId}/reviews/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment }),
    });

    if (response.ok) {
      setComment("");
      setRating(5);
      onReviewAdded(); // Refresh reviews after adding a new one
    } else {
      alert("Failed to submit review.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Write a Review</h3>
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>
              {star} ★
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
          cols="30"
          required
        />
      </label>
      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
