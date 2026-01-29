package br.ufrn.imd.comicboxd.dtos;


public record ReviewRequestDTO(float rating, String comment, long userId, long comicId) {
}
