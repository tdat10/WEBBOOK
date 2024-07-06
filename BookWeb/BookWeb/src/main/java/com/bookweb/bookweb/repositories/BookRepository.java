package com.bookweb.bookweb.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.bookweb.bookweb.models.Book;

@Repository
public interface BookRepository extends MongoRepository<Book, String>{
  
}
