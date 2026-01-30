package br.ufrn.imd.comicboxd.dtos;

import java.util.Set;

public record UserResponseDTO(Long id, String username, String email, Set<String> roles) {
}
