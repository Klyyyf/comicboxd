package br.ufrn.imd.comicboxd.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ComicDTO {
    private Long id;

    @NotBlank(message = "O título é obrigatório.")
    private String title;

    @Size(max = 2000, message = "A sinopse é muito longa.")
    private String description;

    @NotBlank(message = "A categoria é obrigatória.")
    private String category;

    private String coverUrl;

    @NotNull(message = "A data de lançamento é obrigatória.")
    private LocalDate releaseDate;

    private List<Long> authorsIds;
    private List<String> authorNames;
}
