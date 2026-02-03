package br.ufrn.imd.comicboxd.service;


import br.ufrn.imd.comicboxd.dtos.ReviewRequestDTO;
import br.ufrn.imd.comicboxd.dtos.ReviewResponseDTO;
import br.ufrn.imd.comicboxd.dtos.ReviewUpdateDTO;
import br.ufrn.imd.comicboxd.model.Comic;
import br.ufrn.imd.comicboxd.model.Review;
import br.ufrn.imd.comicboxd.model.User;
import br.ufrn.imd.comicboxd.repositories.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;



import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    UserService userService;

    @Autowired
    ComicService comicService;

    public ReviewResponseDTO createReview(ReviewRequestDTO body) {


        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String userIdString = authentication.getName();

        Long userId = Long.parseLong(userIdString);

        User user = userService.findEntityById(userId);

        Comic comic = comicService.findEntityById(body.comicId());

        Optional<Review> existingReview =
                reviewRepository.findByUserIdAndComicId(user.getId(), comic.getId());

        if (existingReview.isPresent()) {
            Review review = existingReview.get();

            review.setRating(body.rating());
            review.setComment(body.comment());

            reviewRepository.save(review);

            return new ReviewResponseDTO(
                    review.getId(),
                    review.getRating(),
                    review.getComment(),
                    review.getCreatedAt(),
                    review.getUser().getUsername(),
                    review.getComic().getCoverUrl(),
                    review.getComic().getTitle()
            );
        }

        if (body.rating() < 0 || body.rating() > 5){
            throw new IllegalArgumentException("Rating must be between 0 and 5");
        }

        Review review = new Review(
                body.rating(),
                body.comment(),
                user,
                comic
        );

        reviewRepository.save(review);

        return new ReviewResponseDTO(
                review.getId(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt(),
                review.getUser().getUsername(),
                review.getComic().getCoverUrl(),
                review.getComic().getTitle()
        );
    }

    public ReviewResponseDTO getReviewById(Long reviewId){
        Review review = reviewRepository.findById(reviewId).orElseThrow(()-> new EntityNotFoundException("Review not found"));

        return new ReviewResponseDTO(
                review.getId(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt(),
                review.getUser().getUsername(),
                review.getComic().getCoverUrl(),
                review.getComic().getTitle()
        );
    }

    public List<ReviewResponseDTO> getAllReviews(){
        List<Review> reviews = reviewRepository.findAll();
        List<ReviewResponseDTO> reviewResponseDTOs = new ArrayList<>();

        for(Review review : reviews){
            reviewResponseDTOs.add(new ReviewResponseDTO(
                    review.getId(),
                    review.getRating(),
                    review.getComment(),
                    review.getCreatedAt(),
                    review.getUser().getUsername(),
                    review.getComic().getCoverUrl(),
                    review.getComic().getTitle()
            ));
        }

        return reviewResponseDTOs;
    }

    public ReviewResponseDTO updateReview(Long reviewId, ReviewUpdateDTO body){
        Review review =  reviewRepository.findById(reviewId).orElseThrow(()-> new EntityNotFoundException("Review not found"));

        if (body.rating() < 0 || body.rating() > 5){
            throw new IllegalArgumentException("Rating must be between 0 and 5");
        }

        review.setRating(body.rating());
        review.setComment(body.comment());

        reviewRepository.save(review);

        return new ReviewResponseDTO(
                review.getId(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt(),
                review.getUser().getUsername(),
                review.getComic().getCoverUrl(),
                review.getComic().getTitle()
        );
    }

    public void deleteReviewById(Long reviewId ){
        Review review = reviewRepository.findById(reviewId).orElseThrow(()-> new EntityNotFoundException("Review not found"));

        reviewRepository.delete(review);
    }

    public List<ReviewResponseDTO> getReviewsByComicId(Long comicId) {
        List<Review> reviews = reviewRepository.findByComicIdOrderByCreatedAtDesc(comicId);

        return reviews.stream()
                .map(review -> new ReviewResponseDTO(
                        review.getId(),
                        review.getRating(),
                        review.getComment(),
                        review.getCreatedAt(),
                        review.getUser().getUsername(),
                        review.getComic().getCoverUrl(),
                        review.getComic().getTitle()
                ))
                .toList();
    }

    public List<ReviewResponseDTO> getAllReviewsByUserId() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String id = auth.getName();

        Long userId = Long.parseLong(id);

        User user = userService.findEntityById(userId);

        List<Review> reviews =
                reviewRepository.findByUserIdOrderByCreatedAtDesc(user.getId());

        return reviews.stream()
                .map(review -> new ReviewResponseDTO(
                        review.getId(),
                        review.getRating(),
                        review.getComment(),
                        review.getCreatedAt(),
                        review.getUser().getUsername(),
                        review.getComic().getCoverUrl(),
                        review.getComic().getTitle()
                ))
                .toList();
    }
}
