package br.ufrn.imd.comicboxd.controllers;

import br.ufrn.imd.comicboxd.dtos.AuthorDTO;
import br.ufrn.imd.comicboxd.service.AuthorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
