package br.ufrn.imd.comicboxd.repositories;

import br.ufrn.imd.comicboxd.model.Comic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComicRepository extends JpaRepository<Comic, Long> {

}