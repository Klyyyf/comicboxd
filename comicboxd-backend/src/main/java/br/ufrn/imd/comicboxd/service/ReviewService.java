package br.ufrn.imd.comicboxd.service;

import br.ufrn.imd.comicboxd.dtos.ReviewRequestDTO;
import br.ufrn.imd.comicboxd.dtos.ReviewResponseDTO;
import br.ufrn.imd.comicboxd.dtos.ReviewUpdateDTO;
import br.ufrn.imd.comicboxd.model.Comic;
import br.ufrn.imd.comicboxd.model.Review;
import br.ufrn.imd.comicboxd.model.User;
import br.ufrn.imd.comicboxd.repositories.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    // Mudei para 'private final' para o Lombok injetar corretamente
    private final ReviewRepository reviewRepository;
    private final UserService userService;
    private final ComicService comicService;
    private final FollowService followService;

    private ReviewResponseDTO toDTO(Review review) {
        return new ReviewResponseDTO(
                review.getId(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt(),
                review.getUser().getUsername(),
                review.getUser().getId(),
                review.getComic().getCoverUrl(),
                review.getComic().getTitle()
        );
    }

    public ReviewResponseDTO createReview(ReviewRequestDTO body) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdString = authentication.getName();
        Long userId = Long.parseLong(userIdString);

        User user = userService.findEntityById(userId);
        Comic comic = comicService.findEntityById(body.comicId());

        Optional<Review> existingReview = reviewRepository.findByUserIdAndComicId(user.getId(), comic.getId());

        if (existingReview.isPresent()) {
            Review review = existingReview.get();
            review.setRating(body.rating());
            review.setComment(body.comment());
            reviewRepository.save(review);
            return toDTO(review);
        }

        if (body.rating() < 0 || body.rating() > 5){
            throw new IllegalArgumentException("Rating must be between 0 and 5");
        }

        Review review = new Review(body.rating(), body.comment(), user, comic);
        reviewRepository.save(review);

        return toDTO(review);
    }

    public ReviewResponseDTO getReviewById(Long reviewId){
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(()-> new EntityNotFoundException("Review not found"));
        return toDTO(review);
    }

    public List<ReviewResponseDTO> getAllReviews(){
        return reviewRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public ReviewResponseDTO updateReview(Long reviewId, ReviewUpdateDTO body){
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(()-> new EntityNotFoundException("Review not found"));

        if (body.rating() < 0 || body.rating() > 5){
            throw new IllegalArgumentException("Rating must be between 0 and 5");
        }

        review.setRating(body.rating());
        review.setComment(body.comment());

        reviewRepository.save(review);
        return toDTO(review);
    }

    public void deleteReviewById(Long reviewId ){
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(()-> new EntityNotFoundException("Review not found"));
        reviewRepository.delete(review);
    }

    public List<ReviewResponseDTO> getReviewsByComicId(Long comicId) {
        return reviewRepository.findByComicIdOrderByCreatedAtDesc(comicId).stream()
                .map(this::toDTO)
                .toList();
    }

    public List<ReviewResponseDTO> getAllReviewsByUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long userId = Long.parseLong(auth.getName());

        return reviewRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toDTO)
                .toList();
    }

    public Page<ReviewResponseDTO> getTimeline(Long currentUserId, Pageable pageable){
        List<Long> followingIds = followService.getFollowingIds(currentUserId);

        if (followingIds.isEmpty()){
            return Page.empty(pageable);
        }

        return reviewRepository.findByUserIdIn(followingIds, pageable)
                .map(this::toDTO);
    }
}