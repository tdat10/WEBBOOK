package com.bookweb.bookweb.controllers;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bookweb.bookweb.models.Book;
import com.bookweb.bookweb.models.BookUpdateRequest;
import com.bookweb.bookweb.payload.ResponseData;
import com.bookweb.bookweb.services.BookService;






@RestController
@RequestMapping("/api/book")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookById(@PathVariable("id") String id) {

        try {
            Book book = bookService.getBookById(id);
            return new ResponseEntity<>(book, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
        
    }
    
    @PostMapping()
    public ResponseEntity<?> createBook(
            @RequestParam(value = "title", required = true)  String title,
            @RequestParam("author")  String author,
            @RequestParam("genre")  String genre,
            @RequestParam("description")  String description,
            @RequestParam("stock")  String stock,
            @RequestParam("price")  BigDecimal price,
            @RequestParam("salePrice")  BigDecimal salePrice,
            @RequestParam("publisher")  String publisher,
            @RequestParam(value = "images", required = false) List<MultipartFile> images ) {
        
        ResponseData responseData = new ResponseData();
        boolean success = bookService.createBook(title, author, genre, description, stock, price, salePrice, publisher,images);
        responseData.setData(success);
        
        return new ResponseEntity<>(responseData,HttpStatus.OK );
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable("id") String id){
        ResponseData responseData =  new ResponseData();
        responseData.setData(bookService.deleteBook(id));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable("id") String id,  
            @RequestParam(value = "title")  String title,
            @RequestParam("author")  String author,
            @RequestParam("genre")  String genre,
            @RequestParam("description")  String description,
            @RequestParam("stock")  String stock,
            @RequestParam("price")  BigDecimal price,
            @RequestParam("salePrice")  BigDecimal salePrice,
            @RequestParam("publisher")  String publisher,
            @RequestParam(value = "images", required = false) List<MultipartFile> images){
        ResponseData responseData = new ResponseData();
        responseData.setData(bookService.updateBook(id, title, author, genre, description, stock, price, salePrice, publisher,images));
        
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
}
