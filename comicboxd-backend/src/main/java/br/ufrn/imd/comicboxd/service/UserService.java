package br.ufrn.imd.comicboxd.service;


import br.ufrn.imd.comicboxd.dtos.UserResponseDTO;
import br.ufrn.imd.comicboxd.model.User;
import br.ufrn.imd.comicboxd.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.annotations.NotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService{

    @Autowired
    private UserRepository userRepository;

    public UserResponseDTO findById(Long userId){
        User user = userRepository.findById(userId).orElseThrow(()-> new EntityNotFoundException("User not found"));
        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail()
        );
    }

    public User findEntityById(Long userId){
        return userRepository.findById(userId).orElseThrow(()-> new EntityNotFoundException("User not found"));
    }
}
