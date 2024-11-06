package com.app.supp.employment.controllers;

import com.app.supp.employment.models.Candidate;
import com.app.supp.employment.repository.CandidateRepository;
import com.app.supp.employment.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    CandidateRepository candidateRepository;

    @GetMapping("/profile")
    public ResponseEntity<Candidate> getProfile(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            Candidate candidate = candidateRepository.findByEmail(currentUser.getUsername());

            return ResponseEntity.ok()
                    .body(candidate);
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
}
