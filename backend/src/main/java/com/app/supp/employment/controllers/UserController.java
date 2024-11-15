package com.app.supp.employment.controllers;

import com.app.supp.employment.models.Candidate;
import com.app.supp.employment.models.Company;
import com.app.supp.employment.models.Message;
import com.app.supp.employment.models.Opinion;
import com.app.supp.employment.payload.response.ContactResponse;
import com.app.supp.employment.payload.response.GetMessagesResponse;
import com.app.supp.employment.payload.response.OpinionResponse;
import com.app.supp.employment.repository.CandidateRepository;
import com.app.supp.employment.repository.CompanyRepository;
import com.app.supp.employment.repository.MessageRepository;
import com.app.supp.employment.repository.OpinionRepository;
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

    @Autowired
    MessageRepository messageRepository;

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

    @GetMapping("/getImage")
    public ResponseEntity<?> getImage(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            Candidate candidate = candidateRepository.findByEmail(currentUser.getEmail());

            return ResponseEntity.ok()
                    .body(candidate);
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getMyContacts")
    public ResponseEntity<List<ContactResponse>> getMyContacts(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            List<ContactResponse> contacts = new ArrayList<>();
            List<Integer> savedCompany = new ArrayList<>();

            List<Message> messages = messageRepository.findAllByIdCandidate(currentUser.getId());

            for (Message message : messages) {
                Company company = companyRepository.findById(message.getIdCompany());

                if(!savedCompany.contains(company.getId())){
                    savedCompany.add(company.getId());
                    contacts.add(new ContactResponse(company.getId(), company.getName(), company.getLastName(), company.getPhotoFilePath()));
                }
            }
            return ResponseEntity.ok().body(contacts);
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/getMessages")
    public ResponseEntity<?> getMessages(@RequestParam int id) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            List<GetMessagesResponse> response = new ArrayList<>();
            List<Message> messages = messageRepository.findAllByIdCompanyAndIdCandidate(id, currentUser.getId());

            for(Message message : messages){
                response.add(new GetMessagesResponse(message.getId(),message.getMessage(), message.getMessageTime(), message.getSender()));
            }

            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/sendMessage")
    public ResponseEntity<?> sendMessage(@RequestParam int idCompany, @RequestParam String message) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            ZoneId zone = ZoneId.of("Europe/Warsaw");

            messageRepository.save(new Message(currentUser.getId(), idCompany, LocalDateTime.now(zone), message, currentUser.getRole()));

            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

}
