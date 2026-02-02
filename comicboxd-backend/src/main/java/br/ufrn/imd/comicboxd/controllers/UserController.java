package br.ufrn.imd.comicboxd.controllers;

import br.ufrn.imd.comicboxd.dtos.CreateUserDTO;
import br.ufrn.imd.comicboxd.dtos.UserDTO;
import br.ufrn.imd.comicboxd.model.Author;
import br.ufrn.imd.comicboxd.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

   private final UserService userService;

    public  UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping()
    public ResponseEntity<Void> newUser(@RequestBody CreateUserDTO dto) {
        userService.createUser(dto);
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser() {
        String identificador = SecurityContextHolder.getContext().getAuthentication().getName();

        System.out.println(">>> TOKEN DIZ QUE O USUÁRIO É: [" + identificador + "]");

        UserDTO user = userService.findByUsername(identificador);

        return ResponseEntity.ok(user);
    }

    @PutMapping("/me")
    public ResponseEntity<UserDTO> updateUser(@RequestBody br.ufrn.imd.comicboxd.dtos.UpdateUserDTO dto) {
        String identifier = SecurityContextHolder.getContext().getAuthentication().getName();

        UserDTO userAtualizado = userService.updateUser(identifier, dto);

        return ResponseEntity.ok(userAtualizado);
    }

}
