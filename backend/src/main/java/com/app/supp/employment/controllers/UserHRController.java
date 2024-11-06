package com.app.supp.employment.controllers;

import com.app.supp.employment.models.Candidate;
import com.app.supp.employment.repository.CandidateRepository;
import com.app.supp.employment.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/userHR")
@CrossOrigin
public class UserHRController {
    @Autowired
    private CandidateRepository candidateRepository;

    @GetMapping("/getCandidates")
    public ResponseEntity<List<Candidate>> getCandidates() {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            List<Candidate> candidates = new ArrayList<>(candidateRepository.findAll());

            return ResponseEntity.ok()
                    .body(candidates);
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
}
