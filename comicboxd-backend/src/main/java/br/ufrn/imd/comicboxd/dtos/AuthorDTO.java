package br.ufrn.imd.comicboxd.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthorDTO {
    private Long id;

    @NotBlank
    private String name;
}
