package br.ufrn.imd.comicboxd.controllers;

import br.ufrn.imd.comicboxd.dtos.ComicDTO;
import br.ufrn.imd.comicboxd.service.ComicService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Comics", description = "Endpoints para gerenciamento de HQs")
public class ComicController {
    private final ComicService comicService;

    @Operation(summary = "Cadastrar HQ", description = "Cria uma nova HQ no sistema vinculada aos autores informados")
    @PostMapping
    public ResponseEntity<ComicDTO> save(@RequestBody @Valid ComicDTO dto) {
        ComicDTO newComic = comicService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(newComic);
    }

    @Operation(summary = "Listar HQs", description = "Retorna uma lista paginada de HQs. Permite filtrar por categoria (ex: ?category=Terror)")
    @GetMapping
    public ResponseEntity<Page<ComicDTO>> findAll(
            @PageableDefault(size = 20, sort = "title") Pageable pageable,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search
    ) {
        Page<ComicDTO> comics = comicService.findAll(pageable, category, search);
        return ResponseEntity.ok(comics);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComicDTO> findComicById(@PathVariable Long id) {
        ComicDTO comic = comicService.findById(id);
        return ResponseEntity.ok(comic);
    }

    @Operation(summary = "Atualizar HQ", description = "Atualiza os dados de uma HQ existente (título, sinopse, autores, etc)")
    @PutMapping("/{id}")
    public ResponseEntity<ComicDTO> update(@PathVariable Long id, @RequestBody @Valid ComicDTO dto) {
        ComicDTO updateComic = comicService.update(id, dto);

        return ResponseEntity.ok(updateComic);
    }

    @Operation(summary = "Deletar HQ", description = "Remove uma HQ do banco de dados pelo ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<ComicDTO> delete(@PathVariable Long id) {
        comicService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
