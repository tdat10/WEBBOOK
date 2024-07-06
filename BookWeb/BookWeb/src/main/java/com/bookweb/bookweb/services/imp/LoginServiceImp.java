package com.bookweb.bookweb.services.imp;
import java.util.List;

import com.bookweb.bookweb.models.User;
import com.bookweb.bookweb.payload.SignupResquest;


public interface LoginServiceImp {
    List<User> getAllUser();
    boolean checkLogin(String username, String password);
    boolean addUser(SignupResquest signupResquest);
}
