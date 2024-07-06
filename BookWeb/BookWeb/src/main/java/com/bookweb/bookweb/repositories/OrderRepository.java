package com.bookweb.bookweb.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.bookweb.bookweb.models.Order;

@Repository
public interface  OrderRepository extends MongoRepository<Order, String> {
        
}
