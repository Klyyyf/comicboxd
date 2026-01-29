package br.ufrn.imd.comicboxd.service;

import br.ufrn.imd.comicboxd.dtos.ComicDTO;
import br.ufrn.imd.comicboxd.model.Author;
import br.ufrn.imd.comicboxd.model.Comic;
import br.ufrn.imd.comicboxd.repositories.AuthorRepository;
import br.ufrn.imd.comicboxd.repositories.ComicRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ComicService {
    private final ComicRepository comicRepository;
    private final AuthorRepository authorRepository;

    @Transactional
    public ComicDTO save(ComicDTO dto) {
        Comic entity = new Comic();

        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setCategory(dto.getCategory());
        entity.setCoverUrl(dto.getCoverUrl());
        entity.setReleaseDate(dto.getReleaseDate());

        if (dto.getAuthorsIds() != null && dto.getAuthorsIds().isEmpty()) {
            List<Author> authorsFound = authorRepository.findAllById(dto.getAuthorsIds());

            entity.setAuthors(authorsFound);
        }

        Comic savedEntity = comicRepository.save(entity);

        dto.setId(savedEntity.getId());
        return dto;
    }
}
