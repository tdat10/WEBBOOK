package com.bookweb.bookweb.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;

    @Indexed(unique = true)

    private String username;
    private String password;
    private String email;
    private String role;
    List<BoughtInformation> cart;

    public User() {
        cart = new ArrayList<>();
    }

    public String getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public String getRole() {
        return role;
    }
    public void setId(String id) {
        this.id = id;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setRole(String role) {
        this.role = role;
    }

    public List<BoughtInformation> getCart() {
        return cart;
    }
    public void setCart(List<BoughtInformation> cart) {
        this.cart = cart;
    }
    
}
