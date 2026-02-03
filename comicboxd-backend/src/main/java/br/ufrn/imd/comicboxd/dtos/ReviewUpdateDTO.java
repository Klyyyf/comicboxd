package br.ufrn.imd.comicboxd.dtos;

public record ReviewUpdateDTO(
        Integer rating,
        String comment
) {}