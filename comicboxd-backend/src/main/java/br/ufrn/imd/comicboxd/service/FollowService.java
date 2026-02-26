package br.ufrn.imd.comicboxd.service;

import br.ufrn.imd.comicboxd.model.Follow;
import br.ufrn.imd.comicboxd.model.User;
import br.ufrn.imd.comicboxd.repositories.FollowRepository;
import br.ufrn.imd.comicboxd.repositories.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    @Transactional
    public void followUser(Long followerId, Long followedId) {
        if (followerId.equals(followedId)) {
            throw new IllegalArgumentException("Você não pode seguir a si mesmo.");
        }

        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        User followed = userRepository.findById(followedId)
                .orElseThrow(() -> new RuntimeException("Usuário a ser seguido não encontrado."));

        if (followRepository.existsByFollowerAndFollowed(follower, followed)) {
            throw new RuntimeException("Você já segue esse usuário.");
        }

        Follow follow = new Follow();
        follow.setFollower(follower);
        follow.setFollowed(followed);

        followRepository.save(follow);
    }

    @Transactional
    public void unfollowUser(Long followerId, Long followedId) {
        User follower = userRepository.findById(followedId)
                .orElseThrow(() -> new RuntimeException("Seguidor não encontrado."));

        User followed = userRepository.findById(followedId)
                .orElseThrow(() -> new RuntimeException("Seguido não encontrado."));

        followRepository.deleteByFollowerAndFollowed(follower, followed);
    }

    @Transactional(readOnly = true)
    public boolean isFollowing(Long followerId, Long followedId) {
        User follower = new User(); follower.setId(followerId);
        User followed = new User(); followed.setId(followedId);

        return followRepository.existsByFollowerAndFollowed(follower, followed);
    }

    @Transactional(readOnly = true)
    public List<Long> getFollowingIds(Long userId) {
        return followRepository.findFollowedIds(userId);
    }

    @Transactional(readOnly = true)
    public long countFollowers(Long userId) {
        User user = new User(); user.setId(userId);
        return followRepository.countByFollowed(user);
    }

    @Transactional(readOnly = true)
    public long countFollowing(Long userId) {
        User user = new User(); user.setId(userId);
        return followRepository.countByFollower(user);
    }
}
