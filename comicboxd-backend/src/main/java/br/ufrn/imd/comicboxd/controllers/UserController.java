package br.ufrn.imd.comicboxd.controllers;


import br.ufrn.imd.comicboxd.dtos.CreateUserDTO;
import br.ufrn.imd.comicboxd.model.Role;
import br.ufrn.imd.comicboxd.model.User;
import br.ufrn.imd.comicboxd.repositories.RoleRepository;
import br.ufrn.imd.comicboxd.repositories.UserRepository;
import br.ufrn.imd.comicboxd.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("api/users")
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


}
