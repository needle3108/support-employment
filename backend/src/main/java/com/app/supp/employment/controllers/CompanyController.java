package com.app.supp.employment.controllers;

import com.app.supp.employment.models.*;
import com.app.supp.employment.payload.response.*;
import com.app.supp.employment.security.services.UserDetailsImpl;
import com.app.supp.employment.services.CompanyService;
import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/userHR")
@CrossOrigin
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @GetMapping("/getCandidates")
    public ResponseEntity<List<Candidate>> getCandidates() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok().body(companyService.getCandidates());
    }

    @PostMapping("/getCandidate")
    public ResponseEntity<Candidate> getCandidate(@RequestParam int id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok().body(companyService.getSpecifiedCandidate(id));
    }

    @GetMapping("/profile")
    public ResponseEntity<?> profile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        Company company = companyService.getCompanyUser(currentUser.getId());

        if (company != null){
            return ResponseEntity.ok().body(company);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/addFavourite")
    public ResponseEntity<MessageResponse> addFavourite(@RequestParam int idCandidate) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        if (companyService.saveFavourite(currentUser.getId(), idCandidate)){
            return ResponseEntity.ok().body(new MessageResponse("Użytkownik dodany do lisy ulubionych!"));
        }

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new MessageResponse("Użytkownik widnieje już na Twojej liście ulubionych lub wystąpił nieoczekiwany błąd!"));
    }

    @GetMapping("/getFavourites")
    public ResponseEntity<List<Favourite>> getFavourites() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok().body(companyService.getFavourites(currentUser.getId()));
    }

    @GetMapping("/getMyFavourites")
    public ResponseEntity<List<Candidate>> getMyFavourites() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok().body(companyService.getCompanyFavourites(currentUser.getId()));
    }

    @PostMapping("/getOpinions")
    public ResponseEntity<List<OpinionResponse>> getOpinions(@RequestParam int id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok().body(companyService.getOpinions(id));
    }

    @PostMapping("/addOpinion")
    public ResponseEntity<?> addOpinion(@RequestParam int idCandidate, @RequestParam String opinion) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

       if (companyService.addOpinion(idCandidate, currentUser.getId(), opinion)){
           return ResponseEntity.ok().build();
       }

        return ResponseEntity.internalServerError().body(new MessageResponse("Błąd dodawania opinii!"));
    }

    @PostMapping("/sendMessage")
    public ResponseEntity<?> sendMessage(@RequestParam int idCandidate, @RequestParam String message) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        if (companyService.sendMessage(idCandidate, currentUser.getId(), message)){
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.internalServerError().body(new MessageResponse("Błąd wysyłania wiadomości!"));
    }

    @GetMapping("/getMyContacts")
    public ResponseEntity<List<ContactResponse>> getMyContacts() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok().body(companyService.getCurrentCompanyContacts(currentUser.getId()));
    }

    @PostMapping("/getMessages")
    public ResponseEntity<List<GetMessagesResponse>> getMessages(@RequestParam int id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok().body(companyService.getCurrentCompanyMessages(currentUser.getId(), id));
    }

    @PostMapping("/getCandidatesFilter")
    public ResponseEntity<FilterResponse> getCandidatesFilter(@Nullable @RequestParam String city, @Nullable @RequestParam String profession, @RequestParam String minAge, @RequestParam String maxAge) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok().body(companyService.doFilter(city, profession, minAge, maxAge, currentUser.getId()));
    }

    @DeleteMapping("/deleteFavourite")
    public ResponseEntity<MessageResponse> deleteFavourite(@RequestParam String id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        if (companyService.removeFavourite(Integer.parseInt(id), currentUser.getId())){
            return ResponseEntity.ok().body(new MessageResponse("Użytkownik został usunięty z listy ulubionych"));
        }

        return ResponseEntity.internalServerError().body(new MessageResponse("Wystąpił błąd podczas próby usunięcia użytkownika z listy ulubionych"));
    }
}
