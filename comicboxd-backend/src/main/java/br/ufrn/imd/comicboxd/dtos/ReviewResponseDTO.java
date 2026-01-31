package br.ufrn.imd.comicboxd.dtos;

import java.time.LocalDateTime;

public record ReviewResponseDTO(Long id, float rating, String comment, LocalDateTime createdAt, String username) {
}
