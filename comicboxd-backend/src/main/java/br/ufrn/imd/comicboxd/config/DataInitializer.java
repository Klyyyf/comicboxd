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

            Map<String, String> comicsMap = Map.of(
                    "Batman: O Cavaleiro das Trevas", "https://static.hq-now.com/hqs/hqs/uploads/picture/image/926101/cv_-_03_pag_-_00.jpg",
                    "Homem-Aranha", "https://static.hq-now.com/hqs/hqs/uploads/picture/image/946830/ha_-_11_pag_-_00.jpg",
                    "Sandman", "https://static.hq-now.com/hqs/hqs/uploads/picture/image/75497/Sandman.75.HQ.BR.02DEZ04.GibiHQ.pdf-000.jpg",
                    "Reino do Amanhã", "https://static.hq-now.com/hqs/hqs/uploads/picture/image/17838/Digitalizar0159.jpg",
                    "Watchmen", "https://static.hq-now.com/hqs/hqs/uploads/picture/image/37206/Watchmen.12.de.12.HQ.BR.27AGO05.GibiHQ.pdf-000.jpg",
                    "Coringa", "https://static.hq-now.com/hqs/hqs/uploads/picture/image/500189/001.jpg",
                    "Dragon Ball", "https://static.hq-now.com/hqs/hqs/uploads/picture/image/660413/Dragon_Ball_-_Artbook_-_01.jpg",
                    "The Boys", "https://static.hq-now.com/hqs/hqs/uploads/picture/image/854688/The_Boys_072__2012___HD___digital-Empire__001.jpg",
                    "Demolidor", "https://static.hq-now.com/hqs/hqs/uploads/picture/image/426882/Daredevil-507-001.jpg",
                    "X-Men: A Saga da Fênix Negra", "https://static.hq-now.com/hqs/hqs/uploads/picture/image/295400/Os_Fabulosos_X-Men_-_A_Saga_da_F_nix_Negra__000.JPG"
            );


            String[] categorias = {"MARVEL", "DC", "MANGA", "INDIE"};

            for (Map.Entry<String, String> entry : comicsMap.entrySet()) {
                Comic comic = new Comic();

                comic.setTitle(entry.getKey());
                comic.setCoverUrl(entry.getValue());

                comic.setDescription("Esta é a descrição oficial da HQ " + entry.getKey() + ". Uma obra prima indispensável.");
                comic.setCategory(categorias[random.nextInt(categorias.length)]);
                comic.setReleaseDate(
                        LocalDate.now()
                                .minusYears(random.nextInt(20))
                                .minusMonths(random.nextInt(12))
                );

                comic.setAuthors(authors);
                comics.add(comic);
            }
            comicRepository.saveAll(comics);
            System.out.println("✅ 15 HQs e Autores cadastrados com sucesso!");
        };
    }
}