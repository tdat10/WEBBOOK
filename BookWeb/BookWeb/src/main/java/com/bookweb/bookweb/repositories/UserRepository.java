package com.bookweb.bookweb.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bookweb.bookweb.models.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    List<User> findByUsernameAndPassword(String username, String password);
    User findByUsername(@Param(value = "username")String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    
    
}
