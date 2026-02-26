package br.ufrn.imd.comicboxd.repositories;

import br.ufrn.imd.comicboxd.model.Follow;
import br.ufrn.imd.comicboxd.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    boolean existsByFollowerAndFollowed(User follower, User followed);

    boolean deleteByFollowerAndFollowed(User follower, User followed);

    long countByFollower(User follower);
    long countByFollowed(User followed);

    @Query("SELECT f.followed.id FROM Follow f WHERE f.follower.id = :followerId")
    List<Long> findFollowedIds(Long followerId);
}
