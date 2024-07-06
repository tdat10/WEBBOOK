package com.bookweb.bookweb.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bookweb.bookweb.models.Genre;


@Repository
public interface  GenreRepository extends  MongoRepository<Genre, String>{

    Genre findByName(@Param(value = "name") String name);   
}
