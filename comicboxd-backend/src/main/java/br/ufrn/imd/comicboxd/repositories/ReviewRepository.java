package br.ufrn.imd.comicboxd.repositories;

import br.ufrn.imd.comicboxd.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("""
        SELECT r
        FROM Review r
        JOIN FETCH r.comic
        WHERE r.user.id = :userId
        ORDER BY r.createdAt DESC
    """)
    List<Review> findByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);

    @Query("""
        SELECT r
        FROM Review r
        JOIN FETCH r.user
        WHERE r.comic.id = :comicId
        ORDER BY r.createdAt DESC
    """)
    List<Review> findByComicIdOrderByCreatedAtDesc(@Param("comicId") Long comicId);

    @Query("""
    SELECT r
    FROM Review r
    WHERE r.user.id = :userId
      AND r.comic.id = :comicId
    """)
    Optional<Review> findByUserIdAndComicId(
            @Param("userId") Long userId,
            @Param("comicId") Long comicId
    );

}

