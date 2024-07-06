package com.bookweb.bookweb.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bookweb.bookweb.models.User;
import com.bookweb.bookweb.payload.SignupResquest;
import com.bookweb.bookweb.repositories.UserRepository;
import com.bookweb.bookweb.services.imp.LoginServiceImp;

/**
 * LoginService
 */
@Service
public class LoginService implements LoginServiceImp{

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public List<User> getAllUser(){
        
        return null;
    }

    public boolean checkLogin(String username, String password){
        
        User user  =  userRepository.findByUsername(username);
        return passwordEncoder.matches(password, user.getPassword());
    }

    @Override
    public boolean addUser(SignupResquest signupResquest) {
        if (userRepository.existsByUsername(signupResquest.getUsername()) || userRepository.existsByEmail(signupResquest.getEmail())) {
            return false; 
        }
        else {
        User user = new User();
        user.setUsername(signupResquest.getUsername());
        var encodePassword = passwordEncoder.encode(signupResquest.getPassword());
        user.setPassword(encodePassword);
        user.setEmail(signupResquest.getEmail());
        user.setRole("USER");

        try {
            userRepository.save(user);
            return true;
        }
        catch(Exception e) {
            return false;
        }
        }
        
        
    }
    
    
}