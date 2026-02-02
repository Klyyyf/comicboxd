package br.ufrn.imd.comicboxd.service;

import br.ufrn.imd.comicboxd.dtos.ComicDTO;
import br.ufrn.imd.comicboxd.model.Author;
import br.ufrn.imd.comicboxd.model.Comic;
import br.ufrn.imd.comicboxd.model.User;
import br.ufrn.imd.comicboxd.repositories.AuthorRepository;
import br.ufrn.imd.comicboxd.repositories.ComicRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

        if (dto.getAuthorNames() != null &&  !dto.getAuthorNames().isEmpty()) {
            List<Author> authors = new ArrayList<>();

            for (String name : dto.getAuthorNames()) {
                String cleanName = name.trim();

                Optional<Author> existingAuthor = authorRepository.findByNameIgnoreCase(cleanName);

                if (existingAuthor.isPresent()) {
                    authors.add(existingAuthor.get());
                } else {
                    Author newAuthor = new Author();
                    newAuthor.setName(cleanName);

                    Author savedAuthor = authorRepository.save(newAuthor);
                    authors.add(savedAuthor);
                }
            }
            entity.setAuthors(authors);
        }
        Comic savedComic = comicRepository.save(entity);
        return toDTO(savedComic);
    }

    @Transactional
    public ComicDTO update(Long id, ComicDTO dto) {
        Comic entity = comicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("HQ não encontrada com id:" + id));

        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setCategory(dto.getCategory());
        entity.setCoverUrl(dto.getCoverUrl());
        entity.setReleaseDate(dto.getReleaseDate());

        if (dto.getAuthorsIds() != null) {
            List<Author> authorsFound = authorRepository.findAllById(dto.getAuthorsIds());

            entity.setAuthors(authorsFound);
        }

        Comic savedEntity = comicRepository.save(entity);

        return toDTO(savedEntity);
    }

    @Transactional
    public void delete(Long id) {
        Comic entity = comicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("HQ não encontrada com id:" + id));

        comicRepository.delete(entity);
    }

    private ComicDTO toDTO(Comic comic) {
        ComicDTO comicDTO = new ComicDTO();

        comicDTO.setId(comic.getId());
        comicDTO.setTitle(comic.getTitle());
        comicDTO.setDescription(comic.getDescription());
        comicDTO.setCategory(comic.getCategory());
        comicDTO.setCoverUrl(comic.getCoverUrl());
        comicDTO.setReleaseDate(comic.getReleaseDate());

        if (comic.getAuthors() != null) {
            List<Long> ids = comic.getAuthors().stream()
                    .map(Author::getId)
                    .toList();

            comicDTO.setAuthorsIds(ids);
        }

        return comicDTO;
    }

    public Page<ComicDTO> findAll(Pageable pageable, String category, String search) {
        Page<Comic> comicPage;

        if (search != null &&  !search.isBlank()) {
            comicPage = comicRepository.findByTitleContainingIgnoreCase(search, pageable);
        } else if (category != null && !category.isBlank()) {
            comicPage = comicRepository.findByCategory(category, pageable);
        } else {
            comicPage = comicRepository.findAll(pageable);
        }

        return comicPage.map(this::toDTO);
    }

    public ComicDTO findById(Long id) {
        Comic comic = findEntityById(id);

        return toDTO(comic);
    }

    public Comic findEntityById(Long comicId){
        return comicRepository.findById(comicId).orElseThrow(()-> new EntityNotFoundException("Comic not found"));
    }


}
