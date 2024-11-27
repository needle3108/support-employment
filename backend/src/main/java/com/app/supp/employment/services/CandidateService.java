package com.app.supp.employment.services;

import com.app.supp.employment.models.Candidate;
import com.app.supp.employment.models.Company;
import com.app.supp.employment.models.Message;
import com.app.supp.employment.models.Opinion;
import com.app.supp.employment.payload.response.ContactResponse;
import com.app.supp.employment.payload.response.GetMessagesResponse;
import com.app.supp.employment.payload.response.OpinionResponse;
import com.app.supp.employment.repository.CandidateRepository;
import com.app.supp.employment.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CandidateService {
    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private OpinionService opinionService;

    @Autowired
    private MessageService messageService;

    public Candidate getCurrentCandidateInfo(int idCandidate){
        if (candidateRepository.existsById(idCandidate)){
            return candidateRepository.findById(idCandidate);
        }

        return null;
    }

    public List<OpinionResponse> getCurrentCandidateOpinions(int idCandidate){
        List<Opinion> opinions = opinionService.findAllByIdCandidate(idCandidate);
        List<OpinionResponse> opinionResponses = new ArrayList<>();

        for (Opinion opinion : opinions){
            Company company = companyRepository.findById(opinion.getIdCompany());
            opinionResponses.add(new OpinionResponse(opinion.getId(), company.getName(), company.getLastName(), company.getCompanyName(),
                    company.getPhotoFilePath(), opinion.getOpinionTime(), opinion.getOpinion()));;
        }

        return opinionResponses;
    }

    public List<ContactResponse> getCurrentCandidateContacts(int idCandidate){
        List<ContactResponse> contacts = new ArrayList<>();
        List<Integer> savedCompany = new ArrayList<>();

        List<Message> messages = messageService.getUserMessages(idCandidate, candidateRepository.findById(idCandidate).getRole());

        for (Message message : messages){
            Company company = companyRepository.findById(message.getIdCompany());

            if (!savedCompany.contains(company.getId())){
                savedCompany.add(company.getId());
                contacts.add(new ContactResponse(company.getId(), company.getName(), company.getLastName(), company.getPhotoFilePath()));
            }
        }
        return contacts;
    }

    public List<GetMessagesResponse> getCurrentCandidateMessages(int idCandidate, int idCompany){
        List<GetMessagesResponse> response = new ArrayList<>();
        List<Message> messages = messageService.getUserMessagesWithSpecifiedCompany(idCandidate, idCompany);

        for (Message message : messages){
            response.add(new GetMessagesResponse(message.getId(),message.getMessage(), message.getMessageTime(), message.getSender()));
        }

        return response;
    }

    public boolean sendMessage(int idCandidate, int idCompany, String message){
        return messageService.addMessage(idCandidate, idCompany, message, candidateRepository.findById(idCandidate).getRole());
    }

    public List<Candidate> getAllCandidates(){
        return candidateRepository.findAll();
    }

    public List<Candidate> findAllByCity(String city){
        return candidateRepository.findAllByCity(city);
    }

    public List<Candidate> findAllByProfession(String profession){
        return candidateRepository.findAllByProfession(profession);
    }

    public List<Candidate> findAllWhereAgeGreaterThan(int age){
        return candidateRepository.findAllWhereAgeGreaterThan(age);
    }

    public List<Candidate> findAllWhereAgeLessThan(int age){
        return candidateRepository.findAllWhereAgeLessThan(age);
    }
}
