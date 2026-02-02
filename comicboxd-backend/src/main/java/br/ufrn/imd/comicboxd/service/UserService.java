package br.ufrn.imd.comicboxd.service;

import br.ufrn.imd.comicboxd.dtos.*;
import br.ufrn.imd.comicboxd.model.Role;
import br.ufrn.imd.comicboxd.model.User;
import br.ufrn.imd.comicboxd.repositories.RoleRepository;
import br.ufrn.imd.comicboxd.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    public void createUser(CreateUserDTO dto) {
        if (userRepository.findByEmail(dto.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado");
        }

        Role basicRole = roleRepository.findByRoleName("ROLE_BASIC")
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "Role 'ROLE_BASIC' não encontrada. Verifique se o data.sql rodou."
                ));

        User user = new User();
        user.setEmail(dto.email());
        user.setUsername(dto.username());
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setRoles(Set.of(basicRole));

        userRepository.save(user);
    }

    public UserDTO findByUsername(String identifier) {
        User user = findEntity(identifier);
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail());
    }

    public UserDTO updateUser(String identifier, UpdateUserDTO dadosAtualizados) {
        User user = findEntity(identifier);

        if (dadosAtualizados.nome() != null && !dadosAtualizados.nome().isBlank()) {
            user.setUsername(dadosAtualizados.nome());
        }

        if (dadosAtualizados.email() != null && !dadosAtualizados.email().isBlank()) {
            user.setEmail(dadosAtualizados.email());
        }

        userRepository.save(user);

        return new UserDTO(user.getId(), user.getUsername(), user.getEmail());
    }

    private User findEntity(String identifier) {
        // Tenta tratar como ID numérico
        try {
            Long id = Long.parseLong(identifier.trim());
            return userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado pelo ID: " + id));
        } catch (NumberFormatException e) {
            // Não é número, ignora e segue...
        }

        // Trata como Texto (Username ou Email)
        return userRepository.findByUsername(identifier)
                .or(() -> userRepository.findByEmail(identifier))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado: " + identifier));
    }

    public UserResponseDTO findById(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Set<String> roles = user.getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toSet());
        return new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail(), roles);
    }

    public User findEntityById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public UserResponseDTO authenticate(LoginRequestDTO loginRequestDTO) {
        User user = userRepository.findByEmail(loginRequestDTO.email())
                .orElseThrow(() -> new BadCredentialsException("Email or Password incorrect"));

        if (!passwordEncoder.matches(loginRequestDTO.password(), user.getPassword())) {
            throw new BadCredentialsException("Email or password incorrect");
        }
        Set<String> roles = user.getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toSet());

        return new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail(), roles);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));
    }
}