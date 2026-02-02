package br.ufrn.imd.comicboxd.repositories;

import br.ufrn.imd.comicboxd.model.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    Page<Author> findByNameContaining(String name, Pageable pageable);
    Optional<Author> findByNameIgnoreCase(String name);
}