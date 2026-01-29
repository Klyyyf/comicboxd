package br.ufrn.imd.comicboxd.service;

import br.ufrn.imd.comicboxd.dtos.AuthorDTO;
import br.ufrn.imd.comicboxd.model.Author;
import br.ufrn.imd.comicboxd.repositories.AuthorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthorService {
    private final AuthorRepository authorRepository;

    @Transactional
    public AuthorDTO save(AuthorDTO dto) {
        Author entity = new Author();

        entity.setName(dto.getName());

        Author savedEntity = authorRepository.save(entity);

        dto.setId(savedEntity.getId());

        return dto;
    }
}
