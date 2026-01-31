package br.ufrn.imd.comicboxd.dtos;

import java.util.Set;

public record LoginResponseDTO(String accessToken, Long expiresIn, Set<String> roles) {
}
