package br.ufrn.imd.comicboxd.repositories;

import br.ufrn.imd.comicboxd.dtos.UserResponseDTO;
import br.ufrn.imd.comicboxd.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}
