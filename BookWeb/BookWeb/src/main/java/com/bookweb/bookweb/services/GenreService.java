package com.bookweb.bookweb.services;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.bookweb.bookweb.models.Genre;
import com.bookweb.bookweb.models.User;
import com.bookweb.bookweb.repositories.GenreRepository;
import com.bookweb.bookweb.repositories.UserRepository;


@Service
public class GenreService {
    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    UserRepository userRepository;

    public List<Genre> getAllGenres() {
        System.out.println("connect");
        return genreRepository.findAll();
    }

    public String createGenre(Genre genre) {
        try {
            genreRepository.save(genre);
            return "Add success";
        } 
        catch (Exception e) {
            return "Fail!";
        }
    }

    public String deleteGenre(String id) {
        try{
            genreRepository.deleteById(id);
            return "Delete Success!";
        }
        catch( Exception e) {
            return "Fail!";
        }
        
    }

    public String updateGenre(@PathVariable(name = "id") String id, Genre newGenre) {
        Genre genre = genreRepository.findById(id).get();
        genre.setName(newGenre.getName());
        genre.setDescription(newGenre.getDescription());
        genre.setImages(newGenre.getImages());
        genreRepository.save(genre);

        return "Update success!";
    }

    public List<Genre> findGenreById(String id) {
        List<Genre> genres = new ArrayList<>();
        var genre = genreRepository.findById(id).get();
        genres.add(genre);

        return genres;
    }

    
}
