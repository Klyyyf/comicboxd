package br.ufrn.imd.comicboxd.repositories;

import br.ufrn.imd.comicboxd.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
