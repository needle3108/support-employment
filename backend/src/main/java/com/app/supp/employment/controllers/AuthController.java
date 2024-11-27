package com.app.supp.employment.controllers;

import com.app.supp.employment.payload.request.LoginRequest;
import com.app.supp.employment.payload.request.SignUpHRRequest;
import com.app.supp.employment.payload.request.SignupRequest;
import com.app.supp.employment.payload.response.JwtResponse;
import com.app.supp.employment.payload.response.MessageResponse;
import com.app.supp.employment.security.jwt.JwtUtils;
import com.app.supp.employment.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.app.supp.employment.services.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
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
    public ResponseEntity<MessageResponse> registerUser(@ModelAttribute SignupRequest signupRequest) {
        if (authService.isEmailTaken(signupRequest.getEmail(), "USER")) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new MessageResponse("Email jest już w użyciu!"));
        }

        if (authService.addCandidate(signupRequest)){
            return ResponseEntity.ok().body(new MessageResponse("Rejestracja przebiegła pomyślnie"));
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body(new MessageResponse("Błąd w trakcie rejestracji"));
    }

    @PostMapping("/signupHR")
    public ResponseEntity<MessageResponse> registerCompany(@ModelAttribute SignUpHRRequest signUpHRRequest) {
        if (authService.isEmailTaken(signUpHRRequest.getEmail(), "HR")) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new MessageResponse("Email jest już w użyciu!"));
        }

        if (authService.addCompanyUser(signUpHRRequest)){
            return ResponseEntity.ok().body(new MessageResponse("Rejestracja przebiegła pomyślnie"));
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body(new MessageResponse("Błąd w trakcie rejestracji"));
    }
}
