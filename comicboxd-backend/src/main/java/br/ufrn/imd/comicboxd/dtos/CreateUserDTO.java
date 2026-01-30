package br.ufrn.imd.comicboxd.dtos;

import jakarta.validation.constraints.NotBlank;

public record CreateUserDTO(
        @NotBlank
        String email,

        @NotBlank
        String username,

        @NotBlank
        String password
) {}
