package com.app.supp.employment.controllers;

import com.app.supp.employment.models.Candidate;
import com.app.supp.employment.payload.request.LoginRequest;
import com.app.supp.employment.payload.request.SignupRequest;
import com.app.supp.employment.payload.response.JwtResponse;
import com.app.supp.employment.payload.response.MessageResponse;
import com.app.supp.employment.repository.CandidateRepository;
import com.app.supp.employment.security.jwt.JwtUtils;
import com.app.supp.employment.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    CandidateRepository candidateRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        System.out.println("Jestem");

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        if (candidateRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        System.out.println("Jestem");

        Candidate candidate = new Candidate(
                signupRequest.getEmail(),
                signupRequest.getFirstName(),
                signupRequest.getLastName(),
                passwordEncoder.encode(signupRequest.getPassword()),
                signupRequest.getPhoneNumber(),
                signupRequest.getCity(),
                signupRequest.getDescription(),
                signupRequest.getPhotoFilePath(),
                signupRequest.getAge(),
                signupRequest.getProfession());

        candidateRepository.save(candidate);

        return ResponseEntity.ok(new MessageResponse("Successfully registered!"));
    }
}
