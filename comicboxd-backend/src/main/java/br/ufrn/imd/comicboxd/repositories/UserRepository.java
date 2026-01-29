package br.ufrn.imd.comicboxd.repositories;

import br.ufrn.imd.comicboxd.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
