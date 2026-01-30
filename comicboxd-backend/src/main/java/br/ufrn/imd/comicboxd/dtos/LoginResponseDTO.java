package br.ufrn.imd.comicboxd.dtos;

import java.util.Set;

public record LoginResponseDTO(String acessToken, Long expiresIn, Set<String> roles) {
}
