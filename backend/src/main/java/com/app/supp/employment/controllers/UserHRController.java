package com.app.supp.employment.controllers;

import com.app.supp.employment.models.*;
import com.app.supp.employment.payload.response.*;
import com.app.supp.employment.repository.*;
import com.app.supp.employment.security.services.UserDetailsImpl;
import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

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

            if(favouriteRepository.existsByIdCandidate(idCandidate)){
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body(new MessageResponse("Użytkownik widnieje już na Twojej liście ulubionych!"));
            }

            favouriteRepository.save(new Favourite(idCandidate, currentUser.getId()));

            return ResponseEntity.ok().body(new MessageResponse("Użytkownik dodany do lisy ulubionych!"));
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
            List<Integer> savedCandidates = new ArrayList<>();

            List<Message> messages = messageRepository.findAllByIdCompany(currentUser.getId());

            for(Message message : messages){
                Candidate candidate = candidateRepository.findById(message.getIdCandidate());

                if(!savedCandidates.contains(candidate.getId())){
                    savedCandidates.add(candidate.getId());
                    contacts.add(new ContactResponse(candidate.getId(), candidate.getFirstName(), candidate.getLastName(), candidate.getPhotoFilePath()));
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
            List<Message> messages = messageRepository.findAllByIdCompanyAndIdCandidate(currentUser.getId(), id);

            for(Message message : messages){
                response.add(new GetMessagesResponse(message.getId(),message.getMessage(), message.getMessageTime(), message.getSender()));
            }

            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/getCandidatesFilter")
    public ResponseEntity<?> getCandidatesFilter(@Nullable @RequestParam String city, @Nullable @RequestParam String profession, @RequestParam String minAge, @RequestParam String maxAge) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            List<Candidate> candidatesCity;
            List<Candidate> candidatesProfession;
            List<Candidate> candidatesMinAge;
            List<Candidate> candidatesMaxAge;

            List<Candidate> filteredCandidates = new ArrayList<>();

            int counter = 0;

            if(!Objects.equals(city, "")){
                candidatesCity = candidateRepository.findAllByCity(city);
                if(!candidatesCity.isEmpty()){
                    counter++;
                    filteredCandidates.addAll(candidatesCity);
                }
            }

            if(!Objects.equals(profession, "")){
                candidatesProfession = candidateRepository.findAllByProfession(profession);
                if(!candidatesProfession.isEmpty()){
                    counter++;
                    filteredCandidates.addAll(candidatesProfession);
                }
            }

            if(!Objects.equals(minAge, "")){
                candidatesMinAge = candidateRepository.findAllWhereAgeGreaterThan(Integer.parseInt(minAge));
                if(!candidatesMinAge.isEmpty()){
                    counter++;
                    filteredCandidates.addAll(candidatesMinAge);
                }
            }

            if(!Objects.equals(maxAge, "")){
                candidatesMaxAge = candidateRepository.findAllWhereAgeLessThan(Integer.parseInt(maxAge));
                if(!candidatesMaxAge.isEmpty()){
                    counter++;
                    filteredCandidates.addAll(candidatesMaxAge);
                }
            }

            HashMap<Candidate, Integer> candidates = new HashMap<>();

            for(Candidate candidate : filteredCandidates){
                if(candidates.containsKey(candidate)){
                    candidates.put(candidate, candidates.get(candidate) + 1);
                }
                else{
                    candidates.put(candidate, 1);
                }
            }

            List<Candidate> finalCandidates = new ArrayList<>();

            for(Candidate candidate : candidates.keySet()){
                if(candidates.get(candidate) == counter){
                    finalCandidates.add(candidate);
                }
            }

            List<Candidate> favourites = new ArrayList<>();

            for(Candidate candidate : finalCandidates){
                if(favouriteRepository.existsByIdCandidateAndIdCompany(candidate.getId(), currentUser.getId())){
                    favourites.add(candidate);
                }
            }

            return ResponseEntity.ok().body(new FilterResponse(finalCandidates, favourites));

        } catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteFavourite")
    @Transactional
    public ResponseEntity<?> deleteFavourite(@RequestParam String id) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

            favouriteRepository.deleteByIdCandidateAndIdCompany(Integer.parseInt(id), currentUser.getId());

            return ResponseEntity.ok().body(new MessageResponse("Użytkownik został usunięty z listy ulubionych"));
        } catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}
