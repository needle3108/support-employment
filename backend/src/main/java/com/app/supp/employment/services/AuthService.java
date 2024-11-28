package com.app.supp.employment.services;

import com.app.supp.employment.models.Candidate;
import com.app.supp.employment.models.Company;
import com.app.supp.employment.payload.request.SignUpHRRequest;
import com.app.supp.employment.payload.request.SignupRequest;
import com.app.supp.employment.repository.CandidateRepository;
import com.app.supp.employment.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
public class AuthService {
    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean isEmailTaken(String email, String role) {
        if(role.equals("USER")){
            return candidateRepository.existsByEmail(email);
        }
        else{
            return companyRepository.existsByEmail(email);
        }
    }

    public boolean addCandidate(SignupRequest signupRequest) {
        try{
            Candidate candidate = new Candidate(
                    signupRequest.getEmail(),
                    signupRequest.getFirstName(),
                    signupRequest.getLastName(),
                    passwordEncoder.encode(signupRequest.getPassword()),
                    signupRequest.getPhoneNumber(),
                    signupRequest.getCity(),
                    signupRequest.getDescription(),
                    signupRequest.getFile().getBytes(),
                    LocalDate.parse(signupRequest.getDateOfBirth()),
                    signupRequest.getProfession());

            candidate.setRole("USER");
            candidateRepository.save(candidate);

            return true;
        }
        catch(IOException e){
            System.out.println(e.getMessage());
            return false;
        }
    }

    public boolean addCompanyUser(SignUpHRRequest signUpHRRequest){
        try{
            Company company = new Company(
                    signUpHRRequest.getEmail(),
                    signUpHRRequest.getName(),
                    signUpHRRequest.getLastName(),
                    passwordEncoder.encode(signUpHRRequest.getPassword()),
                    signUpHRRequest.getCity(),
                    signUpHRRequest.getCompanyName(),
                    signUpHRRequest.getFile().getBytes());

            company.setRole("HR");
            companyRepository.save(company);

            return true;
        }
        catch(IOException e){
            System.out.println(e.getMessage());
            return false;
        }
    }

    public boolean isUnderSixteen(String date){
        System.out.println(ChronoUnit.YEARS.between(LocalDate.parse(date), LocalDate.now()));
        return ChronoUnit.YEARS.between(LocalDate.parse(date), LocalDate.now()) < 16;
    }

}
