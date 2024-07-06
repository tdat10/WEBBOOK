
package com.bookweb.bookweb.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookweb.bookweb.payload.ResponseData;
import com.bookweb.bookweb.payload.SignupResquest;
import com.bookweb.bookweb.services.imp.LoginServiceImp;
import com.bookweb.bookweb.utils.JwtHelper;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    LoginServiceImp loginServiceImp;

    @Autowired
    JwtHelper jwtHelper;

        @PostMapping("/signin")
        public ResponseEntity<?> singin(@RequestParam String username, @RequestParam String password) {
            ResponseData responseData = new ResponseData();

            if (loginServiceImp.checkLogin(username, password)) {
                String token = jwtHelper.generateToken(username);
                responseData.setSuccess(true);
                responseData.setData(token);
                
            } else {
                responseData.setSuccess(false);
                responseData.setData("Dang nhap that bai");
            }
            
            return new ResponseEntity<>(responseData,HttpStatus.OK);
        }

    @PostMapping("/signup")
    public ResponseEntity<?> singup(@RequestBody SignupResquest signupResquest) {
        ResponseData responseData = new ResponseData();
        
        responseData.setData(loginServiceImp.addUser(signupResquest));
        
        return new ResponseEntity<>(responseData,HttpStatus.OK);
    }
    
}