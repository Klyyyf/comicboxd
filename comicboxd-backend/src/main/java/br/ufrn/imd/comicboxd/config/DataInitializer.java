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
public class
DataInitializer {

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

            if (comicRepository.count() > 0) {
                System.out.println("O banco já possui HQs. Pulei a criação inicial.");
                return;
            }

            System.out.println("Iniciando o seed do banco de dados...");

            Author stanLee = new Author(); stanLee.setName("Stan Lee");
            Author frankMiller = new Author(); frankMiller.setName("Frank Miller");
            Author neilGaiman = new Author(); neilGaiman.setName("Neil Gaiman");
            Author alanMoore = new Author(); alanMoore.setName("Alan Moore");
            Author akiraToriyama = new Author(); akiraToriyama.setName("Akira Toriyama");
            Author eiichiroOda = new Author(); eiichiroOda.setName("Eiichiro Oda");
            Author chrisClaremont = new Author(); chrisClaremont.setName("Chris Claremont");
            Author markWaid = new Author(); markWaid.setName("Mark Waid");
            Author brianAzzarello = new Author(); brianAzzarello.setName("Brian Azzarello");
            Author scottSnyder = new Author(); scottSnyder.setName("Scott Snyder");
            Author jasonAaron = new Author(); jasonAaron.setName("Jason Aaron");
            Author kellyThompson = new Author(); kellyThompson.setName("Kelly Thompson");
            Author jonathanHickman = new Author(); jonathanHickman.setName("Jonathan Hickman");
            Author tomTaylor = new Author(); tomTaylor.setName("Tom Taylor");
            Author robertKirkman = new Author(); robertKirkman.setName("Robert Kirkman");
            Author masashiKishimoto = new Author(); masashiKishimoto.setName("Masashi Kishimoto");
            Author gegeAkutami = new Author(); gegeAkutami.setName("Gege Akutami");

            authorRepository.saveAll(Arrays.asList(
                    stanLee, frankMiller, neilGaiman, alanMoore,
                    akiraToriyama, eiichiroOda, chrisClaremont, markWaid, brianAzzarello,
                    scottSnyder, jasonAaron, kellyThompson, jonathanHickman,
                    tomTaylor, robertKirkman, masashiKishimoto, gegeAkutami
            ));

            List<Comic> comics = new ArrayList<>();

            addComic(comics, "Batman: O Cavaleiro das Trevas",
                    "https://upload.wikimedia.org/wikipedia/pt/7/74/The_Dark_Knight_Returns.jpg",
                    "DC", frankMiller, "1986-02-01");

            addComic(comics, "Homem-Aranha",
                    "https://upload.wikimedia.org/wikipedia/pt/3/35/Amazing_Fantasy_15.jpg",
                    "MARVEL", stanLee, "1962-08-01");

            addComic(comics, "Sandman",
                    "https://filfelix.com.br/wp-content/uploads/2015/07/Sandman-Edi%C3%A7%C3%A3o-Definitiva-Vol.-2-Capa-Panini.jpg",
                    "DC", neilGaiman, "1989-01-01");

            addComic(comics, "Reino do Amanhã",
                    "https://m.media-amazon.com/images/I/71GAGHpyAmL._AC_UF1000,1000_QL80_.jpg",
                    "DC", markWaid, "1996-05-01");

            addComic(comics, "Watchmen",
                    "https://static.hq-now.com/hqs/hqs/uploads/picture/image/37206/Watchmen.12.de.12.HQ.BR.27AGO05.GibiHQ.pdf-000.jpg",
                    "DC", alanMoore, "1986-09-01");

            addComic(comics, "Batman: A Piada Mortal",
                    "https://upload.wikimedia.org/wikipedia/en/3/32/Killingjoke.JPG",
                    "DC", alanMoore, "1988-03-01");

            addComic(comics, "Dragon Ball",
                    "https://m.media-amazon.com/images/I/91KQLMVwqBL._UF1000,1000_QL80_.jpg",
                    "MANGA", akiraToriyama, "1984-12-03");

            addComic(comics, "One Piece",
                    "https://m.media-amazon.com/images/I/716EGgqzyOL._AC_UF1000,1000_QL80_.jpg",
                    "MANGA", eiichiroOda, "1997-07-22");

            addComic(comics, "Demolidor",
                    "https://comicboom.com.br/shop/wp-content/uploads/2025/03/s897-fwebp-1-3.webp",
                    "MARVEL", frankMiller, "1986-02-01");

            addComic(comics, "X-Men: A Saga da Fênix Negra",
                    "https://m.media-amazon.com/images/I/91pc3hQWkRL._UF1000,1000_QL80_.jpg",
                    "MARVEL", chrisClaremont, "1980-01-01");

            addComic(comics, "Absolute Batman",
                    "https://www.comix.com.br/media/catalog/product/cache/368852526d07b47f9ba19ccfaea17e2a/a/b/absolute_1.jpg",
                    "DC", scottSnyder, "2024-10-09");

            addComic(comics, "Absolute Superman",
                    "https://www.comix.com.br/media/catalog/product/cache/368852526d07b47f9ba19ccfaea17e2a/s/u/super_anabsule1.jpg",
                    "DC", jasonAaron, "2024-11-06");

            addComic(comics, "Absolute Wonder Woman",
                    "https://www.comicsandsignatures.com/cdn/shop/files/0924DC017_a540e0cd-485e-45b8-abab-88a8805030e2.jpg",
                    "DC", kellyThompson, "2024-10-23");

            addComic(comics, "Asa Noturna: Saltando nas Sombras",
                    "https://m.media-amazon.com/images/I/61MzVDSi7rL._AC_UF1000,1000_QL80_.jpg",
                    "DC", tomTaylor, "2021-03-16");

            addComic(comics, "Invencível",
                    "https://m.media-amazon.com/images/I/71W3qFnTRSL._AC_UF1000,1000_QL80_.jpg",
                    "INDIE", robertKirkman, "2003-01-22");

            addComic(comics, "Naruto",
                    "https://m.media-amazon.com/images/I/91Ye5aZA4FL._UF1000,1000_QL80_.jpg",
                    "MANGA", masashiKishimoto, "2000-03-03");

            addComic(comics, "Jujutsu Kaisen",
                    "https://m.media-amazon.com/images/I/81jxwTCbzTL._UF1000,1000_QL80_.jpg",
                    "MANGA", gegeAkutami, "2018-03-05");

            comicRepository.saveAll(comics);
            System.out.println("Cadastro Finalizado: HQs com autores, categorias e datas corretas!");
        };
    }

    private void addComic(List<Comic> comics, String title, String url, String category, Author author, String dateStr) {
        Comic comic = new Comic();
        comic.setTitle(title);
        comic.setCoverUrl(url);
        comic.setCategory(category);

        List<Author> authorList = new ArrayList<>();
        authorList.add(author);
        comic.setAuthors(authorList);

        comic.setDescription("Sinopse oficial de " + title + ". Uma obra essencial criada por " + author.getName() + ".");

        // Converte a string YYYY-MM-DD para LocalDate
        comic.setReleaseDate(LocalDate.parse(dateStr));

        comics.add(comic);
    }
}