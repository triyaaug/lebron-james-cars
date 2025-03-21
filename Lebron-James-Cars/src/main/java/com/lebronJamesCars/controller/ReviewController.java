package com.lebronJamesCars.controller;

import com.lebronJamesCars.entity.Review;
import com.lebronJamesCars.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicles/{vehicleId}/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Review> addReview(
            @PathVariable Long userId,
            @PathVariable Long vehicleId,
            @RequestParam int rating,
            @RequestParam String comment) {
        Review review = reviewService.addReview(userId, vehicleId, rating, comment);
        return ResponseEntity.ok(review);
    }

    @GetMapping
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long vehicleId) {
        return ResponseEntity.ok(reviewService.getReviewsByVehicle(vehicleId));
    }
}
