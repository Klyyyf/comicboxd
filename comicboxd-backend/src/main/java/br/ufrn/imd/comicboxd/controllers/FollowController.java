package br.ufrn.imd.comicboxd.controllers;

import br.ufrn.imd.comicboxd.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    private Long getLoggedUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return Long.parseLong(authentication.getName());
    }

    @PostMapping("/{id}/follow")
    public ResponseEntity<Void> followUser(@PathVariable Long id) {
        Long currentUserId = getLoggedUserId();
        followService.followUser(id, currentUserId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/follow")
    public ResponseEntity<Void> unfollowUser(@PathVariable Long id) {
        Long currentUserId = getLoggedUserId();
        followService.unfollowUser(id, currentUserId);
        return ResponseEntity.ok().build();
    }

    // Endpoint essencial para o Frontend saber se pinta o botão de Verde ou Cinza
    @GetMapping("/{id}/check-follow")
    public ResponseEntity<Boolean> isFollowing(@PathVariable Long id) {
        Long currentUserId = getLoggedUserId();
        boolean isFollowing = followService.isFollowing(currentUserId, id);
        return ResponseEntity.ok(isFollowing);
    }

    @GetMapping("/{id}/follow")
    public ResponseEntity<?> getStats(@PathVariable Long id) {
        long followers = followService.countFollowers(id);
        long following = followService.countFollowing(id);

        return ResponseEntity.ok(java.util.Map.of(
                "followers", followers,
                "following", following
        ));
    }
}
