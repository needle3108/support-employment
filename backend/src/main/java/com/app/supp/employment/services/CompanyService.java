package com.app.supp.employment.services;

import com.app.supp.employment.models.Candidate;
import com.app.supp.employment.models.Company;
import com.app.supp.employment.models.Favourite;
import com.app.supp.employment.models.Message;
import com.app.supp.employment.payload.response.ContactResponse;
import com.app.supp.employment.payload.response.FilterResponse;
import com.app.supp.employment.payload.response.GetMessagesResponse;
import com.app.supp.employment.payload.response.OpinionResponse;
import com.app.supp.employment.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Service
public class CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private FavouriteService favouriteService;

    @Autowired
    private OpinionService opinionService;

    @Autowired
    private MessageService messageService;

    public Company getCompanyUser(int idCompany){
        if (companyRepository.existsById(idCompany)){
            return companyRepository.findById(idCompany);
        }

        return null;
    }

    public List<Candidate> getCandidates(){
        return candidateService.getAllCandidates();
    }

    public Candidate getSpecifiedCandidate(int idCandidate){
        return candidateService.getCurrentCandidateInfo(idCandidate);
    }

    public boolean saveFavourite(int idCompany, int idCandidate){
        return favouriteService.addFavourite(idCompany, idCandidate);
    }

    public List<Favourite> getFavourites(int idCompany){
        return favouriteService.getFavourites(idCompany);
    }

    public List<Candidate> getCompanyFavourites(int idCompany){
        List<Favourite> favourites = getFavourites(idCompany);
        List<Candidate> candidates = new ArrayList<>();

        for (Favourite favourite : favourites){
            candidates.add(candidateService.getCurrentCandidateInfo(favourite.getIdCandidate()));
        }

        return candidates;
    }

    public List<OpinionResponse> getOpinions(int idCandidate){
        return candidateService.getCurrentCandidateOpinions(idCandidate);
    }

    public boolean addOpinion(int idCandidate, int idCompany, String opinion){
        return opinionService.addOpinion(idCandidate, idCompany, opinion);
    }

    public boolean sendMessage(int idCandidate, int idCompany, String message){
        return messageService.addMessage(idCandidate, idCompany, message, companyRepository.findById(idCompany).getRole());
    }

    public List<ContactResponse> getCurrentCompanyContacts(int idCompany){
        List<ContactResponse> contacts = new ArrayList<>();
        List<Integer> savedCandidates = new ArrayList<>();

        List<Message> messages = messageService.getUserMessages(idCompany, companyRepository.findById(idCompany).getRole());

        for (Message message : messages){
            Candidate candidate = getSpecifiedCandidate(message.getIdCandidate());

            if (!savedCandidates.contains(candidate.getId())){
                savedCandidates.add(candidate.getId());
                contacts.add(new ContactResponse(candidate.getId(), candidate.getFirstName(), candidate.getLastName(), candidate.getPhotoFilePath()));
            }
        }

        return contacts;
    }

    public List<GetMessagesResponse> getCurrentCompanyMessages(int idCompany, int idCandidate){
        return candidateService.getCurrentCandidateMessages(idCandidate, idCompany);
    }

    public FilterResponse doFilter(String city, String profession, String minAge, String maxAge, int idCompany){
        List<Candidate> candidatesCity;
        List<Candidate> candidatesProfession;
        List<Candidate> candidatesMinAge;
        List<Candidate> candidatesMaxAge;

        List<Candidate> filteredCandidates = new ArrayList<>();

        int counter = 0;

        if(!Objects.equals(city, "")){
            candidatesCity = candidateService.findAllByCity(city);
            if(!candidatesCity.isEmpty()){
                counter++;
                filteredCandidates.addAll(candidatesCity);
            }
        }

        if(!Objects.equals(profession, "")){
            candidatesProfession = candidateService.findAllByProfession(profession);
            if(!candidatesProfession.isEmpty()){
                counter++;
                filteredCandidates.addAll(candidatesProfession);
            }
        }

        if(!Objects.equals(minAge, "")){
            candidatesMinAge = candidateService.findAllWhereAgeGreaterThan(Integer.parseInt(minAge));
            if(!candidatesMinAge.isEmpty()){
                counter++;
                filteredCandidates.addAll(candidatesMinAge);
            }
        }

        if(!Objects.equals(maxAge, "")){
            candidatesMaxAge = candidateService.findAllWhereAgeLessThan(Integer.parseInt(maxAge));
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
            if(favouriteService.isUserFavourite(candidate.getId(), idCompany)){
                favourites.add(candidate);
            }
        }

        return new FilterResponse(finalCandidates, favourites);
    }

    public boolean removeFavourite(int idCandidate, int idCompany){
        return favouriteService.removeFavourite(idCandidate, idCompany);
    }
}
