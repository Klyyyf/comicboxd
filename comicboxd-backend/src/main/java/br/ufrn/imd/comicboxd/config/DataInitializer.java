package br.ufrn.imd.comicboxd.config;


import br.ufrn.imd.comicboxd.model.Author;
import br.ufrn.imd.comicboxd.model.Comic;
import br.ufrn.imd.comicboxd.model.Role;
import br.ufrn.imd.comicboxd.model.User;
import br.ufrn.imd.comicboxd.repositories.AuthorRepository;
import br.ufrn.imd.comicboxd.repositories.ComicRepository;
import br.ufrn.imd.comicboxd.repositories.RoleRepository;
import br.ufrn.imd.comicboxd.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Configuration
public class DataInitializer {

    @Bean
    @Transactional
    public CommandLineRunner initAdmin(UserRepository userRepository,
                                       RoleRepository roleRepository,
                                       PasswordEncoder passwordEncoder) {
        return args -> {

            var roleAdmin = roleRepository.findByRoleName("ROLE_ADMIN");

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


    @Bean
    @Transactional
    public CommandLineRunner initData(ComicRepository comicRepository, AuthorRepository authorRepository) {
        return args -> {

            Author a2 = new Author(); a2.setName("Stan Lee");

            List<Author> authors = new ArrayList<>();
            authors.add(a2);

            authorRepository.save(a2);

            if (comicRepository.count() > 10) {
                System.out.println("O banco já possui HQs. Pulei a criação.");
                return;
            }

            System.out.println("Iniciando o cadastro de 15 HQs...");
            List<Comic> comics = new ArrayList<>();
            Random random = new Random();

            String[] titulos = {
                    "Batman: O Cavaleiro das Trevas", "Homem-Aranha: Azul", "Watchmen",
                    "V de Vingança", "Reino do Amanhã", "Sandman: Prelúdios",
                    "X-Men: A Saga da Fênix", "Demolidor: A Queda de Murdock", "Maus",
                    "Persépolis", "Akira Vol. 1", "Dragon Ball Z",
                    "Naruto Gold", "One Piece", "Berserk"
            };

            String[] categorias = {"Super-herói", "Mangá", "Graphic Novel", "Sci-Fi", "Terror"};

            for (int i = 0; i < titulos.length; i++) {
                Comic comic = new Comic();

                comic.setTitle(titulos[i]);
                comic.setDescription("Esta é a descrição oficial da HQ " + titulos[i] + ". Uma obra prima indispensável.");
                comic.setCategory(categorias[random.nextInt(categorias.length)]);

                comic.setReleaseDate(LocalDate.now().minusYears(random.nextInt(20)).minusMonths(random.nextInt(12)));


                comic.setCoverUrl("https://placecats.com/neo_banana/200/100");

                comic.setAuthors(authors);

                comics.add(comic);
            }

            comicRepository.saveAll(comics);
            System.out.println("✅ 15 HQs e Autores cadastrados com sucesso!");
        };
    }
}