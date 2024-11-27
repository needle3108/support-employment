package com.app.supp.employment.controllers;

import com.app.supp.employment.models.Candidate;
import com.app.supp.employment.payload.response.ContactResponse;
import com.app.supp.employment.payload.response.GetMessagesResponse;
import com.app.supp.employment.payload.response.MessageResponse;
import com.app.supp.employment.payload.response.OpinionResponse;
import com.app.supp.employment.security.services.UserDetailsImpl;
import com.app.supp.employment.services.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class CandidateController {
    @Autowired
    private CandidateService candidateService;

    @GetMapping("/profile")
    public ResponseEntity<Candidate> getProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        Candidate candidate = candidateService.getCurrentCandidateInfo(currentUser.getId());

        if (candidate != null) {
            return ResponseEntity.ok().body(candidate);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getMyOpinions")
    public ResponseEntity<List<OpinionResponse>> getMyOpinions(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok().body(candidateService.getCurrentCandidateOpinions(currentUser.getId()));

    }

    @GetMapping("/getMyContacts")
    public ResponseEntity<List<ContactResponse>> getMyContacts(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok().body(candidateService.getCurrentCandidateContacts(currentUser.getId()));
    }

    @PostMapping("/getMessages")
    public ResponseEntity<List<GetMessagesResponse>> getMessages(@RequestParam int id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok().body(candidateService.getCurrentCandidateMessages(currentUser.getId(), id));
    }

    @PostMapping("/sendMessage")
    public ResponseEntity<?> sendMessage(@RequestParam int idCompany, @RequestParam String message) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        if (candidateService.sendMessage(currentUser.getId(), idCompany, message)) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.internalServerError().body(new MessageResponse("Błąd wysyłania wiadomości!"));
    }
}
