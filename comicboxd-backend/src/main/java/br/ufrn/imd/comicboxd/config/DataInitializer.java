package br.ufrn.imd.comicboxd.config;


import br.ufrn.imd.comicboxd.model.Role;
import br.ufrn.imd.comicboxd.model.User;
import br.ufrn.imd.comicboxd.repositories.RoleRepository;
import br.ufrn.imd.comicboxd.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    @Transactional
    public CommandLineRunner initAdmin(UserRepository userRepository,
                                       RoleRepository roleRepository,
                                       PasswordEncoder passwordEncoder) {
        return args -> {

            var roleAdmin = roleRepository.findByRoleName("ADMIN");

            if (roleAdmin.isEmpty()) {
                System.out.println("Role admin não encontrada! Verifique o data.sql");
                return;
            }
            var adminUser = userRepository.findByEmail("admin@gmail.com");

            if (adminUser.isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@gmail.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRoles(Set.of(roleAdmin.get()));

                userRepository.save(admin);
                System.out.println("Usuário ADMIN criado com sucesso: admin@gmail.com / admin123");
            } else {
                System.out.println("Usuário ADMIN já existe.");
            }
        };
    }
}