package com.bookweb.bookweb.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookweb.bookweb.models.Book;
import com.bookweb.bookweb.models.BoughtInformation;
import com.bookweb.bookweb.models.Profile;
import com.bookweb.bookweb.models.User;
import com.bookweb.bookweb.payload.ResponseData;
import com.bookweb.bookweb.repositories.BookRepository;
import com.bookweb.bookweb.repositories.UserRepository;
import com.bookweb.bookweb.services.CustomUserDetails;



@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    BookRepository bookRepository;

    @GetMapping()
    public ResponseEntity<?> getAllUser() {
        

       

        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }
    

    @GetMapping("/cart")
    public List<BoughtInformation> findCart() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        String username = (String)auth.getPrincipal();

        User user = userRepository.findByUsername(username);

        List<BoughtInformation> cart = user.getCart();

        return cart;
    } 

    @PostMapping("/cart")
    public ResponseEntity<?> updateCart(@RequestBody List<BoughtInformation> newCart) {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        String username = (String)auth.getPrincipal();
        ResponseData responseData = new ResponseData();
        User user = userRepository.findByUsername(username);
        try {
            for(var item : newCart) {
                Book book = bookRepository.findById(item.getItemId()).get();
                if(book.getSoldQty() > item.getQuantity()) {
                    return new ResponseEntity<>(HttpStatusCode.valueOf(400));
                }
                item.setTitle(book.getTitle());
                item.setImage(book.getImages().get(0));
                if(book.getSalePrice().equals(0)) {
                    item.setPrice(book.getPrice());
                }
                else{
                    item.setPrice(book.getSalePrice());
                }

                
            }
            user.setCart(newCart);
            userRepository.save(user);
            responseData.setData(user.getCart());
            return new ResponseEntity<>(responseData,HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatusCode.valueOf(400));
        }
    }

    @GetMapping("/profile")
    /**
     * Lấy thông tin người dùng
     * @return thông tin người dùng
     */
    public Profile getUserProfile() {
        //Tìm người dùng trong spring security dựa theo token được gửi đến
        var auth = SecurityContextHolder.getContext().getAuthentication();
        var user = (CustomUserDetails) auth.getPrincipal();
        String role = user.getAuthorities()
                .stream()
                .findFirst()
                .get()
                .getAuthority();

                System.out.println(user.getUsername());
        return new Profile(user.getUsername(), role);
        
    }
    
}
