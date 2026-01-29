package br.ufrn.imd.comicboxd.controllers;

import br.ufrn.imd.comicboxd.dtos.ComicDTO;
import br.ufrn.imd.comicboxd.service.ComicService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comics")
@RequiredArgsConstructor
public class ComicController {
    private final ComicService comicService;

    @PostMapping
    public ResponseEntity<ComicDTO> save(@RequestBody @Valid ComicDTO dto) {
        ComicDTO newComic = comicService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newComic);
    }
}
