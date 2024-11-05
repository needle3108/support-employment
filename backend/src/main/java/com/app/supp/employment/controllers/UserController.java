package com.app.supp.employment.controllers;

import com.app.supp.employment.payload.response.UserProfileResponse;
import com.app.supp.employment.security.services.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            return ResponseEntity.ok()
                    .body(new UserProfileResponse(
                    currentUser.getFirstName(),
                    currentUser.getLastName(),
                    currentUser.getPhoneNumber(),
                    currentUser.getEmail(),
                    currentUser.getDescription(),
                    currentUser.getProfession()
                    ));
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/image")
    public ResponseEntity<?> getImage(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            return ResponseEntity.ok()
                    .body(currentUser.getPhotoFilePath());
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
}
