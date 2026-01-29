package br.ufrn.imd.comicboxd.controllers;

import br.ufrn.imd.comicboxd.dtos.ComicDTO;
import br.ufrn.imd.comicboxd.service.ComicService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public ResponseEntity<Page<ComicDTO>> findAll(
            @PageableDefault(size = 10, sort = "title") Pageable pageable,
            @RequestParam(required = false) String category
    ) {
        Page<ComicDTO> comics = comicService.findAll(pageable, category);
        return ResponseEntity.ok(comics);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComicDTO> update(@PathVariable Long id, @RequestBody @Valid ComicDTO dto) {
        ComicDTO updateComic = comicService.update(id, dto);

        return ResponseEntity.ok(updateComic);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ComicDTO> delete(@PathVariable Long id) {
        comicService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
