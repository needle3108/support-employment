package com.app.supp.employment.controllers;

import com.app.supp.employment.models.Candidate;
import com.app.supp.employment.models.Company;
import com.app.supp.employment.models.Favourite;
import com.app.supp.employment.repository.CandidateRepository;
import com.app.supp.employment.repository.CompanyRepository;
import com.app.supp.employment.repository.FavouriteRepository;
import com.app.supp.employment.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/userHR")
@CrossOrigin
public class UserHRController {
    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private FavouriteRepository favouriteRepository;

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

    @PostMapping("/getCandidate")
    public ResponseEntity<Candidate> getCandidate(@RequestParam int id) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            Candidate candidate = candidateRepository.findById(id);

            return ResponseEntity.ok()
                    .body(candidate);
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getImage")
    public ResponseEntity<?> getImage(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            Optional<Company> company = companyRepository.findByEmail(currentUser.getEmail());

            return ResponseEntity.ok()
                    .body(company);
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/addFavourite")
    public ResponseEntity<?> addFavourite(@RequestParam int idCandidate) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            if(candidateRepository.existsById(idCandidate)){
                favouriteRepository.save(new Favourite(idCandidate, currentUser.getId()));
                return ResponseEntity.ok().build();
            }

            return ResponseEntity.notFound().build();
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getFavourites")
    public ResponseEntity<List<Favourite>> getFavourites() {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            List<Favourite> favourites = favouriteRepository.findAllByIdCompany(currentUser.getId());

            return ResponseEntity.ok().body(favourites);
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getMyFavourites")
    public ResponseEntity<List<Candidate>> getMyFavourites() {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            List<Favourite> favourites = favouriteRepository.findAllByIdCompany(currentUser.getId());
            List<Candidate> candidates = new ArrayList<>();

            for(Favourite favourite : favourites){
                candidates.add(candidateRepository.findById(favourite.getIdCandidate()));
            }

            return ResponseEntity.ok().body(candidates);
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
}
