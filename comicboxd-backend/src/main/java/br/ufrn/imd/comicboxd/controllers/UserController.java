package br.ufrn.imd.comicboxd.controllers;

import br.ufrn.imd.comicboxd.dtos.CreateUserDTO;
import br.ufrn.imd.comicboxd.dtos.UserDTO;
import br.ufrn.imd.comicboxd.model.Author;
import br.ufrn.imd.comicboxd.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "Endpoints para gerenciamento de Usuários e Perfil")
public class UserController {

   private final UserService userService;

    public  UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Criar Usuário", description = "Registra um novo usuário no sistema com a role básica")
    @PostMapping()
    public ResponseEntity<Void> newUser(@RequestBody CreateUserDTO dto) {
        userService.createUser(dto);
        return ResponseEntity.status(201).build();
    }

    @Operation(summary = "Obter Perfil Atual", description = "Retorna os dados (ID, Nome, Email) do usuário logado baseando-se no Token JWT")
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser() {
        String identificador = SecurityContextHolder.getContext().getAuthentication().getName();

        System.out.println(">>> TOKEN DIZ QUE O USUÁRIO É: [" + identificador + "]");

        UserDTO user = userService.findByUsername(identificador);

        return ResponseEntity.ok(user);
    }

    @Operation(summary = "Atualizar Perfil", description = "Atualiza o nome de usuário ou email do usuário logado")
    @PutMapping("/me")
    public ResponseEntity<UserDTO> updateUser(@RequestBody br.ufrn.imd.comicboxd.dtos.UpdateUserDTO dto) {
        String identifier = SecurityContextHolder.getContext().getAuthentication().getName();

        UserDTO userAtualizado = userService.updateUser(identifier, dto);

        return ResponseEntity.ok(userAtualizado);
    }
}
