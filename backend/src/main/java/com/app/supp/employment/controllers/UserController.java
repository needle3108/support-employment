package com.app.supp.employment.controllers;

import com.app.supp.employment.payload.response.UserProfileResponse;
import com.app.supp.employment.security.services.UserDetailsImpl;
import lombok.Getter;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() throws URISyntaxException, IOException {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            if(currentUser.getPhotoFilePath() != null) {
                Path path = Paths.get(Objects.requireNonNull(getClass().getResource("/usr/app/application/images/" + currentUser.getPhotoFilePath())).toURI());
                ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
                return ResponseEntity.ok(new UserProfileResponse(
                        currentUser.getFirstName(),
                        currentUser.getLastName(),
                        currentUser.getPhoneNumber(),
                        currentUser.getEmail(),
                        resource,
                        currentUser.getDescription(),
                        currentUser.getProfession()
                ));
            }

            return ResponseEntity.ok(new UserProfileResponse(
                    currentUser.getFirstName(),
                    currentUser.getLastName(),
                    currentUser.getPhoneNumber(),
                    currentUser.getEmail(),
                    null,
                    currentUser.getDescription(),
                    currentUser.getProfession()
            ));
        } catch (NullPointerException e){
            System.out.println(e.getMessage() + "Jestem tutaj");
            return ResponseEntity.notFound().build();
        }

    }
}
