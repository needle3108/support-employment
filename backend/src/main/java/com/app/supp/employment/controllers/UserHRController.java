package com.app.supp.employment.controllers;

import com.app.supp.employment.models.*;
import com.app.supp.employment.payload.response.ContactResponse;
import com.app.supp.employment.payload.response.OpinionResponse;
import com.app.supp.employment.repository.*;
import com.app.supp.employment.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
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

    @Autowired
    private OpinionRepository opinionRepository;

    @Autowired
    private MessageRepository messageRepository;

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

    @PostMapping("/getOpinions")
    public ResponseEntity<?> getOpinions(@RequestParam int id) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            List<Opinion> opinions = opinionRepository.findAllByIdCandidate(id);

            List<OpinionResponse> response = new ArrayList<>();

            for(Opinion opinion : opinions){
                Company company = companyRepository.findById(opinion.getIdCompany());

                response.add(new OpinionResponse(opinion.getId(), company.getName(), company.getLastName(), company.getCompanyName(),
                        company.getPhotoFilePath(), opinion.getOpinionTime(), opinion.getOpinion()));
            }

            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/addOpinion")
    public ResponseEntity<?> addOpinion(@RequestParam int idCandidate, @RequestParam String opinion) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            ZoneId zone = ZoneId.of("Europe/Warsaw");

            opinionRepository.save(new Opinion(idCandidate, currentUser.getId(), LocalDateTime.now(zone), opinion));

            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/sendMessage")
    public ResponseEntity<?> sendMessage(@RequestParam int idCandidate, @RequestParam String message) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            ZoneId zone = ZoneId.of("Europe/Warsaw");

            messageRepository.save(new Message(idCandidate, currentUser.getId(), LocalDateTime.now(zone), message, currentUser.getRole()));

            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getMyContacts")
    public ResponseEntity<?> getMyContacts() {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            List<ContactResponse> contacts = new ArrayList<>();

            List<Message> messages = messageRepository.findAllByIdCompany(currentUser.getId());

            for(Message message : messages){
                Candidate candidate = candidateRepository.findById(message.getIdCandidate());
                contacts.add(new ContactResponse(message.getId(), candidate.getFirstName(), candidate.getLastName(), candidate.getPhotoFilePath()));
            }

            return ResponseEntity.ok().body(contacts);
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
}
