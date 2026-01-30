package br.ufrn.imd.comicboxd.controllers;

import br.ufrn.imd.comicboxd.dtos.LoginRequestDTO;
import br.ufrn.imd.comicboxd.dtos.LoginResponseDTO;
import br.ufrn.imd.comicboxd.dtos.UserResponseDTO;
import br.ufrn.imd.comicboxd.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api")
public class TokenController {


    private final UserService userService;
    private final JwtEncoder jwtEncoder;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public TokenController(UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder, JwtEncoder jwtEncoder) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtEncoder = jwtEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO){
        UserResponseDTO user = userService.authenticate(loginRequestDTO);

        var now = Instant.now();
        var expiresIn = 300L;

        var claims = JwtClaimsSet.builder()
                .issuer("comicboxd-backend")
                .subject(user.id().toString())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiresIn))
                .build();

        var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return ResponseEntity.ok(new LoginResponseDTO(jwtValue, expiresIn, user.roles()));
    }
}
