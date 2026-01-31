package br.ufrn.imd.comicboxd.repositories;

import br.ufrn.imd.comicboxd.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("SELECT r FROM Review r JOIN FETCH r.user WHERE r.comic.id = :comicId ORDER BY r.createdAt DESC")
    List<Review> findReviewsWithUserByComicId(@Param("comicId") Long comicId);
}
