package br.ufrn.imd.comicboxd.controllers;


import br.ufrn.imd.comicboxd.dtos.ReviewRequestDTO;
import br.ufrn.imd.comicboxd.dtos.ReviewResponseDTO;
import br.ufrn.imd.comicboxd.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    ReviewService reviewService;


    @PostMapping
    public ResponseEntity<ReviewResponseDTO> createReview(@RequestBody ReviewRequestDTO reviewRequestDTO) {
        ReviewResponseDTO review = reviewService.createReview(reviewRequestDTO);
        return ResponseEntity.status(201).body(review);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewResponseDTO> getReviewById(@PathVariable("id") Long reviewId) {
        ReviewResponseDTO review = reviewService.getReviewById(reviewId);
        return  ResponseEntity.ok().body(review);
    }

    @GetMapping
    public ResponseEntity<List<ReviewResponseDTO>> getAllReviews() {
        List<ReviewResponseDTO> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok().body(reviews);
    }

    @DeleteMapping("/{reviewId}/user/{userId}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId, @PathVariable Long userId) {
        reviewService.deleteReviewById(reviewId, userId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewResponseDTO> updated(@PathVariable Long id, @RequestBody ReviewRequestDTO reviewRequestDTO) {
        ReviewResponseDTO review = reviewService.updateReview(id, reviewRequestDTO);
        return ResponseEntity.ok().body(review);
    }
}

