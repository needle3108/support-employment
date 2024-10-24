package com.app.supp.employment.controllers;

import com.app.supp.employment.models.Candidate;
import com.app.supp.employment.models.Company;
import com.app.supp.employment.payload.request.LoginRequest;
import com.app.supp.employment.payload.request.SignUpHRRequest;
import com.app.supp.employment.payload.request.SignupRequest;
import com.app.supp.employment.payload.response.JwtResponse;
import com.app.supp.employment.payload.response.MessageResponse;
import com.app.supp.employment.repository.CandidateRepository;
import com.app.supp.employment.repository.CompanyRepository;
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
    CompanyRepository companyRepository;

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

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getRole()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        if (candidateRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

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

        candidate.setRole("USER");
        candidateRepository.save(candidate);

        return ResponseEntity.ok(new MessageResponse("Successfully registered!"));
    }

    @PostMapping("/signupHR")
    public ResponseEntity<?> registerCompany(@Valid @RequestBody SignUpHRRequest signUpHRRequest) {
        if (companyRepository.existsByEmail(signUpHRRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        Company company = new Company(
                signUpHRRequest.getEmail(),
                signUpHRRequest.getName(),
                signUpHRRequest.getLastName(),
                passwordEncoder.encode(signUpHRRequest.getPassword()),
                signUpHRRequest.getCity(),
                signUpHRRequest.getCompanyName(),
                signUpHRRequest.getPhotoFilePath());

        company.setRole("HR");
        companyRepository.save(company);

        return ResponseEntity.ok(new MessageResponse("Successfully registered!"));
    }
}
