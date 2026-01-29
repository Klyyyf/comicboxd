package br.ufrn.imd.comicboxd.controllers;

import br.ufrn.imd.comicboxd.dtos.AuthorDTO;
import br.ufrn.imd.comicboxd.service.AuthorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/authors")
@RequiredArgsConstructor
public class AuthorController {
    private final AuthorService authorService;

    @PostMapping
    public ResponseEntity<AuthorDTO> save(@RequestBody @Valid AuthorDTO dto) {
        AuthorDTO newAuthor = authorService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAuthor);
    }

    @GetMapping
    public ResponseEntity<Page<AuthorDTO>> findAll(
            @PageableDefault(size = 20, sort = "name") Pageable pageable,
            @RequestParam(required = false) String name
    ){
        Page<AuthorDTO> authorDTOPage = authorService.findAll(pageable,name);
        return ResponseEntity.ok(authorDTOPage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AuthorDTO> update(@PathVariable Long id, @RequestBody @Valid AuthorDTO dto) {
        AuthorDTO updatedAuthor = authorService.update(id, dto);
        return ResponseEntity.ok(updatedAuthor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        authorService.delete(id);
        return  ResponseEntity.noContent().build();
    }
}
