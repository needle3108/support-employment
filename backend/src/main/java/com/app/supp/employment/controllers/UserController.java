package com.app.supp.employment.controllers;

import com.app.supp.employment.models.Candidate;
import com.app.supp.employment.models.Company;
import com.app.supp.employment.models.Opinion;
import com.app.supp.employment.payload.response.OpinionResponse;
import com.app.supp.employment.repository.CandidateRepository;
import com.app.supp.employment.repository.CompanyRepository;
import com.app.supp.employment.repository.OpinionRepository;
import com.app.supp.employment.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    CandidateRepository candidateRepository;

    @Autowired
    OpinionRepository opinionRepository;

    @Autowired
    CompanyRepository companyRepository;

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

    @GetMapping("/getMyOpinions")
    public ResponseEntity<List<OpinionResponse>> getMyOpinions(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            List<Opinion> opinions = opinionRepository.findAllByIdCandidate(currentUser.getId());

            List<OpinionResponse> response = new ArrayList<>();

            for (Opinion opinion : opinions) {
                Company company = companyRepository.findById(opinion.getIdCompany());

                response.add(new OpinionResponse(opinion.getId(), company.getName(), company.getLastName(), company.getCompanyName(),
                        company.getPhotoFilePath(), opinion.getOpinionTime(), opinion.getOpinion()));
            }

            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
}
