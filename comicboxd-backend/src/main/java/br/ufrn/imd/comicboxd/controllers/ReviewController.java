package br.ufrn.imd.comicboxd.controllers;


import br.ufrn.imd.comicboxd.dtos.ReviewRequestDTO;
import br.ufrn.imd.comicboxd.dtos.ReviewResponseDTO;
import br.ufrn.imd.comicboxd.dtos.ReviewUpdateDTO;
import br.ufrn.imd.comicboxd.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@Tag(name = "Reviews", description = "Endpoints para gerenciamento de Avaliações e Comentários")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @Operation(summary = "Criar Review", description = "Cria uma nova avaliação para uma HQ")
    @PostMapping
    public ResponseEntity<ReviewResponseDTO> createReview(@RequestBody ReviewRequestDTO reviewRequestDTO) {
        ReviewResponseDTO review = reviewService.createReview(reviewRequestDTO);
        return ResponseEntity.status(201).body(review);
    }

    @Operation(summary = "Buscar Review por ID", description = "Retorna os detalhes de uma avaliação específica")
    @GetMapping("/{id}")
    public ResponseEntity<ReviewResponseDTO> getReviewById(@PathVariable("id") Long reviewId) {
        ReviewResponseDTO review = reviewService.getReviewById(reviewId);
        return  ResponseEntity.ok().body(review);
    }

    @Operation(summary = "Listar todas as Reviews", description = "Retorna uma lista completa de todas as avaliações cadastradas")
    @GetMapping
    public ResponseEntity<List<ReviewResponseDTO>> getAllReviews() {
        List<ReviewResponseDTO> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok().body(reviews);
    }

    @Operation(summary = "Listar Reviews por HQ", description = "Retorna todas as avaliações de uma HQ específica, incluindo o nome do usuário")
    @GetMapping("/comic/{comicId}")
    public ResponseEntity<List<ReviewResponseDTO>> getReviewsByComicId(@PathVariable Long comicId) {
        List<ReviewResponseDTO> reviews = reviewService.getReviewsByComicId(comicId);
        return ResponseEntity.ok().body(reviews);
    }

    @Operation(summary = "Listar Reviews por usuario", description = "Retorna todas as avaliações de uma HQ específica, incluindo o nome do usuário")
    @GetMapping("/user")
    public ResponseEntity<List<ReviewResponseDTO>> getReviewsByUserId() {
        List<ReviewResponseDTO> reviews = reviewService.getAllReviewsByUserId();
        return ResponseEntity.ok().body(reviews);
    }

    @Operation(summary = "Deletar Review", description = "Remove uma avaliação. Requer o ID da review e o ID do usuário dono da review")
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReviewById(reviewId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Atualizar Review", description = "Atualiza o texto ou nota de uma avaliação existente")
    @PutMapping("/{id}")
    public ResponseEntity<ReviewResponseDTO> updated(@PathVariable Long id, @RequestBody ReviewUpdateDTO data) {
        ReviewResponseDTO review = reviewService.updateReview(id, data);
        return ResponseEntity.ok().body(review);
    }

}

