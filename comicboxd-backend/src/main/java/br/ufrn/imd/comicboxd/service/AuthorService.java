package br.ufrn.imd.comicboxd.service;

import br.ufrn.imd.comicboxd.dtos.AuthorDTO;
import br.ufrn.imd.comicboxd.model.Author;
import br.ufrn.imd.comicboxd.repositories.AuthorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public Page<AuthorDTO> findAll(Pageable pageable, String name) {
        Page<Author> authorPage;

        if (name != null && !name.isEmpty()) {
            authorPage = authorRepository.findByNameContaining(name, pageable);
        } else {
            authorPage = authorRepository.findAll(pageable);
        }

        return authorPage.map(this::toDTO);
    }

    @Transactional
    public AuthorDTO update(Long id, AuthorDTO dto) {
        Author entity = authorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Autor não encontrado com id:" + id));

        entity.setName(dto.getName());

        Author savedEntity = authorRepository.save(entity);
        return toDTO(savedEntity);
    }

    @Transactional
    public void delete(Long id) {
        Author entity = authorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Autor não encontrado com id:" + id));

        authorRepository.delete(entity);
    }

    private AuthorDTO toDTO(Author entity) {
        AuthorDTO dto = new AuthorDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        return dto;
    }
}
